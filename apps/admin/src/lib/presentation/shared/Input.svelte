<script lang="ts">
	export let label = '';
	export let type = 'text';
	export let value = '';
	export let placeholder = '';
	export let error = '';
</script>

<label class="mb-4 block">
	{#if label}
		<span class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-heading/70">{label}</span>
	{/if}
	<input
		{type}
		{placeholder}
		bind:value
		class="w-full rounded-xl border border-primary/20 bg-[#F8FAF8]/50 px-3.5 py-2.5 text-sm text-heading placeholder-heading/40 transition-all duration-200 hover:border-primary/45 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none"
	/>
	{#if error}
		<span class="mt-1.5 block text-xs text-red-500 font-medium">{error}</span>
	{/if}
</label>
