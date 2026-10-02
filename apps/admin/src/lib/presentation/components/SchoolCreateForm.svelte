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
	import { Check, AlertTriangle, Globe } from '@lucide/svelte';

	const OPTIONAL_ALLOCATION_TYPES = ['AstraDB', 'MongoDB', 'Turso', 'NAS'];

	let schoolName = '';
	let subdomainSlug = '';
	let customDomain = '';
	let superAdminEmail = '';
	let planType: 'CLASSIC' | 'PRO' | 'PREMIUM' | 'CUSTOM' = 'CLASSIC';
	let maxStorageGb = 5;
	let rentDurationMonths = 12;
	let storageAllocation: string[] = ['Supabase'];
	let credentials = emptyCredentials();
	let error = '';
	let loading = false;

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
			const school = await createSchool({
				schoolName,
				subdomainSlug,
				customDomain: customDomain.trim() || undefined,
				superAdminEmail: superAdminEmail.trim() || undefined,
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
			if (e.message?.includes('SLUG_TAKEN')) {
				error = 'Subdomain slug sudah digunakan oleh institusi lain.';
			} else if (e.message?.includes('DOMAIN_TAKEN')) {
				error = 'Domain kustom sudah digunakan oleh institusi lain.';
			} else {
				error = 'Gagal menyimpan sekolah: ' + (e.message || 'Terjadi kesalahan sistem.');
			}
		} finally {
			loading = false;
		}
	}
</script>

<div class="grid gap-6 lg:grid-cols-4">
	<!-- Left: Form Info Utama -->
	<div class="lg:col-span-3 space-y-6">
		<Card class="p-6 space-y-5">
			<h3 class="font-bold text-heading text-base pb-2 border-b border-primary/15">
				Informasi Tenant Sekolah
			</h3>

			<div class="grid gap-4 sm:grid-cols-2">
				<Input label="Nama Sekolah" placeholder="SMA Negeri 1 Jakarta" bind:value={schoolName} />
				<div>
					<Input label="Subdomain Slug (Wajib)" placeholder="sman1jkt" bind:value={subdomainSlug} />
					<p class="-mt-3 text-[11px] font-mono text-primary font-semibold">
						URL Default: {subdomainSlug || '...'}.amertarva.com
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
					Jika sekolah menggunakan nama domain mandiri (misal: <code class="font-mono text-heading font-semibold">lms.sman1.sch.id</code>), Anda dapat mendaftarkannya langsung di sini.
				</p>
				<Input
					label="Domain Sendiri / FQDN"
					placeholder="lms.sman1jkt.sch.id"
					bind:value={customDomain}
				/>
			</div>

			<div>
				<Input
					label="Email Super Admin Sekolah (Opsional)"
					type="email"
					placeholder="admin@sman1jkt.sch.id"
					bind:value={superAdminEmail}
				/>
				<p class="text-xs text-paragraph mt-1">
					Email penanggung jawab atau administrator utama di sekolah ini yang akan mengelola e-learning sekolah.
				</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-3">
				<Select
					label="Paket Layanan"
					bind:value={planType}
					options={[
						{ value: 'CLASSIC', label: 'Classic' },
						{ value: 'PRO', label: 'Pro' },
						{ value: 'PREMIUM', label: 'Premium' },
						{ value: 'CUSTOM', label: 'Custom' }
					]}
				/>

				<label class="block mb-4">
					<span class="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-heading/80"
						>Durasi Sewa (Bulan)</span
					>
					<input
						type="number"
						min="1"
						bind:value={rentDurationMonths}
						class="w-full rounded-lg border border-primary/25 bg-white px-3.5 py-2.5 text-sm text-heading placeholder-paragraph/40 transition-all duration-150 hover:border-primary/45 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 focus:outline-none"
					/>
				</label>

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
			<CredentialGroupCard title={group.title} fields={group.fields} values={credentials} />
		{/each}
	</div>

	<!-- Right side layout helper -->
	<div class="lg:col-span-1 lg:sticky lg:top-8 h-fit space-y-4">
		<Card class="p-5 space-y-3.5">
			<h4 class="font-bold text-heading text-sm">Petunjuk Pendaftaran</h4>
			<ul class="space-y-2.5 text-xs text-paragraph">
				<li class="flex gap-2">
					<span class="text-primary font-bold">•</span>
					<span>Subdomain slug adalah identitas default sistem (<code class="font-mono text-heading">*.amertarva.com</code>).</span>
				</li>
				<li class="flex gap-2">
					<span class="text-primary font-bold">•</span>
					<span>Domain kustom dapat diarahkan melalui CNAME DNS sekolah.</span>
				</li>
				<li class="flex gap-2">
					<span class="text-primary font-bold">•</span>
					<span>Kredensial disimpan dengan enkripsi server AES-256-GCM.</span>
				</li>
			</ul>
		</Card>

		{#if error}
			<div
				class="flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-xs font-medium text-rose-700 border border-rose-200"
			>
				<AlertTriangle class="h-4 w-4 shrink-0 text-rose-600" />
				<span>{error}</span>
			</div>
		{/if}

		<Button variant="primary" on:click={handleSubmit} disabled={loading} class="w-full py-2.5 shadow-sm">
			{#if loading}
				Menyimpan...
			{:else}
				Daftarkan Sekolah
			{/if}
		</Button>
	</div>
</div>
