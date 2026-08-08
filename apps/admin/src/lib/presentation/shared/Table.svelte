<script lang="ts">
	export let headers: string[] = [];
</script>

<div class="overflow-x-auto rounded-2xl border border-primary/10 bg-white shadow-[0_4px_20px_-4px_rgba(120,157,142,0.08)]">
	<table class="w-full text-sm">
		<thead class="bg-primary/5 text-heading/70">
			<tr>
				{#each headers as h}
					<th class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">{h}</th>
				{/each}
			</tr>
		</thead>
		<tbody class="divide-y divide-primary/5 text-paragraph">
			<slot />
		</tbody>
	</table>
</div>
