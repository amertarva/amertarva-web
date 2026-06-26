<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getSchool, deleteSchool } from '$lib/application/use-cases/schools.usecase';
	import type { SchoolDetail } from '$lib/domain/school';
	import Card from '$lib/presentation/shared/Card.svelte';
	import Button from '$lib/presentation/shared/Button.svelte';
	import StatusBadge from '$lib/presentation/components/StatusBadge.svelte';

	let school: SchoolDetail | null = null;
	onMount(async () => {
		school = await getSchool($page.params.id);
	});

	async function handleSuspend() {
		if (!school) return;
		if (!confirm('Nonaktifkan sekolah ini?')) return;
		await deleteSchool(school.schoolId);
		goto('/schools');
	}
</script>

{#if school}
	<div class="max-w-2xl p-6">
		<div class="mb-4 flex items-center justify-between">
			<div>
				<h1 class="text-lg font-semibold text-[#1C2B26]">{school.schoolName}</h1>
				<p class="text-sm text-[#7A9590]">{school.subdomainSlug}.amertarva.com</p>
			</div>
			<div class="flex gap-2">
				<StatusBadge status={school.status} />
				<StatusBadge status={school.initStatus} />
			</div>
		</div>

		<Card class="mb-4 p-4">
			<h3 class="mb-3 font-semibold text-[#789D8E]">Penyimpanan</h3>
			<div class="grid grid-cols-2 gap-2 text-sm">
				<div class="flex items-center justify-between border-b border-[#E2EAE6] py-1">
					<span>Kapasitas Maksimal</span>
					<span class="font-medium text-[#1C2B26]">{school.maxStorageGb} GB</span>
				</div>
				<div class="flex items-center justify-between border-b border-[#E2EAE6] py-1">
					<span>Alokasi Database</span>
					<div class="flex flex-wrap gap-1">
						{#if school.storageAllocation.length > 0}
							{#each school.storageAllocation as db}
								<span
									class="inline-flex items-center rounded-full border border-[#789D8E]/30 bg-[#789D8E]/10 px-2 py-0.5 text-xs font-medium text-[#789D8E]"
								>
									{db}
								</span>
							{/each}
						{:else}
							<span class="text-[#7A9590] italic">Belum dialokasikan</span>
						{/if}
					</div>
				</div>
			</div>
		</Card>

		<Card class="mb-4 p-4">
			<h3 class="mb-3 font-semibold text-[#789D8E]">Status Konfigurasi Database</h3>
			<div class="grid grid-cols-2 gap-2 text-sm">
				{#each Object.entries(school.credentials) as [key, cred]}
					<div class="flex items-center justify-between border-b border-[#E2EAE6] py-1">
						<span class="capitalize">{key}</span>
						<StatusBadge status={cred.isConfigured ? 'DONE' : 'NOT_STARTED'} />
					</div>
				{/each}
			</div>
		</Card>

		<div class="flex gap-2">
			<Button variant="secondary" on:click={() => goto(`/schools/${school?.schoolId}/edit`)}
				>Edit Konfigurasi</Button
			>
			<Button variant="danger" on:click={handleSuspend}>Nonaktifkan</Button>
		</div>
	</div>
{/if}
