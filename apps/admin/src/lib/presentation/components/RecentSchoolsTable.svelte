<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SchoolSummary } from '../../domain/school';
	import StatusBadge from './StatusBadge.svelte';

	export let recentSchools: SchoolSummary[] = [];
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<h2 class="text-lg font-bold text-heading">Pendaftaran Terbaru</h2>
		<a href="/schools" class="text-xs font-bold text-primary hover:underline">Lihat Semua →</a>
	</div>

	<div
		class="overflow-x-auto rounded-2xl border border-primary/10 bg-white shadow-[0_4px_20px_-4px_rgba(120,157,142,0.08)]"
	>
		<table class="w-full text-sm">
			<thead class="bg-primary/5 text-heading/70">
				<tr>
					<th class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider"
						>Nama Sekolah</th
					>
					<th class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider"
						>Subdomain</th
					>
					<th class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider">Plan</th>
					<th class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider"
						>Status</th
					>
					<th class="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider"></th>
				</tr>
			</thead>
			<tbody class="divide-y divide-primary/5 text-paragraph">
				{#if recentSchools.length === 0}
					<tr>
						<td colspan="5" class="px-5 py-8 text-center text-paragraph/50 italic">
							Belum ada sekolah yang terdaftar.
						</td>
					</tr>
				{:else}
					{#each recentSchools as school}
						<tr
							class="group cursor-pointer transition-colors hover:bg-primary/5"
							on:click={() => goto(`/schools/${school.schoolId}`)}
						>
							<td class="px-5 py-4 font-medium text-heading">{school.schoolName}</td>
							<td class="px-5 py-4 text-paragraph/80">{school.subdomainSlug}.amertarva.com</td>
							<td class="px-5 py-4">{school.planType}</td>
							<td class="px-5 py-4"><StatusBadge status={school.status} /></td>
							<td
								class="px-5 py-4 text-right text-primary font-bold transition-transform group-hover:translate-x-1"
								>→</td
							>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>
