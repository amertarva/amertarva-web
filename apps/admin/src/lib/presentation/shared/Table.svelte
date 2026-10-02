<script lang="ts">
	export let headers: (string | { label: string; align?: 'left' | 'center' | 'right' })[] = [];

	function getAlign(h: string | { label: string; align?: 'left' | 'center' | 'right' }): string {
		if (typeof h === 'object' && h.align) {
			return h.align === 'center' ? 'text-center' : h.align === 'right' ? 'text-right' : 'text-left';
		}
		const label = typeof h === 'string' ? h : h.label;
		if (label.toLowerCase() === 'aksi') return 'text-center';
		return 'text-left';
	}

	function getLabel(h: string | { label: string; align?: 'left' | 'center' | 'right' }): string {
		return typeof h === 'string' ? h : h.label;
	}
</script>

<div class="overflow-x-auto rounded-xl border border-primary/20 bg-white shadow-[0_1px_3px_rgba(45,52,54,0.05)]">
	<table class="w-full text-sm">
		<thead class="bg-[#EAF2EE]/70 border-b border-primary/20 text-heading">
			<tr>
				{#each headers as h}
					<th class="px-5 py-3.5 {getAlign(h)} text-xs font-bold uppercase tracking-wider text-heading/85">
						{getLabel(h)}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody class="divide-y divide-primary/10 text-paragraph">
			<slot />
		</tbody>
	</table>
</div>
