<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { ChevronDown } from '@lucide/svelte';

	export let label = '';
	export let value = '';
	export let options: { value: any; label: string }[] = [];
	export let error = '';

	let isOpen = false;
	let containerRef: HTMLDivElement;

	function toggle() {
		isOpen = !isOpen;
	}

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

	$: activeOption = options.find((opt) => opt.value === value);
	$: activeLabel = activeOption ? activeOption.label : 'Pilih opsi...';
</script>

<div class="mb-4 block relative" bind:this={containerRef}>
	{#if label}
		<span class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-heading/80">
			{label}
		</span>
	{/if}
	<div class="relative">
		<button
			type="button"
			on:click|stopPropagation={toggle}
			class="flex w-full items-center justify-between rounded-lg border border-primary/25 bg-white px-3.5 py-2.5 text-sm text-heading transition-all duration-150 hover:border-primary/45 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none text-left cursor-pointer"
		>
			<span class="truncate font-medium">{activeLabel}</span>
			<ChevronDown
				class="h-4 w-4 text-heading/50 transition-transform duration-150 shrink-0 {isOpen
					? 'rotate-180'
					: ''}"
			/>
		</button>

		{#if isOpen}
			<div
				class="absolute left-0 z-30 mt-1.5 w-full rounded-lg border border-primary/20 bg-white py-1 shadow-md focus:outline-none max-h-60 overflow-y-auto"
			>
				{#if options && options.length > 0}
					{#each options as opt}
						<button
							type="button"
							on:click={() => selectOption(opt.value)}
							class="flex w-full items-center px-3.5 py-2 text-sm text-left transition-colors focus:outline-none {opt.value === value
								? 'bg-primary/10 text-primary font-bold'
								: 'text-paragraph hover:bg-primary/5 hover:text-heading'}"
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
		<span class="mt-1.5 block text-xs text-rose-600 font-medium">{error}</span>
	{/if}
</div>
