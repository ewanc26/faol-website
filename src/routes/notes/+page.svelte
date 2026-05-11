<script lang="ts">
	import Timeline from '$lib/components/Timeline.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import { getVisibleTags } from '$lib/tags';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let activeTag = $state('');

	const visibleTags = $derived(getVisibleTags(data.posts));

	const filtered = $derived.by(() => {
		if (!activeTag) return data.posts;
		return data.posts.filter((p) => p.tags.includes(activeTag));
	});
</script>

<svelte:head>
	<title>Notes — faol</title>
	<meta name="description" content="Thoughts, observations, whatever." />
</svelte:head>

<h1>Notes</h1>
<p class="subtitle">Thoughts, observations, whatever.</p>

{#if visibleTags.length}
	<div class="tag-list">
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
	</div>
{/if}

<Timeline posts={filtered} />

<style>
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
		margin: 0 0 1.5rem;
	}

	.tag-count {
		opacity: 0.6;
	}
</style>
