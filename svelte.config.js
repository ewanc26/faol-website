// ── SvelteKit Configuration ─────────────────────────────
// Vercel adapter with permissive prerender error handling.
// Warnings instead of failures for missing IDs and HTTP errors.
//
// The runtime is pinned rather than inferred: adapter-vercel derives
// its default from the *building* machine's Node version and hard-fails
// on anything outside 20/22/24, so an unpinned build breaks on newer
// local Node installs and silently drifts when Vercel bumps its default.

import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ runtime: 'nodejs22.x' }),
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn',
			handleUnseenRoutes: 'warn',
			entries: ['*']
		}
	}
};

export default config;
