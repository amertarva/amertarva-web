<script lang="ts">
	export let headers: string[] = [];
</script>

<div class="overflow-x-auto rounded-xl border border-[#E2EAE6]">
	<table class="w-full text-sm">
		<thead class="bg-[#F8FAF8] text-[#7A9590]">
			<tr>
				{#each headers as h}
					<th class="px-4 py-2 text-left font-medium">{h}</th>
				{/each}
			</tr>
		</thead>
		<tbody class="divide-y divide-[#E2EAE6]">
			<slot />
		</tbody>
	</table>
</div>
