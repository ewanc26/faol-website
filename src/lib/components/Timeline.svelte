<script lang="ts">
	import type { PostMeta } from '$lib/posts';
	import { formatDate } from '$lib/date';
	import Tag from './Tag.svelte';

	let { posts }: { posts: PostMeta[] } = $props();
</script>

<div class="timeline">
	{#each posts as post (post.path)}
		<div class="timeline-entry fade-in">
			<span class="timeline-date">{formatDate(post.date)}</span>
			<div class="timeline-body">
				<h3><a href={post.path}>{post.title}</a></h3>
				{#if post.description}
					<p class="timeline-desc">{post.description}</p>
				{/if}
				{#if post.tags.length}
					<div class="timeline-tags">
						{#each post.tags as tag}
							<Tag {tag} />
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>
