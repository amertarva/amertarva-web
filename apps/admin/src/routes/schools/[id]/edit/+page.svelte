<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getSchool, updateSchool } from '$lib/application/use-cases/schools.usecase';
	import type { SchoolDetail } from '$lib/domain/school';
	import Card from '$lib/presentation/shared/Card.svelte';
	import Input from '$lib/presentation/shared/Input.svelte';
	import Button from '$lib/presentation/shared/Button.svelte';
	import CredentialGroupCard from '$lib/presentation/components/CredentialGroupCard.svelte';
	import {
		CREDENTIAL_GROUPS,
		emptyCredentials
	} from '$lib/presentation/components/credential-groups.config';

	const ALLOCATION_TYPES = ['Supabase', 'AstraDB', 'MongoDB', 'Turso', 'NAS'];

	let school: SchoolDetail | null = null;
	let schoolName = '';
	let maxStorageGb = 5;
	let storageAllocation: string[] = [];
	let credentials = emptyCredentials();
	let configured: Record<string, boolean> = {};
	let error = '';
	let loading = false;

	onMount(async () => {
		school = await getSchool($page.params.id);
		schoolName = school.schoolName;
		maxStorageGb = school.maxStorageGb;
		storageAllocation = [...school.storageAllocation];

		const c = school.credentials;
		configured = {
			supaTeachersUrl: c.supaTeachers.isConfigured,
			supaTeachersKey: c.supaTeachers.isConfigured,
			supaStudentsUrl: c.supaStudents.isConfigured,
			supaStudentsKey: c.supaStudents.isConfigured,
			supaClassesUrl: c.supaClasses.isConfigured,
			supaClassesKey: c.supaClasses.isConfigured,
			supaGradesUrl: c.supaGrades.isConfigured,
			supaGradesKey: c.supaGrades.isConfigured,
			astradbEndpoint: c.astradb.isConfigured,
			astradbToken: c.astradb.isConfigured,
			astradbNamespace: c.astradb.isConfigured,
			mongodbUri: c.mongodb.isConfigured,
			mongodbDbName: c.mongodb.isConfigured,
			tursoUrl: c.turso.isConfigured,
			tursoAuthToken: c.turso.isConfigured,
			nasUrl: c.nas.isConfigured,
			nasUsername: c.nas.isConfigured,
			nasPassword: c.nas.isConfigured
		};
	});

	function toggleStorage(db: string) {
		if (storageAllocation.includes(db)) {
			storageAllocation = storageAllocation.filter((s) => s !== db);
		} else {
			storageAllocation = [...storageAllocation, db];
		}
	}

	async function handleSubmit() {
		if (!school) return;
		error = '';
		loading = true;
		try {
			const payload: Record<string, any> = {
				schoolName,
				maxStorageGb,
				storageAllocation
			};
			for (const [key, value] of Object.entries(credentials)) {
				if (value) payload[key] = value;
			}
			await updateSchool(school.schoolId, payload);
			goto(`/schools/${school.schoolId}`);
		} catch {
			error = 'Gagal menyimpan perubahan';
		} finally {
			loading = false;
		}
	}
</script>

{#if school}
	<div class="max-w-2xl p-6">
		<h1 class="mb-4 text-lg font-semibold text-[#1C2B26]">
			Edit Konfigurasi — {school.schoolName}
		</h1>

		<Card class="mb-4 p-4">
			<Input label="Nama Sekolah" bind:value={schoolName} />

			<label class="mb-1 block text-sm font-medium text-[#1C2B26]">Max Storage (GB)</label>
			<input
				type="number"
				min="1"
				bind:value={maxStorageGb}
				class="mb-4 w-full rounded-lg border border-[#E2EAE6] px-3 py-2 text-sm
               focus:border-[#789D8E] focus:ring-1 focus:ring-[#789D8E] focus:outline-none"
			/>

			<label class="mb-2 block text-sm font-medium text-[#1C2B26]">Alokasi Penyimpanan</label>
			<div class="mb-1 flex flex-wrap gap-3">
				{#each ALLOCATION_TYPES as db}
					<label class="flex cursor-pointer items-center gap-2 text-sm text-[#1C2B26]">
						<input
							type="checkbox"
							checked={storageAllocation.includes(db)}
							on:change={() => toggleStorage(db)}
							class="accent-[#789D8E]"
						/>
						{db}
					</label>
				{/each}
			</div>
		</Card>

		{#each CREDENTIAL_GROUPS.filter((g) => storageAllocation.includes(g.allocationType)) as group}
			<CredentialGroupCard
				title={group.title}
				fields={group.fields}
				values={credentials}
				{configured}
			/>
		{/each}

		{#if error}
			<p class="mb-3 text-sm text-[#D95F5F]">{error}</p>
		{/if}

		<Button variant="primary" on:click={handleSubmit} disabled={loading} class="w-full">
			{loading ? 'Menyimpan...' : 'Simpan Perubahan'}
		</Button>
	</div>
{/if}
