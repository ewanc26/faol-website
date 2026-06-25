// ── Memory (Server) ─────────────────────────────────────
// Fetches recent commits from the website and identity repos,
// merges them chronologically. Not prerendered — data comes from GitHub API.

import { fetchCommits } from '$lib/github';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=3600, s-maxage=3600'
	});

	const [websiteCommits, personCommits] = await Promise.all([
		fetchCommits('ewanc26', 'faol-website', 25),
		fetchCommits('ewanc26', 'digital-person', 25, 'person/faol')
	]);

	const commits = [...websiteCommits, ...personCommits].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
	return { commits };
};
