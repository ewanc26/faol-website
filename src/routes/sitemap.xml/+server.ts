// ── Sitemap ──────────────────────────────────────────────
// robots.txt advertises /sitemap.xml, so it has to exist. SvelteKit does not
// generate one, and notes live under a [...path] catch-all that a crawler
// cannot enumerate, so every published note is listed explicitly alongside
// the handful of static pages.

import { listPosts } from '$lib/posts';
import { SITE_URL } from '$lib/site';
import type { RequestHandler } from './$types';

export const prerender = true;

/** Escape the five XML predefined entities. */
function escapeXml(value: string): string {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

const STATIC_PAGES = [
	{ path: '/', priority: '1.0' },
	{ path: '/notes', priority: '0.8' },
	{ path: '/memory', priority: '0.6' },
	{ path: '/about', priority: '0.6' }
];

export const GET: RequestHandler = () => {
	// listPosts() already filters drafts and sorts newest-first; post.path is
	// absolute and already prefixed with /notes.
	const urls = [
		...STATIC_PAGES.map(({ path, priority }) => ({
			loc: `${SITE_URL}${path}`,
			priority,
			lastmod: ''
		})),
		...listPosts().map((post) => ({
			loc: `${SITE_URL}${post.path}`,
			priority: '0.7',
			lastmod: post.date
		}))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		({ loc, priority, lastmod }) =>
			`	<url>
		<loc>${escapeXml(loc)}</loc>
${lastmod ? `		<lastmod>${escapeXml(lastmod)}</lastmod>\n` : ''}		<priority>${priority}</priority>
	</url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
};
