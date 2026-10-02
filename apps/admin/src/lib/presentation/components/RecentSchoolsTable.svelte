<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SchoolSummary } from '../../domain/school';
	import StatusBadge from './StatusBadge.svelte';
	import { Globe } from '@lucide/svelte';

	export let recentSchools: SchoolSummary[] = [];
</script>

<div class="space-y-3.5">
	<div class="flex items-center justify-between">
		<h2 class="text-base font-bold text-heading">Pendaftaran Tenant Terbaru</h2>
		<a href="/schools" class="text-xs font-bold text-primary hover:underline">Semua Tenant</a>
	</div>

	<div
		class="overflow-x-auto rounded-xl border border-primary/20 bg-white shadow-[0_1px_3px_rgba(45,52,54,0.05)]"
	>
		<table class="w-full text-sm">
			<thead class="bg-[#EAF2EE]/70 border-b border-primary/20 text-heading">
				<tr>
					<th class="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-heading/85">Nama Sekolah</th>
					<th class="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-heading/85">Masa Sewa</th>
					<th class="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-heading/85">Paket</th>
					<th class="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-heading/85">Status Web</th>
					<th class="px-5 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-heading/85">Aksi</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-primary/10 text-paragraph">
				{#if recentSchools.length === 0}
					<tr>
						<td colspan="5" class="px-5 py-8 text-center text-paragraph/60 italic text-xs">
							Belum ada data sekolah yang terdaftar.
						</td>
					</tr>
				{:else}
					{#each recentSchools as school}
						<tr
							class="group cursor-pointer transition-colors hover:bg-primary/5"
							on:click={() => goto(`/schools/${school.schoolId}`)}
						>
							<td class="px-5 py-3.5 font-medium text-heading">
								<div class="font-bold text-heading text-sm">{school.schoolName}</div>
								<div class="flex items-center gap-1 text-xs text-paragraph/75 font-mono mt-0.5">
									{#if school.customDomain}
										<Globe class="h-3 w-3 text-emerald-700 shrink-0" />
										<span class="text-emerald-800 font-semibold">{school.customDomain}</span>
									{:else}
										<span>{school.subdomainSlug}.amertarva.com</span>
									{/if}
								</div>
							</td>
							<td class="px-5 py-3.5">
								{#if school.rent?.status}
									<StatusBadge status={school.rent.status} />
								{:else}
									<span class="text-xs text-paragraph/50">-</span>
								{/if}
							</td>
							<td class="px-5 py-3.5 text-xs font-semibold text-heading/80">{school.planType}</td>
							<td class="px-5 py-3.5"><StatusBadge status={school.status} /></td>
							<td class="px-5 py-3.5 text-center">
								<span class="inline-flex items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white px-3 py-1 text-xs font-bold border border-primary/25 transition-all">
									Detail
								</span>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>
