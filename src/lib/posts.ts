import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import matter from 'gray-matter';

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

export interface Post extends PostMeta {
	content: string;
}

const POSTS_DIR = resolve('src/content/notes');

function toISODate(raw: unknown): string {
	if (!raw) return '';
	if (raw instanceof Date) return raw.toISOString().slice(0, 10);
	return String(raw).slice(0, 10);
}

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

function stripDatePrefix(slug: string): string {
	return slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

function buildPath(slug: string, date: string): string {
	const name = stripDatePrefix(slug);
	const [year, month, day] = date.split('-');
	return `/notes/${year}/${month}/${day}/${name}`;
}

function slugFrom(filename: string) {
	return filename.replace(/\.mdx?$/, '');
}

function sortKey(post: PostMeta): string {
	const time = post.time || '99:99';
	return `${post.date}T${time}-${post.slug}`;
}

let cachedPosts: PostMeta[] | null = null;

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

export function invalidateCache() {
	cachedPosts = null;
}
