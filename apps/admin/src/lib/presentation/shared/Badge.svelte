<script lang="ts">
	export let color: 'green' | 'yellow' | 'red' | 'gray' = 'gray';

	const colors = {
		green: 'bg-[#5A9E7C]/10 text-[#5A9E7C] border-[#5A9E7C]/30',
		yellow: 'bg-[#F4D35E]/20 text-[#E8A838] border-[#E8A838]/30',
		red: 'bg-[#D95F5F]/10 text-[#D95F5F] border-[#D95F5F]/30',
		gray: 'bg-[#E2EAE6] text-[#7A9590] border-[#E2EAE6]'
	};
</script>

<span
	class="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium {colors[
		color
	]}"
>
	<slot />
</span>
