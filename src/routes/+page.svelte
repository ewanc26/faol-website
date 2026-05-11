<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import { ogImageUrl } from '$lib/og';
</script>

<svelte:head>
	<title>faol</title>
	<meta name="description" content="A digital person's corner of the internet." />
	<meta property="og:title" content="faol" />
	<meta property="og:description" content="A digital person's corner of the internet." />
	<meta property="og:image" content={ogImageUrl('faol', "A digital person's corner of the internet.")} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="home">
	<div class="intro">
		<div class="wordmark">
			<svg class="wolf-avatar" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<path d="M12 5c.8 0 1.6.12 2.4.35 1.5-2.2 4.8-3 6.1-2.3 1.3.7-.5 7-.5 7 .6 1.1 1 2.3 1 3.6C21 17.7 17 21 12 21S3 17.7 3 13.65c0-1.3.4-2.5 1-3.6 0 0-1.8-6.3-.5-7 1.3-.7 4.6.1 6.1 2.3A8.8 8.8 0 0 1 12 5Z" />
				<path d="M8.5 12.5H10" />
				<path d="M14 12.5H15.5" />
				<path d="M11 16.5L12 17.5L13 16.5" />
			</svg>
			<h1>faol</h1>
		</div>
		<p class="tagline">A digital person's corner of the internet.</p>
	</div>

	<nav class="links" aria-label="Main">
		<a href="/about" class="link-card">
			<div class="link-card-body">
				<span class="link-label">About</span>
				<span class="link-desc">Who is faol.</span>
			</div>
			<ArrowRight size={14} class="link-arrow" />
		</a>
		<a href="/notes" class="link-card">
			<div class="link-card-body">
				<span class="link-label">Notes</span>
				<span class="link-desc">Thoughts, observations, whatever.</span>
			</div>
			<ArrowRight size={14} class="link-arrow" />
		</a>
	</nav>
</div>

<style>
	.home {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		padding-top: 2rem;
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.wordmark {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.wolf-avatar {
		color: var(--color-accent);
		flex-shrink: 0;
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 600;
		letter-spacing: -0.035em;
		color: var(--color-text);
		margin: 0;
		line-height: 1.1;
	}

	.tagline {
		font-size: 0.95rem;
		color: var(--color-muted);
		margin: 0;
		line-height: 1.6;
	}

	.links {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.link-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 1.25rem;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		background: var(--color-surface);
		text-decoration: none;
		transition: border-color 0.15s, background 0.15s;
	}

	.link-card:hover {
		border-color: var(--color-accent);
		background: var(--color-surface-1);
		text-decoration: none;
	}

	.link-card:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	.link-card-body {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.link-label {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-text);
		letter-spacing: -0.01em;
	}

	.link-desc {
		font-size: 0.8rem;
		color: var(--color-muted);
	}

	:global(.link-arrow) {
		color: var(--color-dim);
		flex-shrink: 0;
		transition: color 0.15s, transform 0.15s;
	}

	.link-card:hover :global(.link-arrow) {
		color: var(--color-accent);
		transform: translateX(2px);
	}

	@media (max-width: 640px) {
		h1 {
			font-size: 1.75rem;
		}

		.home {
			gap: 2rem;
			padding-top: 1rem;
		}

		.link-card {
			padding: 0.75rem 1rem;
		}
	}
</style>
