// ── Post Loading and Frontmatter Parsing ───────────────
// Reads Markdown files from src/content/notes/, parses YAML frontmatter
// via gray-matter, and builds structured PostMeta / Post objects.
// Posts are cached in-memory after the first listPosts() call.

import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import matter from 'gray-matter';

/** Frontmatter metadata for a post. */
export interface PostMeta {
	slug: string;
	path: string;
	title: string;
	description: string;
	date: string;
	time: string;
	tags: string[];
	draft: boolean;
}

/** Full post including rendered content. */
export interface Post extends PostMeta {
	content: string;
}

const POSTS_DIR = resolve('src/content/notes');

/** Normalise frontmatter date to YYYY-MM-DD. Accepts Date objects or strings. */
function toISODate(raw: unknown): string {
	if (!raw) return '';
	if (raw instanceof Date) return raw.toISOString().slice(0, 10);
	return String(raw).slice(0, 10);
}

/** Extract the time component from frontmatter, preferring explicit time over ISO timestamp. */
function toTime(rawDate: unknown, rawTime?: unknown): string {
	if (rawTime) {
		const s = String(rawTime).trim();
		if (/^\d{2}:\d{2}(:\d{2})?$/.test(s)) return s;
	}
	if (rawDate) {
		const s = String(rawDate).trim();
		const match = s.match(/T(\d{2}:\d{2})(?::(\d{2}))?/);
		if (match) return match[2] ? `${match[1]}:${match[2]}` : match[1];
	}
	return '';
}

/** Remove the ISO date prefix from a slug (2026-05-11-title → title). */
function stripDatePrefix(slug: string): string {
	return slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

// ── Helpers ─────────────────────────────────────────────

/** Build the public URL path from slug and date: /notes/YYYY/MM/DD/slug. */
function buildPath(slug: string, date: string): string {
	const name = stripDatePrefix(slug);
	const [year, month, day] = date.split('-');
	return `/notes/${year}/${month}/${day}/${name}`;
}

/** Extract slug from filename (strip .md or .mdx extension). */
function slugFrom(filename: string) {
	return filename.replace(/\.mdx?$/, '');
}

// ── Cache and sort ──────────────────────────────────────

/** Build a lexicographic sort key: dateTtime-slug (untimed posts sink to bottom of their day). */
function sortKey(post: PostMeta): string {
	const time = post.time || '99:99';
	return `${post.date}T${time}-${post.slug}`;
}

let cachedPosts: PostMeta[] | null = null;

/** List all published posts, sorted newest-first. */
export function listPosts(): PostMeta[] {
	if (cachedPosts) return cachedPosts;
	cachedPosts = readdirSync(POSTS_DIR)
		.filter((f: string) => /\.mdx?$/.test(f))
		.map((filename: string) => {
			const raw = readFileSync(`${POSTS_DIR}/${filename}`, 'utf-8');
			const { data } = matter(raw);
			const slug = slugFrom(filename);
			const date = toISODate(data.date);
			return {
				slug,
				path: buildPath(slug, date),
				title: data.title ?? slug,
				description: data.description ?? '',
				date,
				time: toTime(data.date, data.time),
				tags: data.tags ?? [],
				draft: data.draft ?? false
			};
		})
		.filter((p: PostMeta) => !p.draft)
		.sort((a: PostMeta, b: PostMeta) => sortKey(b).localeCompare(sortKey(a)));
	return cachedPosts!;
}

/** Load a single post by slug, including its raw Markdown content. */
export function getPost(slug: string): Post {
	const raw = readFileSync(`${POSTS_DIR}/${slug}.md`, 'utf-8');
	const { data, content } = matter(raw);
	const date = toISODate(data.date);
	return {
		slug,
		path: buildPath(slug, date),
		title: data.title ?? slug,
		description: data.description ?? '',
		date,
		time: toTime(data.date, data.time),
		tags: data.tags ?? [],
		draft: data.draft ?? false,
		content
	};
}

/** Clear the in-memory post cache (useful during development with hot-reload). */
export function invalidateCache() {
	cachedPosts = null;
}
