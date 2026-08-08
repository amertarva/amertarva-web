<script lang="ts">
	import { goto } from '$app/navigation';
	import { createSchool } from '../../application/use-cases/schools.usecase';
	import Card from '../shared/Card.svelte';
	import Input from '../shared/Input.svelte';
	import Button from '../shared/Button.svelte';
	import Select from '../shared/Select.svelte';
	import CredentialGroupCard from './CredentialGroupCard.svelte';
	import {
		CREDENTIAL_GROUPS,
		emptyCredentials
	} from './credential-groups.config';

	const ALLOCATION_TYPES = ['Supabase', 'AstraDB', 'MongoDB', 'Turso', 'NAS'];

	let schoolName = '';
	let subdomainSlug = '';
	let planType: 'CLASSIC' | 'PREMIUM' | 'CUSTOM' = 'CLASSIC';
	let maxStorageGb = 5;
	let rentDurationMonths = 12;
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
				rentDurationMonths,
				maxStorageGb,
				storageAllocation,
				supaTeachersUrl: credentials.supabaseUrl || '',
				supaTeachersKey: credentials.supabaseKey || '',
				supaStudentsUrl: credentials.supabaseUrl || '',
				supaStudentsKey: credentials.supabaseKey || '',
				supaClassesUrl: credentials.supabaseUrl || '',
				supaClassesKey: credentials.supabaseKey || '',
				supaGradesUrl: credentials.supabaseUrl || '',
				supaGradesKey: credentials.supabaseKey || '',
				astradbEndpoint: credentials.astradbEndpoint || '',
				astradbToken: credentials.astradbToken || '',
				astradbNamespace: credentials.astradbNamespace || '',
				mongodbUri: credentials.mongodbUri || '',
				mongodbDbName: credentials.mongodbDbName || '',
				tursoUrl: credentials.tursoUrl || '',
				tursoAuthToken: credentials.tursoAuthToken || '',
				nasUrl: credentials.nasUrl || '',
				nasUsername: credentials.nasUsername || '',
				nasPassword: credentials.nasPassword || ''
			});
			goto(`/schools/${school.schoolId}`);
		} catch (e: any) {
			error = e.message === 'SLUG_TAKEN' ? 'Subdomain sudah dipakai' : 'Gagal menyimpan sekolah';
		} finally {
			loading = false;
		}
	}
</script>

<div class="grid gap-6 lg:grid-cols-4">
	<!-- Left: Form Info Utama -->
	<div class="lg:col-span-3 space-y-6">
		<Card class="p-6 space-y-5">
			<h3 class="font-bold text-heading text-base pb-2 border-b border-primary/10">
				Informasi Sekolah
			</h3>

			<div class="grid gap-4 sm:grid-cols-2">
				<Input label="Nama Sekolah" placeholder="SMA Negeri 1 Jakarta" bind:value={schoolName} />
				<div>
					<Input label="Subdomain Slug" placeholder="sman1jkt" bind:value={subdomainSlug} />
					<p class="-mt-3.5 text-[11px] font-medium text-primary">
						Pratinjau URL: <span class="font-mono">{subdomainSlug || '...'}.amertarva.com</span>
					</p>
				</div>
			</div>

			<div class="grid gap-4 sm:grid-cols-3">
				<Select
					label="Plan Type"
					bind:value={planType}
					options={[
						{ value: 'CLASSIC', label: 'Classic' },
						{ value: 'PRO', label: 'Pro' },
						{ value: 'PREMIUM', label: 'Premium' },
						{ value: 'CUSTOM', label: 'Custom' }
					]}
				/>
				<label class="block">
					<span class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-heading/70"
						>Max Storage (GB)</span
					>
					<input
						type="number"
						min="1"
						bind:value={maxStorageGb}
						class="w-full rounded-xl border border-primary/20 bg-[#F8FAF8]/50 px-3.5 py-2.5 text-sm text-heading placeholder-heading/40 transition-all duration-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none"
					/>
				</label>
				<label class="block">
					<span class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-heading/70"
						>Durasi Sewa (Bulan)</span
					>
					<input
						type="number"
						min="1"
						bind:value={rentDurationMonths}
						class="w-full rounded-xl border border-primary/20 bg-[#F8FAF8]/50 px-3.5 py-2.5 text-sm text-heading placeholder-heading/40 transition-all duration-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none"
					/>
				</label>
			</div>
		</Card>

		<!-- Alokasi database section -->
		<Card class="p-6 space-y-5">
			<h3 class="font-bold text-heading text-base pb-2 border-b border-primary/10">
				Alokasi Penyimpanan Database
			</h3>

			<div class="grid gap-3 grid-cols-2 md:grid-cols-5">
				{#each ALLOCATION_TYPES as db}
					<button
						type="button"
						on:click={() => toggleStorage(db)}
						class="flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all duration-200 select-none {storageAllocation.includes(
							db
						)
							? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20 shadow-sm'
							: 'border-primary/10 bg-[#F8FAF8]/30 text-heading hover:bg-primary/5 hover:border-primary/30'}"
					>
						<!-- Checkmark / Bullet indicator -->
						<div
							class="flex h-5 w-5 items-center justify-center rounded-full border mb-3 transition-colors {storageAllocation.includes(
								db
							)
								? 'bg-primary border-primary text-white'
								: 'border-heading/20'}"
						>
							{#if storageAllocation.includes(db)}
								<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="3"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							{/if}
						</div>
						<span class="text-xs font-bold uppercase tracking-wider">{db}</span>
					</button>
				{/each}
			</div>
		</Card>

		<!-- Group credentials inputs -->
		{#each CREDENTIAL_GROUPS.filter((g) => storageAllocation.includes(g.allocationType)) as group}
			<CredentialGroupCard title={group.title} fields={group.fields} values={credentials} />
		{/each}
	</div>

	<!-- Right side layout helper -->
	<div class="lg:col-span-1 lg:sticky lg:top-8 h-fit space-y-6">
		<Card class="p-6 space-y-4">
			<h4 class="font-bold text-heading text-sm">Petunjuk Registrasi</h4>
			<ul class="space-y-3 text-xs text-paragraph">
				<li class="flex gap-2">
					<span class="text-primary font-bold">•</span>
					<span>Isi nama sekolah dan tentukan subdomain unik yang belum pernah digunakan.</span>
				</li>
				<li class="flex gap-2">
					<span class="text-primary font-bold">•</span>
					<span>Pilih alokasi database yang diinginkan (Supabase, AstraDB, MongoDB, dll).</span>
				</li>
				<li class="flex gap-2">
					<span class="text-primary font-bold">•</span>
					<span>Masukkan parameter koneksi credential database secara akurat.</span>
				</li>
				<li class="flex gap-2">
					<span class="text-primary font-bold">•</span>
					<span>Kredensial disimpan dengan enkripsi militer AES-256-GCM.</span>
				</li>
			</ul>
		</Card>

		{#if error}
			<div
				class="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-xs font-medium text-red-600 border border-red-100 shadow-sm"
			>
				<svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
				<span>{error}</span>
			</div>
		{/if}

		<Button variant="primary" on:click={handleSubmit} disabled={loading} class="w-full py-3 shadow-md">
			{#if loading}
				<svg class="mr-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
				Mendaftarkan...
			{:else}
				Simpan & Daftarkan Sekolah
			{/if}
		</Button>
	</div>
</div>
