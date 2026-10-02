<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { updateSchool } from '../../application/use-cases/schools.usecase';
	import type { SchoolDetail } from '../../domain/school';
	import Card from '../shared/Card.svelte';
	import Input from '../shared/Input.svelte';
	import Button from '../shared/Button.svelte';
	import CredentialGroupCard from './CredentialGroupCard.svelte';
	import {
		CREDENTIAL_GROUPS,
		emptyCredentials
	} from './credential-groups.config';
	import { Check, AlertTriangle, Globe } from '@lucide/svelte';

	export let school: SchoolDetail;

	const OPTIONAL_ALLOCATION_TYPES = ['AstraDB', 'MongoDB', 'Turso', 'NAS'];

	let schoolName = '';
	let subdomainSlug = '';
	let customDomain = '';
	let superAdminEmail = '';
	let maxStorageGb = 5;
	let storageAllocation: string[] = ['Supabase'];
	let credentials = emptyCredentials();
	let configured: Record<string, boolean> = {};
	let error = '';
	let loading = false;

	onMount(() => {
		schoolName = school.schoolName;
		subdomainSlug = school.subdomainSlug;
		customDomain = school.customDomain || '';
		superAdminEmail = school.superAdminEmail || '';
		maxStorageGb = school.maxStorageGb;
		storageAllocation = Array.from(new Set(['Supabase', ...(school.storageAllocation || [])]));

		const c = school.credentials;
		configured = {
			supabaseUrl: c.supaTeachers.isConfigured,
			supabaseKey: c.supaTeachers.isConfigured,
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
		if (db === 'Supabase') return; // Supabase is mandatory
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
			const payload: Record<string, any> = {
				schoolName,
				subdomainSlug,
				customDomain: customDomain.trim(),
				superAdminEmail: superAdminEmail.trim() || null,
				maxStorageGb,
				storageAllocation
			};
			if (credentials.supabaseUrl) {
				payload.supaTeachersUrl = credentials.supabaseUrl;
				payload.supaStudentsUrl = credentials.supabaseUrl;
				payload.supaClassesUrl = credentials.supabaseUrl;
				payload.supaGradesUrl = credentials.supabaseUrl;
			}
			if (credentials.supabaseKey) {
				payload.supaTeachersKey = credentials.supabaseKey;
				payload.supaStudentsKey = credentials.supabaseKey;
				payload.supaClassesKey = credentials.supabaseKey;
				payload.supaGradesKey = credentials.supabaseKey;
			}
			for (const [key, value] of Object.entries(credentials)) {
				if (value && key !== 'supabaseUrl' && key !== 'supabaseKey') {
					payload[key] = value;
				}
			}
			await updateSchool(school.schoolId, payload);
			goto(`/schools/${school.schoolId}`);
		} catch (e: any) {
			if (e.message?.includes('SLUG_TAKEN')) {
				error = 'Subdomain slug sudah digunakan oleh institusi lain.';
			} else if (e.message?.includes('DOMAIN_TAKEN')) {
				error = 'Domain kustom sudah digunakan oleh institusi lain.';
			} else {
				error = 'Gagal menyimpan perubahan: ' + (e.message || 'Error tidak diketahui');
			}
		} finally {
			loading = false;
		}
	}
</script>

<div class="grid gap-6 lg:grid-cols-4">
	<!-- Form Info Utama -->
	<div class="lg:col-span-3 space-y-6">
		<Card class="p-6 space-y-5">
			<h3 class="font-bold text-heading text-base pb-2 border-b border-primary/15">
				Informasi Sekolah & Routing Domain
			</h3>

			<div class="grid gap-4 sm:grid-cols-2">
				<Input label="Nama Sekolah" bind:value={schoolName} />
				<div>
					<Input label="Subdomain Slug" bind:value={subdomainSlug} />
					<p class="-mt-3 text-[11px] font-mono text-primary font-semibold">
						URL: {subdomainSlug || '...'}.amertarva.com
					</p>
				</div>
			</div>

			<!-- Custom Domain Input -->
			<div class="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-2">
				<div class="flex items-center gap-2">
					<Globe class="h-4 w-4 text-primary shrink-0" />
					<h4 class="text-xs font-bold text-heading uppercase tracking-wider">
						Domain Kustom Sekolah (Opsional)
					</h4>
				</div>
				<p class="text-xs text-paragraph leading-relaxed">
					Nama domain mandiri sekolah (misal: <code class="font-mono text-heading font-semibold">lms.sman1.sch.id</code>). Kosongkan jika sekolah hanya menggunakan subdomain Amertarva.
				</p>
				<Input
					label="Domain Sendiri / FQDN"
					placeholder="lms.sman1jkt.sch.id"
					bind:value={customDomain}
				/>
			</div>

			<div>
				<Input
					label="Email Super Admin Sekolah"
					type="email"
					placeholder="admin@sman1jkt.sch.id"
					bind:value={superAdminEmail}
				/>
				<p class="text-xs text-paragraph mt-1">
					Email akun Super Admin / Penanggung Jawab di sekolah ini.
				</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-2">
				<label class="block mb-4">
					<span class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-heading/80"
						>Max Storage (GB)</span
					>
					<input
						type="number"
						min="1"
						bind:value={maxStorageGb}
						class="w-full rounded-lg border border-primary/25 bg-white px-3.5 py-2.5 text-sm text-heading placeholder-paragraph/40 transition-all duration-150 hover:border-primary/45 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none"
					/>
				</label>
			</div>
		</Card>

		<!-- Alokasi database section -->
		<Card class="p-6 space-y-5">
			<div class="flex items-center justify-between pb-2 border-b border-primary/15">
				<div>
					<h3 class="font-bold text-heading text-base">
						Alokasi Penyimpanan Database
					</h3>
					<p class="text-xs text-paragraph mt-0.5">
						Supabase aktif secara bawaan untuk autentikasi & akun tenant. Database lain bersifat opsional.
					</p>
				</div>
			</div>

			<div class="grid gap-3 grid-cols-2 md:grid-cols-5">
				<!-- Supabase: Wajib & Otomatis Aktif -->
				<div
					class="flex flex-col items-center justify-center rounded-xl border border-primary bg-primary/10 text-primary p-3.5 text-center select-none shadow-xs font-bold ring-1 ring-primary relative"
				>
					<span class="absolute top-2 right-2 text-[10px] bg-primary text-white px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
						Wajib
					</span>
					<div class="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white mb-2">
						<Check class="h-3 w-3" />
					</div>
					<span class="text-xs font-bold tracking-wide">Supabase</span>
				</div>

				<!-- Database Tambahan Opsional -->
				{#each OPTIONAL_ALLOCATION_TYPES as db}
					<button
						type="button"
						on:click={() => toggleStorage(db)}
						class="flex flex-col items-center justify-center rounded-xl border p-3.5 text-center transition-all duration-150 select-none cursor-pointer {storageAllocation.includes(
							db
						)
							? 'border-primary bg-primary/10 text-primary ring-1 ring-primary shadow-xs font-bold'
							: 'border-primary/20 bg-white text-heading hover:bg-primary/5 hover:border-primary/40'}"
					>
						<div
							class="flex h-5 w-5 items-center justify-center rounded-full border mb-2 transition-colors {storageAllocation.includes(
								db
							)
								? 'bg-primary border-primary text-white'
								: 'border-heading/30'}"
						>
							{#if storageAllocation.includes(db)}
								<Check class="h-3 w-3" />
							{/if}
						</div>
						<span class="text-xs font-bold tracking-wide">{db}</span>
					</button>
				{/each}
			</div>
		</Card>

		<!-- Group credentials inputs -->
		{#each CREDENTIAL_GROUPS.filter((g) => storageAllocation.includes(g.allocationType)) as group}
			<CredentialGroupCard
				title={group.title}
				fields={group.fields}
				values={credentials}
				{configured}
			/>
		{/each}
	</div>

	<!-- Right side layout helper -->
	<div class="lg:col-span-1 lg:sticky lg:top-8 h-fit space-y-4">
		<Card class="p-5 space-y-3.5">
			<h4 class="font-bold text-heading text-sm">Petunjuk Perubahan</h4>
			<p class="text-xs text-paragraph leading-relaxed">
				Kosongkan kolom kredensial jika Anda tidak ingin mengubah nilai koneksi database yang sudah tersimpan sebelumnya.
			</p>
		</Card>

		{#if error}
			<div
				class="flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-xs font-medium text-rose-700 border border-rose-200"
			>
				<AlertTriangle class="h-4 w-4 shrink-0 text-rose-600" />
				<span>{error}</span>
			</div>
		{/if}

		<div class="space-y-2">
			<Button variant="primary" on:click={handleSubmit} disabled={loading} class="w-full py-2.5 shadow-sm">
				{#if loading}
					Menyimpan...
				{:else}
					Simpan Perubahan
				{/if}
			</Button>
			<Button variant="outline" on:click={() => goto(`/schools/${school.schoolId}`)} class="w-full py-2">
				Batal
			</Button>
		</div>
	</div>
</div>
