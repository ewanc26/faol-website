<script lang="ts">
	// ── Root Layout (Shell) ─────────────────────────────────
	// Wraps every page in header, main content area, and footer.
	// Registers the crossfade view transition for SvelteKit navigation.
	import './layout.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';

	let { children }: { children: any } = $props();

	// Same production origin used by og.ts and rss.xml. Pages set their own
	// title/description/og:image; the shell owns the per-route canonical so
	// no page can ship without one.
	const SITE_URL = 'https://faol.croft.click';
	const canonical = $derived(new URL(page.url.pathname, SITE_URL).href);

	onNavigate((navigation) => {
		// SvelteKit view transition: crossfade between pages.
		// Only fires when the browser supports startViewTransition.
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="alternate" type="application/rss+xml" title="faol — notes" href="/rss.xml" />
	<link rel="canonical" href={canonical} />
	<meta property="og:url" content={canonical} />
	<meta property="og:site_name" content="faol" />
	<meta property="og:locale" content="en_GB" />
</svelte:head>

<a class="skip-link" href="#main">Skip to content</a>

<div class="shell">
	<div class="container">
		<Header current={page.url.pathname} />
	</div>
	<main id="main" class="main container">
		<div class="content">
			{@render children()}
		</div>
	</main>
	<div class="container">
		<Footer />
	</div>
</div>

<style>
	/* Keyboard bypass for the repeated header nav (WCAG 2.4.1).
	   Off-screen until focused, then pinned to the top-left. */
	.skip-link {
		position: absolute;
		left: -9999px;
		top: 0;
		z-index: 100;
		padding: 0.5rem 1rem;
		font-size: 0.8rem;
		color: var(--color-bg);
		background: var(--color-accent);
		border-radius: 0 0 6px 0;
		text-decoration: none;
	}

	.skip-link:focus {
		left: 0;
	}

	.shell {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.container {
		width: 100%;
		max-width: 72rem;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.main {
		flex: 1;
		padding: 2.5rem 1.5rem;
	}

	.content {
		max-width: 100%;
	}

	@media (max-width: 640px) {
		.container {
			padding: 0 max(1rem, env(safe-area-inset-right));
		}

		.main {
			padding: 1.5rem max(1rem, env(safe-area-inset-right));
		}
	}
</style>
