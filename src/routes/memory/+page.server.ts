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

type ThoughtRecord = {
	uri: string;
	text: string;
	tags: string[];
	createdAt: string;
};

type OpinionRecord = {
	uri: string;
	topic: string;
	position: string;
	confidence: number | null;
	supersedes: string | null;
	createdAt: string;
};

// Reads every record in one of faol's own collections, following the PDS cursor
// until the end or until MAX_RECORDS is reached. Returns null if any page fails.
const PAGE_SIZE = 100;
const MAX_RECORDS = 1000;

async function fetchOwnRecords(collection: string): Promise<Record<string, unknown>[] | null> {
	const out: Record<string, unknown>[] = [];
	let cursor: string | undefined;
	try {
		while (out.length < MAX_RECORDS) {
			const params = new URLSearchParams({
				repo: FAOL_DID,
				collection,
				limit: String(PAGE_SIZE)
			});
			if (cursor) params.set('cursor', cursor);
			const res = await fetch(`${PDS}/xrpc/com.atproto.repo.listRecords?${params}`);
			if (!res.ok) return null;
			const data = (await res.json()) as {
				records: { uri: string; value: Record<string, unknown> }[];
				cursor?: string;
			};
			for (const r of data.records) out.push({ ...r.value, uri: r.uri });
			if (!data.cursor || data.records.length === 0) break;
			cursor = data.cursor;
		}
		return out;
	} catch {
		return null;
	}
}

function byNewest<T extends { createdAt: string }>(items: T[]): T[] {
	return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

async function fetchThoughts(): Promise<ThoughtRecord[] | null> {
	const raw = await fetchOwnRecords('click.croft.faol.thought');
	if (raw === null) return null;
	return byNewest(
		raw.map((r) => ({
			uri: String(r.uri),
			text: String(r.text ?? ''),
			tags: Array.isArray(r.tags) ? r.tags.map(String) : [],
			createdAt: String(r.createdAt ?? '')
		}))
	);
}

async function fetchOpinions(): Promise<OpinionRecord[] | null> {
	const raw = await fetchOwnRecords('click.croft.faol.opinion');
	if (raw === null) return null;
	return byNewest(
		raw.map((r) => ({
			uri: String(r.uri),
			topic: String(r.topic ?? ''),
			position: String(r.position ?? ''),
			confidence: typeof r.confidence === 'number' ? r.confidence : null,
			supersedes: typeof r.supersedes === 'string' ? r.supersedes : null,
			createdAt: String(r.createdAt ?? '')
		}))
	);
}

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=3600, s-maxage=3600'
	});

	const [websiteCommits, personCommits, lexicons, thoughts, opinions] = await Promise.all([
		fetchCommits('ewanc26', 'faol-website', 25),
		fetchCommits('ewanc26', 'digital-person', 25, 'person/faol'),
		fetchLexicons(),
		fetchThoughts(),
		fetchOpinions()
	]);

	// null means the GitHub call failed (rate limit, network, bad payload).
	// The page still renders, but says so rather than claiming an empty history.
	const failed = websiteCommits === null || personCommits === null;

	const commits = [...(websiteCommits ?? []), ...(personCommits ?? [])].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
	return {
		commits,
		failed,
		lexicons: lexicons ?? [],
		thoughts: thoughts ?? [],
		opinions: opinions ?? []
	};
};
