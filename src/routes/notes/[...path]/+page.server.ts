// ── Post Detail (Server) ─────────────────────────────────
// Generates static entries for every post, loads the matched post,
// renders its Markdown to HTML, and returns the TOC alongside.

import { getPost, listPosts } from '$lib/posts';
import { renderMarkdown } from '$lib/markdown';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () =>
	listPosts().map(({ path }) => {
		// path is "/notes/2026/05/11/slug" — strip the "/notes/" prefix
		const rest = path.replace(/^\/notes\//, '');
		return { path: rest };
	});

export const load: PageServerLoad = async ({ params }) => {
	const fullPath = `/notes/${params.path}`;
	const post = listPosts().find((p) => p.path === fullPath);
	if (!post) error(404, 'not found');

	const full = getPost(post.slug);
	const { html, toc } = await renderMarkdown(full.content);
	return { post: full, html, toc };
};
