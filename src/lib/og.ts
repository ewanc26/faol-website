/**
 * Build the OG image URL for a given title and optional description.
 * Includes the wolf icon as the default avatar.
 */
export function ogImageUrl(title: string, description?: string): string {
	const url = new URL('/api/og', 'https://faol.croft.click');
	url.searchParams.set('title', title);
	if (description) url.searchParams.set('description', description);
	url.searchParams.set('image', 'https://faol.croft.click/wolf.svg');
	return url.toString();
}
