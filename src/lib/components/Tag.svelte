<script lang="ts">
// ── Tag Chip ─────────────────────────────────────────────
// Inline tag label — used for display, not interaction.
// Interactive tags use the tag-chip class directly.
	let { tag }: { tag: string } = $props();
</script>

<span class="tag-chip">{tag}</span>
