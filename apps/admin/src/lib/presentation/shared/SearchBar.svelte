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

<input
	type="text"
	{placeholder}
	bind:value
	on:input={handleInput}
	class="w-full rounded-lg border border-[#E2EAE6] px-3 py-2 text-sm
         focus:border-[#789D8E] focus:ring-1 focus:ring-[#789D8E] focus:outline-none"
/>
