<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let label = '';
	export let value = '';
	export let options: { value: any; label: string }[] = [];
	export let error = '';

	let isOpen = false;
	let containerRef: HTMLDivElement;

	function toggle() {
		isOpen = !isOpen;
	}

	// Svelte 5 standard click handler with target check
	function handleOutsideClick(event: MouseEvent) {
		if (isOpen && containerRef && !containerRef.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('click', handleOutsideClick);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('click', handleOutsideClick);
		}
	});

	function selectOption(val: any) {
		value = val;
		isOpen = false;
	}

	// Derived values for reactivity
	$: activeOption = options.find((opt) => opt.value === value);
	$: activeLabel = activeOption ? activeOption.label : 'Pilih opsi...';
</script>

<div class="mb-4 block relative" bind:this={containerRef}>
	{#if label}
		<span class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-heading/70">
			{label}
		</span>
	{/if}
	<div class="relative">
		<button
			type="button"
			on:click|stopPropagation={toggle}
			class="flex w-full items-center justify-between rounded-xl border border-primary/20 bg-[#F8FAF8]/50 px-3.5 py-2.5 text-sm text-heading transition-all duration-200 hover:border-primary/45 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none text-left cursor-pointer"
		>
			<span class="truncate">{activeLabel}</span>
			<svg
				class="h-4 w-4 text-heading/40 transition-transform duration-200 shrink-0 {isOpen
					? 'rotate-180'
					: ''}"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		{#if isOpen}
			<div
				class="absolute left-0 z-30 mt-1.5 w-full rounded-xl border border-primary/10 bg-white py-1 shadow-lg shadow-primary/5 focus:outline-none max-h-60 overflow-y-auto"
			>
				{#if options && options.length > 0}
					{#each options as opt}
						<button
							type="button"
							on:click={() => selectOption(opt.value)}
							class="flex w-full items-center px-3.5 py-2.5 text-sm text-left transition-colors focus:outline-none {opt.value === value
								? 'bg-primary/10 text-primary font-bold'
								: 'text-paragraph hover:bg-primary/5 hover:text-primary'}"
						>
							<span class="truncate">{opt.label}</span>
						</button>
					{/each}
				{:else}
					<div class="px-3.5 py-2 text-xs text-paragraph/50 italic text-center">
						Tidak ada opsi
					</div>
				{/if}
			</div>
		{/if}
	</div>
	{#if error}
		<span class="mt-1.5 block text-xs text-red-500 font-medium">{error}</span>
	{/if}
</div>
