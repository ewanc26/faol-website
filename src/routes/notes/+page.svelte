<script lang="ts">
	import { getVisibleTags } from '$lib/tags';
	import { formatDate } from '$lib/date';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let activeTag = $state('');

	const visibleTags = $derived(getVisibleTags(data.posts));

	// Group posts by year
	const grouped = $derived.by(() => {
		const posts = activeTag
			? data.posts.filter((p) => p.tags.includes(activeTag))
			: data.posts;
		const map = new Map<string, typeof posts>();
		for (const post of posts) {
			const year = post.date.slice(0, 4);
			if (!map.has(year)) map.set(year, []);
			map.get(year)!.push(post);
		}
		return [...map.entries()];
	});
</script>

<svelte:head>
	<title>Notes — faol</title>
	<meta name="description" content="Thoughts, observations, whatever." />
</svelte:head>

<div class="notes-header">
	<h1>Notes</h1>
	<p class="subtitle">Thoughts, observations, whatever.</p>
</div>

{#if visibleTags.length}
	<nav class="tag-bar" aria-label="Filter by tag">
		<button
			class="tag-chip {!activeTag ? 'active' : ''}"
			onclick={() => (activeTag = '')}
		>
			all
		</button>
		{#each visibleTags as { tag, count }}
			<button
				class="tag-chip {activeTag === tag ? 'active' : ''}"
				onclick={() => (activeTag = activeTag === tag ? '' : tag)}
			>
				{tag} <span class="tag-count">{count}</span>
			</button>
		{/each}
	</nav>
{/if}

<div class="post-list">
	{#each grouped as [year, posts]}
		<section class="year-group">
			<h2 class="year-label">{year}</h2>
			<div class="year-posts">
				{#each posts as post (post.path)}
					<a href={post.path} class="post-card fade-in">
						<div class="post-card-body">
							<h3>{post.title}</h3>
							{#if post.description}
								<p>{post.description}</p>
							{/if}
							{#if post.tags.length}
								<div class="post-card-tags">
									{#each post.tags as tag}
										<span class="post-card-tag">{tag}</span>
									{/each}
								</div>
							{/if}
						</div>
						<time class="post-card-date" datetime={post.date}>
							{formatDate(post.date)}
						</time>
					</a>
				{/each}
			</div>
		</section>
	{/each}

	{#if grouped.length === 0}
		<p class="empty">No posts yet.</p>
	{/if}
</div>

<style>
	.notes-header {
		margin-bottom: 1.5rem;
	}

	h1 {
		font-size: 1.75rem;
		font-weight: 600;
		letter-spacing: -0.03em;
		color: var(--color-text);
		margin: 0 0 0.25rem;
	}

	.subtitle {
		font-size: 0.85rem;
		color: var(--color-muted);
		margin: 0;
	}

	.tag-bar {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-bottom: 2rem;
	}

	.tag-count {
		opacity: 0.6;
	}

	.post-list {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.year-label {
		font-size: 0.75rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-dim);
		margin: 0 0 1rem;
	}

	.year-posts {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.post-card {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 1.25rem;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		background: var(--color-surface);
		text-decoration: none;
		transition: border-color 0.15s, background 0.15s;
	}

	.post-card:hover {
		border-color: var(--color-accent);
		background: var(--color-surface-1);
		text-decoration: none;
	}

	.post-card-body {
		flex: 1;
		min-width: 0;
	}

	.post-card h3 {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-text);
		margin: 0 0 0.25rem;
		letter-spacing: -0.01em;
	}

	.post-card p {
		font-size: 0.8rem;
		color: var(--color-muted);
		margin: 0 0 0.4rem;
		line-height: 1.5;
	}

	.post-card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
	}

	.post-card-tag {
		font-size: 0.65rem;
		font-family: var(--font-mono);
		padding: 0.1rem 0.4rem;
		border-radius: 999px;
		border: 1px solid var(--color-accent-dim);
		color: var(--color-accent);
	}

	.post-card-date {
		font-size: 0.7rem;
		font-family: var(--font-mono);
		color: var(--color-dim);
		white-space: nowrap;
		padding-top: 0.15rem;
	}

	.empty {
		color: var(--color-dim);
		font-size: 0.85rem;
	}

	@media (max-width: 480px) {
		.post-card {
			flex-direction: column;
			gap: 0.25rem;
		}

		.post-card-date {
			font-size: 0.65rem;
		}
	}
</style>
