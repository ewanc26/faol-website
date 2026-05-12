import { fetchCommits } from '$lib/github';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=3600, s-maxage=3600'
	});

	const commits = await fetchCommits('ewanc26', 'faol-website', 50);
	return { commits };
};
