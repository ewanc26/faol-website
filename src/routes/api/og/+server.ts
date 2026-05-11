/**
 * Dynamic OG image endpoint.
 * Generates OpenGraph images on demand using @ewanc26/og.
 *
 * Query params:
 * - title: Page title (required)
 * - description: Optional one-line description
 * - image: Optional avatar/logo URL (defaults to wolf icon)
 */
import { createOgEndpoint } from '@ewanc26/og';

const SITE_URL = 'https://faol.croft.click';

export const GET = createOgEndpoint({
	siteName: 'faol',
	defaultTemplate: 'blog',
	colors: {
		background: '#1a1d1a',
		text: '#e0e4de',
		accent: '#7db87d',
	},
	cacheMaxAge: 86_400, // 24 hours
});
