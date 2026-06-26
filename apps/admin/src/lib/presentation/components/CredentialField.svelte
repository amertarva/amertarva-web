<script lang="ts">
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
	<span class="mb-1 flex items-center gap-2 text-sm font-medium text-[#1C2B26]">
		{label}
		{#if isConfigured && !touched}
			<span class="text-xs text-[#5A9E7C]">✓ tersimpan</span>
		{/if}
	</span>
	<div class="relative">
		<input
			type={visible ? 'text' : 'password'}
			bind:value
			on:input={handleInput}
			placeholder={isConfigured ? '••••••••••••' : ''}
			class="w-full rounded-lg border border-[#E2EAE6] px-3 py-2 pr-20 text-sm
             focus:border-[#789D8E] focus:ring-1 focus:ring-[#789D8E] focus:outline-none"
		/>
		<button
			type="button"
			on:click={toggle}
			class="absolute top-1/2 right-2 -translate-y-1/2 text-xs text-[#7A9590]"
		>
			{visible ? 'Sembunyikan' : 'Lihat'}
		</button>
	</div>
</label>
