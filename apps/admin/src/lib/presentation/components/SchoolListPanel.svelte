<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SchoolSummary } from '../../domain/school';
	import Button from '../shared/Button.svelte';
	import Table from '../shared/Table.svelte';
	import SearchBar from '../shared/SearchBar.svelte';
	import StatusBadge from './StatusBadge.svelte';

	export let schools: SchoolSummary[] = [];

	let search = '';

	$: filtered = schools.filter(
		(s) =>
			s.schoolName.toLowerCase().includes(search.toLowerCase()) ||
			s.subdomainSlug.toLowerCase().includes(search.toLowerCase())
	);
</script>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold tracking-tight text-heading">Kelola Sekolah</h1>
			<p class="text-sm text-paragraph">
				Lihat dan konfigurasikan tenant sekolah dalam ekosistem Amertarva.
			</p>
		</div>
		<div>
			<Button variant="primary" on:click={() => goto('/schools/new')}>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
				</svg>
				Tambah Sekolah
			</Button>
		</div>
	</div>

	<!-- Filter Actions -->
	<div class="flex items-center gap-4">
		<div class="w-full max-w-md">
			<SearchBar bind:value={search} placeholder="Cari sekolah atau subdomain..." />
		</div>
	</div>

	<!-- Schools Table -->
	<Table
		headers={['Nama Sekolah', 'Subdomain', 'Plan Type', 'Storage', 'Status', 'Inisialisasi', '']}
	>
		{#if filtered.length === 0}
			<tr>
				<td colspan="7" class="px-5 py-8 text-center text-paragraph/50 italic">
					Tidak ada sekolah yang cocok dengan pencarian Anda.
				</td>
			</tr>
		{:else}
			{#each filtered as school}
				<tr
					class="group cursor-pointer transition-colors hover:bg-primary/5"
					on:click={() => goto(`/schools/${school.schoolId}`)}
				>
					<td class="px-5 py-4 font-semibold text-heading">{school.schoolName}</td>
					<td class="px-5 py-4 text-paragraph/85 font-mono text-xs"
						>{school.subdomainSlug}.amertarva.com</td
					>
					<td class="px-5 py-4">
						<span
							class="inline-flex items-center rounded-lg bg-heading/5 px-2.5 py-1 text-xs font-semibold text-heading/80 border border-heading/10"
						>
							{school.planType}
						</span>
					</td>
					<td class="px-5 py-4 font-medium text-heading/90">{school.maxStorageGb} GB</td>
					<td class="px-5 py-4"><StatusBadge status={school.status} /></td>
					<td class="px-5 py-4"><StatusBadge status={school.initStatus} /></td>
					<td
						class="px-5 py-4 text-right text-primary font-bold transition-transform group-hover:translate-x-1"
						>→</td
					>
				</tr>
			{/each}
		{/if}
	</Table>
</div>
