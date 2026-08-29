<script lang="ts">
	// ── Table of Contents ───────────────────────────────────
	// Renders heading links from the parsed TOC for post navigation.
	// H2 entries are top-level, H3 entries are indented.
	import type { TocEntry } from '$lib/markdown';

	let { toc }: { toc: TocEntry[] } = $props();
</script>

{#if toc.length}
	<nav class="toc" aria-label="Table of contents">
		<!-- h2: the post body starts at h2, so an h4 here skipped a level. -->
		<h2 class="toc-title">On this page</h2>
		<ul>
			{#each toc as entry}
				<li class="toc-{entry.level}">
					<a href="#{entry.id}">{entry.text}</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	.toc {
		margin-bottom: 2rem;
		padding: 0.75rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		background: var(--color-surface);
	}

	.toc .toc-title {
		font-size: 0.75rem;
		font-weight: 500;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-dim);
		margin: 0 0 0.5rem;
	}

	.toc ul {
		list-style: none;
		padding: 0;
	}

	.toc li {
		font-size: 0.8rem;
		margin-bottom: 0.25rem;
	}

	.toc a {
		color: var(--color-muted);
		text-decoration: none;
	}

	.toc a:hover {
		color: var(--color-accent);
	}

	.toc-3 {
		padding-left: 1rem;
	}
</style>
