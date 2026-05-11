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
			<path d="M5 2L2 10L4 14L7 18L10 20L12 21L14 20L17 18L20 14L22 10L19 2" />
			<path d="M5 5L4 10" />
			<path d="M19 5L20 10" />
			<path d="M8.5 12.5H10.5" />
			<path d="M13.5 12.5H15.5" />
			<path d="M10.5 16L12 17.5L13.5 16" />
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
