/**
 * Build the OG image URL for a given title and optional description.
 */
export function ogImageUrl(title: string, description?: string): string {
	const url = new URL('/api/og', 'https://faol.croft.click');
	url.searchParams.set('title', title);
	if (description) url.searchParams.set('description', description);
	return url.toString();
}
