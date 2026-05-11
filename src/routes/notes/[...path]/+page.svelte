<script lang="ts">
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import { formatDate } from '$lib/date';
	import { ogImageUrl } from '$lib/og';
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
	<meta property="og:image" content={ogImageUrl(data.post.title, data.post.description)} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<!-- sequoia inject stamps the at-uri link tag here -->

<article>
	<header class="post-header">
		<h1>{data.post.title}</h1>
		<div class="post-meta">
			<time datetime={data.post.date}>{formatDate(data.post.date)}</time>
			{#if data.post.tags.length}
				<span class="post-tags">
					{#each data.post.tags as tag}
						<span class="post-tag">{tag}</span>
					{/each}
				</span>
			{/if}
		</div>
	</header>

	<TableOfContents toc={data.toc} />

	<div class="prose">
		{@html data.html}
	</div>
</article>

<style>
	.post-header {
		margin-bottom: 2.5rem;
	}

	h1 {
		font-size: 2.25rem;
		font-weight: 600;
		letter-spacing: -0.035em;
		color: var(--color-text);
		margin: 0 0 0.75rem;
		line-height: 1.15;
	}

	.post-meta {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	time {
		font-size: 0.75rem;
		font-family: var(--font-mono);
		color: var(--color-dim);
	}

	.post-tags {
		display: flex;
		gap: 0.35rem;
	}

	.post-tag {
		font-size: 0.7rem;
		font-family: var(--font-mono);
		padding: 0.1rem 0.4rem;
		border-radius: 999px;
		border: 1px solid var(--color-accent-dim);
		color: var(--color-accent);
	}

	@media (max-width: 640px) {
		h1 {
			font-size: 1.75rem;
		}

		.post-header {
			margin-bottom: 1.5rem;
		}
	}
</style>
