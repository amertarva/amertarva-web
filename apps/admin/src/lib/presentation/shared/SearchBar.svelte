<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Search } from '@lucide/svelte';

	export let placeholder = 'Cari...';
	export let value = '';
	const dispatch = createEventDispatcher();
	let timer: ReturnType<typeof setTimeout>;

	function handleInput() {
		clearTimeout(timer);
		timer = setTimeout(() => dispatch('search', value), 250);
	}
</script>

<div class="relative w-full">
	<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
		<Search class="h-4 w-4 text-heading/40" />
	</div>
	<input
		type="text"
		{placeholder}
		bind:value
		on:input={handleInput}
		class="w-full rounded-lg border border-primary/25 bg-white py-2.5 pl-10 pr-4 text-sm text-heading placeholder-paragraph/40 transition-all duration-150 hover:border-primary/45 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none shadow-xs"
	/>
</div>
