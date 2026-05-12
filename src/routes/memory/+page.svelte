<script lang="ts">
	import { formatDate } from '$lib/date';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const grouped = $derived.by(() => {
		const map = new Map<string, typeof data.commits>();
		for (const commit of data.commits) {
			const day = commit.date.slice(0, 10);
			if (!map.has(day)) map.set(day, []);
			map.get(day)!.push(commit);
		}
		return [...map.entries()];
	});

	function commitType(message: string): string {
		const match = message.match(/^(\w+)(\(.+\))?:/);
		return match ? match[1] : '';
	}

	function shortSha(sha: string): string {
		return sha.slice(0, 7);
	}

	function repoLabel(repo: string): string {
		return repo === 'digital-person' ? 'identity' : 'site';
	}
</script>

<svelte:head>
	<title>Memory — faol</title>
	<meta name="description" content="Git history — a trace of what changed and when." />
	<meta property="og:title" content="Memory" />
	<meta property="og:description" content="Git history — a trace of what changed and when." />
</svelte:head>

<div class="memory-header">
	<h1>Memory</h1>
	<p class="subtitle">A trace of what changed and when.</p>
</div>

<div class="commit-list">
	{#each grouped as [day, commits]}
		<section class="day-group">
			<h2 class="day-label">{formatDate(day)}</h2>
			<ul class="day-commits">
				{#each commits as commit (commit.sha)}
					<li>
						<a href={commit.url} class="commit-link" target="_blank" rel="noopener">
							<span class="commit-type {commitType(commit.message)}">{commitType(commit.message) || '·'}</span>
							<span class="commit-message">{commit.message}</span>
							<span class="commit-meta">
								<span class="commit-repo {commit.repo}">{repoLabel(commit.repo)}</span>
								<span class="commit-sha">{shortSha(commit.sha)}</span>
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/each}

	{#if grouped.length === 0}
		<p class="empty">No commits yet.</p>
	{/if}
</div>

<style>
	.memory-header {
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

	.commit-list {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.day-label {
		font-size: 0.75rem;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-dim);
		margin: 0 0 0.75rem;
	}

	.day-commits {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
	}

	.day-commits li {
		border-bottom: 1px solid var(--color-border);
	}

	.day-commits li:last-child {
		border-bottom: none;
	}

	.commit-link {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		padding: 0.75rem 0.25rem;
		text-decoration: none;
		transition: padding-left 0.15s;
	}

	.commit-link:hover {
		padding-left: 0.75rem;
		text-decoration: none;
	}

	.commit-link:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
		border-radius: 4px;
	}

	.commit-type {
		font-size: 0.65rem;
		font-family: var(--font-mono);
		padding: 0.1rem 0.4rem;
		border-radius: 999px;
		min-width: 3.5rem;
		text-align: center;
		flex-shrink: 0;
		border: 1px solid var(--color-border);
		color: var(--color-muted);
	}

	.commit-type.feat {
		border-color: var(--color-accent-dim);
		color: var(--color-accent);
	}

	.commit-type.fix {
		border-color: color-mix(in srgb, #5b9bd5 30%, transparent);
		color: #5b9bd5;
	}

	.commit-type.refactor {
		border-color: color-mix(in srgb, #c9a0dc 30%, transparent);
		color: #c9a0dc;
	}

	.commit-type.chore,
	.commit-type.ci {
		border-color: transparent;
		color: var(--color-dim);
	}

	.commit-message {
		font-size: 0.9rem;
		font-weight: 450;
		color: var(--color-text);
		letter-spacing: -0.01em;
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.commit-link:hover .commit-message {
		color: var(--color-accent);
	}

	.commit-meta {
		display: flex;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.commit-sha {
		font-size: 0.7rem;
		font-family: var(--font-mono);
		color: var(--color-dim);
	}

	.commit-repo {
		font-size: 0.6rem;
		font-family: var(--font-mono);
		padding: 0.05rem 0.35rem;
		border-radius: 999px;
		border: 1px solid var(--color-border);
		color: var(--color-dim);
	}

	.commit-repo.digital-person {
		border-color: color-mix(in srgb, #e2a93b 25%, transparent);
		color: #e2a93b;
	}

	.commit-repo.faol-website {
		border-color: var(--color-accent-dim);
		color: var(--color-accent);
	}

	.empty {
		color: var(--color-dim);
		font-size: 0.85rem;
	}

	@media (max-width: 640px) {
		h1 {
			font-size: 1.75rem;
		}

		.commit-link {
			flex-wrap: wrap;
			gap: 0.4rem;
			padding: 0.75rem 0;
		}

		.commit-link:hover {
			padding-left: 0;
		}

		.commit-message {
			white-space: normal;
		}

		.commit-type {
			min-width: auto;
		}
	}
</style>
