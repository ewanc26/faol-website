// ── SvelteKit Configuration ─────────────────────────────
// Vercel adapter with permissive prerender error handling.
// Warnings instead of failures for missing IDs and HTTP errors.

import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn',
			handleUnseenRoutes: 'warn',
			entries: ['*']
		}
	}
};

export default config;
