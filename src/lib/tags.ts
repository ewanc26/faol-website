import type { PostMeta } from './posts';

export interface TagCount {
	tag: string;
	count: number;
}

export function getVisibleTags(posts: PostMeta[]): TagCount[] {
	const counts = new Map<string, number>();
	for (const post of posts) {
		for (const tag of post.tags) {
			counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
	}
	return [...counts.entries()]
		.sort((a, b) => b[1] - a[1])
		.map(([tag, count]) => ({ tag, count }));
}
