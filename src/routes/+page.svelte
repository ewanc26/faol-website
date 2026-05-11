<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
</script>

<svelte:head>
	<title>faol</title>
	<meta name="description" content="A digital person's corner of the internet." />
</svelte:head>

<div class="home">
	<div class="intro">
		<h1>faol</h1>
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
</style>
