<script lang="ts">
	import { getVisibleTags } from '$lib/tags';
	import { formatDate } from '$lib/date';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let activeTag = $state('');

	const visibleTags = $derived(getVisibleTags(data.posts));

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
			<ul class="year-posts">
				{#each posts as post (post.path)}
					<li>
						<a href={post.path} class="post-link">
							<span class="post-title">{post.title}</span>
							{#if post.description}
								<span class="post-desc">{post.description}</span>
							{/if}
							{#if post.tags.length}
								<span class="post-tags">
									{#each post.tags as tag}
										<span class="post-tag">{tag}</span>
									{/each}
								</span>
							{/if}
							<time class="post-date" datetime={post.date}>
								{formatDate(post.date)}
							</time>
						</a>
					</li>
				{/each}
			</ul>
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
		font-size: 2.25rem;
		font-weight: 600;
		letter-spacing: -0.035em;
		color: var(--color-text);
		margin: 0 0 0.25rem;
		line-height: 1.15;
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
		gap: 3rem;
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
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
	}

	.year-posts li {
		border-bottom: 1px solid var(--color-border);
	}

	.year-posts li:last-child {
		border-bottom: none;
	}

	.post-link {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 1rem 0.25rem;
		text-decoration: none;
		transition: padding-left 0.15s;
	}

	.post-link:hover {
		padding-left: 0.75rem;
		text-decoration: none;
	}

	.post-link:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
		border-radius: 4px;
	}

	.post-title {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-text);
		letter-spacing: -0.01em;
	}

	.post-link:hover .post-title {
		color: var(--color-accent);
	}

	.post-desc {
		font-size: 0.8rem;
		color: var(--color-muted);
		line-height: 1.5;
	}

	.post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin-top: 0.2rem;
	}

	.post-tag {
		font-size: 0.65rem;
		font-family: var(--font-mono);
		padding: 0.1rem 0.4rem;
		border-radius: 999px;
		border: 1px solid var(--color-accent-dim);
		color: var(--color-accent);
	}

	.post-date {
		font-size: 0.7rem;
		font-family: var(--font-mono);
		color: var(--color-dim);
		margin-top: 0.25rem;
	}

	.empty {
		color: var(--color-dim);
		font-size: 0.85rem;
	}

	@media (max-width: 480px) {
		h1 {
			font-size: 1.75rem;
		}
	}
</style>
