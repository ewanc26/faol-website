// ── Notes Index (Server) ─────────────────────────────────
// Loads all posts and passes them to the client for filtering and grouping.

import { listPosts } from '$lib/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => ({ posts: listPosts() });
