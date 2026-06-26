<script lang="ts">
	export let label = '';
	export let type = 'text';
	export let value = '';
	export let error = '';
</script>

<label class="mb-3 block">
	{#if label}
		<span class="mb-1 block text-sm font-medium text-[#1C2B26]">{label}</span>
	{/if}
	<input
		{type}
		bind:value
		class="w-full rounded-lg border border-[#E2EAE6] px-3 py-2 text-sm
           focus:border-[#789D8E] focus:ring-1 focus:ring-[#789D8E] focus:outline-none"
	/>
	{#if error}
		<span class="mt-1 block text-xs text-[#D95F5F]">{error}</span>
	{/if}
</label>
