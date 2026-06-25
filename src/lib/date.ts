// ── Date Formatting ──────────────────────────────────────

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

/** Parse an ISO date string and return human-friendly "D Month YYYY" format. */
export function formatDate(date: string): string {
	const [y, m, d] = date.split('-');
	return `${parseInt(d)} ${MONTHS[parseInt(m) - 1]} ${y}`;
}

/**
 * Passthrough ISO date formatter.
 * Kept as a function for interface consistency — consumers get a stable API
 * regardless of whether we decide to transform later.
 */
export function formatDateISO(date: string): string {
	return date;
}
