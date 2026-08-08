<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let placeholder = 'Cari...';
	export let value = '';
	const dispatch = createEventDispatcher();
	let timer: ReturnType<typeof setTimeout>;

	function handleInput() {
		clearTimeout(timer);
		timer = setTimeout(() => dispatch('search', value), 300);
	}
</script>

<div class="relative w-full">
	<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
		<svg class="h-4 w-4 text-heading/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2.5"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/>
		</svg>
	</div>
	<input
		type="text"
		{placeholder}
		bind:value
		on:input={handleInput}
		class="w-full rounded-xl border border-primary/20 bg-[#F8FAF8]/50 py-2.5 pl-10 pr-4 text-sm text-heading placeholder-heading/40 transition-all duration-200 hover:border-primary/45 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none"
	/>
</div>
