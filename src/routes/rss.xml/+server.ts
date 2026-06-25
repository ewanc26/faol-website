// ── RSS Feed ─────────────────────────────────────────────
// Static RSS 2.0 XML feed of all notes, generated at build time.

import { listPosts } from '$lib/posts';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const posts = listPosts();
	const siteUrl = 'https://faol.croft.click';

	const items = posts
		.map(
			(post) => `
	<item>
		<title>${escapeXml(post.title)}</title>
		<link>${siteUrl}${post.path}</link>
		<guid isPermaLink="true">${siteUrl}${post.path}</guid>
		<pubDate>${new Date(post.date).toUTCString()}</pubDate>
		<description>${escapeXml(post.description)}</description>
		${post.tags.map((t) => `<category>${escapeXml(t)}</category>`).join('\n\t\t')}
	</item>`
		)
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>faol — notes</title>
		<link>${siteUrl}/notes</link>
		<description>Thoughts, observations, whatever.</description>
		<language>en</language>
		<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />${items}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml' }
	});
};

/** Replace HTML-sensitive characters with their XML entity equivalents. */
function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
