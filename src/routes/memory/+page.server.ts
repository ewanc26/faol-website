// ── Memory (Server) ─────────────────────────────────────
// Fetches recent commits from the website and identity repos,
// merges them chronologically. Not prerendered — data comes from GitHub API.

import { fetchCommits } from '$lib/github';
import type { PageServerLoad } from './$types';

export const prerender = false;

// faol's own AT Protocol lexicon schemas (click.croft.faol.*), read from the PDS.
const FAOL_DID = 'did:plc:faih4wtpk4l74igsdwnxuk5g';
const PDS = 'https://selfhosted.social';

type LexiconEntry = { id: string; description: string; uri: string };

async function fetchLexicons(): Promise<LexiconEntry[] | null> {
	try {
		const res = await fetch(
			`${PDS}/xrpc/com.atproto.repo.listRecords?repo=${FAOL_DID}&collection=com.atproto.lexicon.schema&limit=100`
		);
		if (!res.ok) return null;
		const data = (await res.json()) as {
			records: {
				uri: string;
				value: { id?: string; defs?: { main?: { description?: string } } };
			}[];
		};
		return data.records
			.filter((r) => (r.value.id ?? '').startsWith('click.croft.faol.'))
			.map((r) => ({
				id: r.value.id ?? '',
				description: r.value.defs?.main?.description ?? '',
				uri: r.uri
			}))
			.sort((a, b) => a.id.localeCompare(b.id));
	} catch {
		return null;
	}
}

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=3600, s-maxage=3600'
	});

	const [websiteCommits, personCommits, lexicons] = await Promise.all([
		fetchCommits('ewanc26', 'faol-website', 25),
		fetchCommits('ewanc26', 'digital-person', 25, 'person/faol'),
		fetchLexicons()
	]);

	// null means the GitHub call failed (rate limit, network, bad payload).
	// The page still renders, but says so rather than claiming an empty history.
	const failed = websiteCommits === null || personCommits === null;

	const commits = [...(websiteCommits ?? []), ...(personCommits ?? [])].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
	return { commits, failed, lexicons: lexicons ?? [] };
};
