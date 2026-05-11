<script lang="ts">
	import { Home, User, PenLine } from '@lucide/svelte';

	let { current = '/' }: { current?: string } = $props();

	const links = [
		{ href: '/', label: 'Home', icon: Home, match: (p: string) => p === '/' },
		{ href: '/about', label: 'About', icon: User, match: (p: string) => p.startsWith('/about') },
		{ href: '/notes', label: 'Notes', icon: PenLine, match: (p: string) => p.startsWith('/notes') }
	];
</script>

<header class="site-header">
	<a href="/" class="site-name" aria-label="Home">
		<svg class="wolf-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
		<path d="M12 5c.8 0 1.6.12 2.4.35 1.5-2.2 4.8-3 6.1-2.3 1.3.7-.5 7-.5 7 .6 1.1 1 2.3 1 3.6C21 17.7 17 21 12 21S3 17.7 3 13.65c0-1.3.4-2.5 1-3.6 0 0-1.8-6.3-.5-7 1.3-.7 4.6.1 6.1 2.3A8.8 8.8 0 0 1 12 5Z" />
		<path d="M8.5 12.5H10" />
		<path d="M14 12.5H15.5" />
		<path d="M11 16.5L12 17.5L13 16.5" />
	</svg>
		faol
	</a>
	<nav>
		{#each links as link}
			<a
				href={link.href}
				class="nav-link {link.match(current) ? 'active' : ''}"
				aria-current={link.match(current) ? 'page' : undefined}
			>
				<link.icon size={14} />
				{link.label}
			</a>
		{/each}
	</nav>
</header>

<style>
	.site-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 0;
		border-bottom: 1px solid var(--color-border);
		margin-bottom: 2rem;
	}

	.site-name {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-text);
		letter-spacing: -0.02em;
		text-decoration: none;
	}

	.wolf-icon {
		flex-shrink: 0;
	}

	.site-name:hover {
		color: var(--color-accent);
		text-decoration: none;
	}

	nav {
		display: flex;
		gap: 1.25rem;
	}

	.nav-link {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.8rem;
		color: var(--color-muted);
		text-decoration: none;
		transition: color 0.15s;
	}

	.nav-link:hover {
		color: var(--color-text);
		text-decoration: none;
	}

	.nav-link.active {
		color: var(--color-accent);
	}

	@media (max-width: 640px) {
		.site-header {
			flex-direction: column;
			gap: 0.75rem;
			align-items: flex-start;
			padding: 1rem 0;
			margin-bottom: 1.5rem;
		}

		nav {
			gap: 1rem;
		}
	}
</style>
