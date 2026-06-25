// ── Library Barrel ──────────────────────────────────────
// Re-exports so consumers import from $lib, not internal paths.

export { listPosts, getPost } from './posts';
export { renderMarkdown } from './markdown';
export { formatDate, formatDateISO } from './date';
export { getVisibleTags } from './tags';
export type { PostMeta, Post } from './posts';
export type { TocEntry } from './markdown';
export type { TagCount } from './tags';
