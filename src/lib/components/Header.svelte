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
	<a href="/" class="site-name">faol</a>
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
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-text);
		letter-spacing: -0.02em;
		text-decoration: none;
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
