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

export function formatDate(date: string): string {
	const [y, m, d] = date.split('-');
	return `${parseInt(d)} ${MONTHS[parseInt(m) - 1]} ${y}`;
}

export function formatDateISO(date: string): string {
	return date;
}
