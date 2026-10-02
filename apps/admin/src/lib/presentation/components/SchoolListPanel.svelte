<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SchoolSummary } from '../../domain/school';
	import Button from '../shared/Button.svelte';
	import Table from '../shared/Table.svelte';
	import SearchBar from '../shared/SearchBar.svelte';
	import StatusBadge from './StatusBadge.svelte';
	import { Globe, Plus } from '@lucide/svelte';

	export let schools: SchoolSummary[] = [];

	let search = '';

	$: filtered = schools.filter(
		(s) =>
			s.schoolName.toLowerCase().includes(search.toLowerCase()) ||
			s.subdomainSlug.toLowerCase().includes(search.toLowerCase()) ||
			(s.customDomain && s.customDomain.toLowerCase().includes(search.toLowerCase()))
	);
</script>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold tracking-tight text-heading">Kelola Sekolah (Tenant Registry)</h1>
			<p class="text-sm text-paragraph mt-0.5">
				Daftar seluruh tenant institusi sekolah, konfigurasi domain kustom, dan status kill-switch.
			</p>
		</div>
		<div>
			<Button variant="primary" class="inline-flex items-center gap-1.5" on:click={() => goto('/schools/new')}>
				<Plus class="h-4 w-4" />
				<span>Tambah Sekolah</span>
			</Button>
		</div>
	</div>

	<!-- Filter Actions -->
	<div class="flex items-center gap-4">
		<div class="w-full max-w-md">
			<SearchBar bind:value={search} placeholder="Cari nama sekolah, subdomain, atau domain kustom..." />
		</div>
	</div>

	<!-- Schools Table -->
	<Table
		headers={['Nama Sekolah & Domain', 'Paket', 'Masa Sewa', 'Status Web (Kill-Switch)', 'Inisialisasi', 'Aksi']}
	>
		{#if filtered.length === 0}
			<tr>
				<td colspan="6" class="px-5 py-8 text-center text-paragraph/60 italic text-xs">
					Tidak ada sekolah yang cocok dengan pencarian Anda.
				</td>
			</tr>
		{:else}
			{#each filtered as school}
				<tr
					class="group cursor-pointer transition-colors hover:bg-primary/5"
					on:click={() => goto(`/schools/${school.schoolId}`)}
				>
					<td class="px-5 py-3.5">
						<div class="font-bold text-heading text-sm">{school.schoolName}</div>
						<div class="flex flex-wrap items-center gap-2 mt-0.5 text-xs font-mono">
							<span class="text-paragraph/75">{school.subdomainSlug}.amertarva.com</span>
							{#if school.customDomain}
								<span class="text-paragraph/40">•</span>
								<span class="inline-flex items-center gap-1 text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[11px]">
									<Globe class="h-3 w-3 text-emerald-700" />
									<span>{school.customDomain}</span>
								</span>
							{/if}
						</div>
					</td>

					<td class="px-5 py-3.5">
						<span
							class="inline-flex items-center rounded bg-heading/5 px-2.5 py-1 text-xs font-bold text-heading/80 border border-heading/10"
						>
							{school.planType}
						</span>
					</td>

					<td class="px-5 py-3.5 text-xs">
						{#if school.rent?.status}
							<div class="space-y-1">
								<StatusBadge status={school.rent.status} />
								{#if school.rent.endDate}
									<p class="text-[11px] text-paragraph/80 font-mono">
										s/d {new Date(school.rent.endDate).toLocaleDateString('id-ID', {
											day: 'numeric',
											month: 'short',
											year: 'numeric'
										})}
									</p>
								{/if}
							</div>
						{:else}
							<span class="text-paragraph/50 italic">-</span>
						{/if}
					</td>

					<td class="px-5 py-3.5">
						<StatusBadge status={school.status} />
						{#if school.suspensionReason}
							<span class="block text-[11px] text-rose-700 font-mono mt-0.5 font-medium">
								{school.suspensionReason}
							</span>
						{/if}
					</td>

					<td class="px-5 py-3.5">
						<StatusBadge status={school.initStatus} />
						{#if school.superAdminEmail}
							<span class="block text-[11px] text-paragraph/80 font-mono mt-0.5 truncate max-w-[150px]" title={school.superAdminEmail}>
								{school.superAdminEmail}
							</span>
						{/if}
					</td>

					<td class="px-5 py-3.5 text-center">
						<span class="inline-flex items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white px-3 py-1 text-xs font-bold border border-primary/25 transition-all">
							Detail
						</span>
					</td>
				</tr>
			{/each}
		{/if}
	</Table>
</div>
