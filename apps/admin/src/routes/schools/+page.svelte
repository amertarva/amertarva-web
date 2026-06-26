<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { schoolsStore } from '$lib/application/stores/schools.store';
	import { loadSchools } from '$lib/application/use-cases/schools.usecase';
	import Button from '$lib/presentation/shared/Button.svelte';
	import Table from '$lib/presentation/shared/Table.svelte';
	import SearchBar from '$lib/presentation/shared/SearchBar.svelte';
	import StatusBadge from '$lib/presentation/components/StatusBadge.svelte';

	let search = '';
	onMount(loadSchools);

	$: filtered = $schoolsStore.filter(
		(s) =>
			s.schoolName.toLowerCase().includes(search.toLowerCase()) ||
			s.subdomainSlug.toLowerCase().includes(search.toLowerCase())
	);
</script>

<div class="p-6">
	<div class="mb-4 flex items-center justify-between">
		<h1 class="text-lg font-semibold text-[#1C2B26]">Sekolah</h1>
		<Button variant="primary" on:click={() => goto('/schools/new')}>+ Tambah Sekolah</Button>
	</div>

	<div class="mb-4 max-w-sm">
		<SearchBar bind:value={search} placeholder="Cari sekolah atau subdomain..." />
	</div>

	<Table headers={['Nama Sekolah', 'Subdomain', 'Plan', 'Storage', 'Status', 'Inisialisasi', '']}>
		{#each filtered as school}
			<tr
				class="cursor-pointer hover:bg-[#F8FAF8]"
				on:click={() => goto(`/schools/${school.schoolId}`)}
			>
				<td class="px-4 py-2">{school.schoolName}</td>
				<td class="px-4 py-2 text-[#7A9590]">{school.subdomainSlug}.amertarva.com</td>
				<td class="px-4 py-2">{school.planType}</td>
				<td class="px-4 py-2 text-[#7A9590]">{school.maxStorageGb} GB</td>
				<td class="px-4 py-2"><StatusBadge status={school.status} /></td>
				<td class="px-4 py-2"><StatusBadge status={school.initStatus} /></td>
				<td class="px-4 py-2 text-right text-[#789D8E]">→</td>
			</tr>
		{/each}
	</Table>
</div>
