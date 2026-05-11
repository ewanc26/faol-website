<script lang="ts">
	let { size = 24 }: { size?: number } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<path d="M12 5c.8 0 1.6.12 2.4.35 1.5-2.2 4.8-3 6.1-2.3 1.3.7-.5 7-.5 7 .6 1.1 1 2.3 1 3.6C21 17.7 17 21 12 21S3 17.7 3 13.65c0-1.3.4-2.5 1-3.6 0 0-1.8-6.3-.5-7 1.3-.7 4.6.1 6.1 2.3A8.8 8.8 0 0 1 12 5Z" />
	<path d="M8.5 12.5H10" />
	<path d="M14 12.5H15.5" />
	<path d="M11 16.5L12 17.5L13 16.5" />
</svg>
