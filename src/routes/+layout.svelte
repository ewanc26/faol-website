<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';

	let { children }: { children: any } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="shell">
	<div class="container">
		<Header current={page.url.pathname} />
	</div>
	<main class="container main">
		<div class="content">
			{@render children()}
		</div>
	</main>
	<div class="container">
		<Footer />
	</div>
</div>

<style>
	.shell {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.container {
		width: 100%;
		max-width: 80vw;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.main {
		flex: 1;
		padding: 2.5rem 1.5rem;
	}

	.content {
		max-width: 65%;
	}

	@media (max-width: 640px) {
		.container {
			padding: 0 1rem;
			max-width: 100%;
		}

		.main {
			padding: 1.5rem 1rem;
		}

		.content {
			max-width: 100%;
		}
	}
</style>
