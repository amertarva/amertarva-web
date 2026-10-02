<script lang="ts">
	export let label = '';
	export let type = 'text';
	export let value = '';
	export let placeholder = '';
	export let error = '';
</script>

<label class="mb-4 block">
	{#if label}
		<span class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-heading/80">{label}</span>
	{/if}
	<input
		{type}
		{placeholder}
		bind:value
		class="w-full rounded-lg border border-primary/25 bg-white px-3.5 py-2.5 text-sm text-heading placeholder-paragraph/40 transition-all duration-150 hover:border-primary/45 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none"
	/>
	{#if error}
		<span class="mt-1.5 block text-xs text-rose-600 font-medium">{error}</span>
	{/if}
</label>
