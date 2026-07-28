// ── OpenGraph Image URL Builder ─────────────────────────

import { SITE_URL } from '$lib/site';

/**
 * Build the OG image URL for a given title and optional description.
 * Includes the wolf icon as the default avatar.
 */
export function ogImageUrl(title: string, description?: string): string {
	const url = new URL('/api/og', SITE_URL);
	url.searchParams.set('title', title);
	if (description) url.searchParams.set('description', description);
	url.searchParams.set('image', `${SITE_URL}/wolf.svg`);
	return url.toString();
}
