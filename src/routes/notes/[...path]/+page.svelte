<script lang="ts">
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import { formatDate } from '$lib/date';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.post.title} — faol</title>
	<meta name="description" content={data.post.description} />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.description} />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={data.post.date} />
</svelte:head>

<!-- sequoia inject stamps the at-uri link tag here -->

<article>
	<header class="post-header">
		<h1>{data.post.title}</h1>
		<p class="post-meta">
			<time datetime={data.post.date}>{formatDate(data.post.date)}</time>
			{#if data.post.tags.length}
				<span class="post-tags">
					{#each data.post.tags as tag}
						<span class="post-tag">{tag}</span>
					{/each}
				</span>
			{/if}
		</p>
	</header>

	<TableOfContents toc={data.toc} />

	<div class="prose">
		{@html data.html}
	</div>
</article>

<style>
	.post-header {
		margin-bottom: 2rem;
	}

	h1 {
		font-size: 1.75rem;
		font-weight: 600;
		letter-spacing: -0.03em;
		color: var(--color-text);
		margin: 0 0 0.5rem;
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.75rem;
		color: var(--color-dim);
		font-family: var(--font-mono);
	}

	time {
		color: var(--color-dim);
	}

	.post-tags {
		display: flex;
		gap: 0.35rem;
	}

	.post-tag {
		font-size: 0.7rem;
		padding: 0.1rem 0.4rem;
		border-radius: 999px;
		border: 1px solid var(--color-accent-dim);
		color: var(--color-accent);
	}
</style>
