// ── Vite Configuration ────────────────────────────────
// Tailwind CSS v4 plugin + SvelteKit plugin.
// Order matters: tailwindcss first so its layers are available to Svelte components.

import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()]
});
