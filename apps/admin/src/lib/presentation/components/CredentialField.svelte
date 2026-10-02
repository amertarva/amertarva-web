<script lang="ts">
	import { Check, Eye, EyeOff } from '@lucide/svelte';

	export let label = '';
	export let value = '';
	export let isConfigured = false;

	let visible = false;
	let touched = false;

	function toggle() {
		visible = !visible;
	}
	function handleInput() {
		touched = true;
	}
</script>

<label class="mb-3 block">
	<span class="mb-1 flex items-center justify-between text-xs font-semibold text-heading/85">
		<span>{label}</span>
		{#if isConfigured && !touched}
			<span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
				<Check class="h-3 w-3 text-emerald-600" />
				<span>tersimpan</span>
			</span>
		{/if}
	</span>
	<div class="relative">
		<input
			type={visible ? 'text' : 'password'}
			bind:value
			on:input={handleInput}
			placeholder={isConfigured ? '••••••••••••' : 'Masukkan parameter koneksi...'}
			class="w-full rounded-lg border border-primary/25 bg-white px-3 py-2 pr-24 text-xs font-mono text-heading placeholder-paragraph/40 transition-all duration-150 hover:border-primary/45 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none"
		/>
		<button
			type="button"
			on:click={toggle}
			class="absolute top-1/2 right-2 -translate-y-1/2 inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold text-primary hover:bg-primary/10 transition-colors cursor-pointer"
		>
			{#if visible}
				<EyeOff class="h-3 w-3" />
				<span>Sembunyikan</span>
			{:else}
				<Eye class="h-3 w-3" />
				<span>Tampilkan</span>
			{/if}
		</button>
	</div>
</label>
