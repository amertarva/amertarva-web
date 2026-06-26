<script lang="ts">
	import { goto } from '$app/navigation';
	import { createSchool } from '$lib/application/use-cases/schools.usecase';
	import Card from '$lib/presentation/shared/Card.svelte';
	import Input from '$lib/presentation/shared/Input.svelte';
	import Button from '$lib/presentation/shared/Button.svelte';
	import CredentialGroupCard from '$lib/presentation/components/CredentialGroupCard.svelte';
	import {
		CREDENTIAL_GROUPS,
		emptyCredentials
	} from '$lib/presentation/components/credential-groups.config';

	const ALLOCATION_TYPES = ['Supabase', 'AstraDB', 'MongoDB', 'Turso', 'NAS'];

	let schoolName = '';
	let subdomainSlug = '';
	let planType: 'CLASSIC' | 'PREMIUM' | 'CUSTOM' = 'CLASSIC';
	let maxStorageGb = 5;
	let storageAllocation: string[] = [];
	let credentials = emptyCredentials();
	let error = '';
	let loading = false;

	function toggleStorage(db: string) {
		if (storageAllocation.includes(db)) {
			storageAllocation = storageAllocation.filter((s) => s !== db);
		} else {
			storageAllocation = [...storageAllocation, db];
		}
	}

	async function handleSubmit() {
		error = '';
		loading = true;
		try {
			const school = await createSchool({
				schoolName,
				subdomainSlug,
				planType,
				maxStorageGb,
				storageAllocation,
				...credentials
			});
			goto(`/schools/${school.schoolId}`);
		} catch (e: any) {
			error = e.message === 'SLUG_TAKEN' ? 'Subdomain sudah dipakai' : 'Gagal menyimpan sekolah';
		} finally {
			loading = false;
		}
	}
</script>

<div class="max-w-2xl p-6">
	<h1 class="mb-4 text-lg font-semibold text-[#1C2B26]">Tambah Sekolah</h1>

	<Card class="mb-4 p-4">
		<h3 class="mb-3 font-semibold text-[#789D8E]">Info Sekolah</h3>
		<Input label="Nama Sekolah" bind:value={schoolName} />
		<Input label="Subdomain Slug" bind:value={subdomainSlug} />
		<p class="-mt-2 mb-3 text-xs text-[#7A9590]">{subdomainSlug || '...'}.amertarva.com</p>

		<label class="mb-1 block text-sm font-medium text-[#1C2B26]">Plan Type</label>
		<select
			bind:value={planType}
			class="mb-4 w-full rounded-lg border border-[#E2EAE6] px-3 py-2 text-sm"
		>
			<option value="CLASSIC">Classic</option>
			<option value="PREMIUM">Premium</option>
			<option value="CUSTOM">Custom</option>
		</select>

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
		<CredentialGroupCard title={group.title} fields={group.fields} values={credentials} />
	{/each}

	{#if error}
		<p class="mb-3 text-sm text-[#D95F5F]">{error}</p>
	{/if}

	<Button variant="primary" on:click={handleSubmit} disabled={loading} class="w-full">
		{loading ? 'Menyimpan...' : 'Simpan Konfigurasi'}
	</Button>
</div>
