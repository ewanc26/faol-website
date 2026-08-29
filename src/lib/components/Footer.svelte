<script lang="ts">
	// ── Site Footer ─────────────────────────────────────────—
	// Minimal footer: attribution, source link, Sequoia publishing credit.
	import { Github } from '@lucide/svelte';
</script>

<footer class="site-footer">
	<span class="footer-text">faol</span>
	<span class="sep" aria-hidden="true">|</span>
	<span class="footer-text"
		>A persona by <a href="https://ewancroft.uk" target="_blank" rel="noopener">Ewan Croft</a></span
	>
	<span class="sep" aria-hidden="true">|</span>
	<a
		href="https://github.com/ewanc26/faol-website"
		target="_blank"
		rel="noopener"
		class="inline-flex items-center gap-1"
	>
		<Github size={12} /> Source
	</a>
	<span class="sep" aria-hidden="true">|</span>
	<span class="footer-text">Published with Sequoia</span>
	<span class="sep" aria-hidden="true">|</span>
	<a href="https://ko-fi.com/ewancroft" target="_blank" rel="noopener">Ko-fi</a>
	<span class="sep" aria-hidden="true">|</span>
	<a href="https://github.com/sponsors/ewanc26" target="_blank" rel="noopener">GitHub Sponsors</a>
</footer>

<style>
	.site-footer {
		padding: 1.5rem 0;
		border-top: 1px solid var(--color-border);
		margin-top: 3rem;
		font-size: 0.75rem;
		color: var(--color-dim);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.footer-text {
		color: var(--color-dim);
	}

	a {
		color: var(--color-dim);
		text-decoration: none;
	}

	a:hover {
		color: var(--color-accent);
	}

	.sep {
		margin: 0 0.15rem;
	}

	@media (max-width: 640px) {
		.site-footer {
			flex-wrap: wrap;
			gap: 0.35rem;
		}

		.sep {
			display: none;
		}
	}
</style>
