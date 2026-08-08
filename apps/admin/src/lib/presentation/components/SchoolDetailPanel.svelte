<script lang="ts">
	import { goto } from '$app/navigation';
	import { deleteSchool } from '../../application/use-cases/schools.usecase';
	import type { SchoolDetail } from '../../domain/school';
	import Card from '../shared/Card.svelte';
	import Button from '../shared/Button.svelte';
	import StatusBadge from './StatusBadge.svelte';

	let { school }: { school: SchoolDetail } = $props();

	let displayCredentials = $derived([
		{
			name: 'Supabase',
			isConfigured: school.credentials.supaTeachers?.isConfigured || false
		},
		{
			name: 'AstraDB',
			isConfigured: school.credentials.astradb?.isConfigured || false
		},
		{
			name: 'MongoDB',
			isConfigured: school.credentials.mongodb?.isConfigured || false
		},
		{
			name: 'Turso',
			isConfigured: school.credentials.turso?.isConfigured || false
		},
		{
			name: 'NAS Storage',
			isConfigured: school.credentials.nas?.isConfigured || false
		}
	].filter(item => {
		const prefix = item.name.split(' ')[0];
		return school.storageAllocation.includes(prefix);
	}));

	async function handleSuspend() {
		if (!confirm('Apakah Anda yakin ingin menonaktifkan sekolah ini?')) return;
		await deleteSchool(school.schoolId);
		goto('/schools');
	}
</script>

<div class="space-y-8">
	<!-- Header Page -->
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div class="flex items-start gap-4">
			<div
				class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white font-bold text-xl shadow-md"
			>
				{school.schoolName.substring(0, 1).toUpperCase()}
			</div>
			<div>
				<h1 class="text-2xl font-bold tracking-tight text-heading">{school.schoolName}</h1>
				<p class="text-sm font-mono text-primary hover:underline">
					<a href="http://{school.subdomainSlug}.amertarva.com" target="_blank">
						{school.subdomainSlug}.amertarva.com ↗
					</a>
				</p>
			</div>
		</div>
		<div class="flex flex-wrap gap-2.5">
			<StatusBadge status={school.status} />
			<StatusBadge status={school.initStatus} />
		</div>
	</div>

	<div class="grid gap-6 md:grid-cols-3">
		<!-- Metadata & Storage -->
		<div class="md:col-span-1 space-y-6">
			<Card class="p-6 space-y-5">
				<h3 class="font-bold text-heading text-base pb-2 border-b border-primary/10">Info Umum</h3>

				<div class="space-y-4 text-sm">
					<div>
						<span class="text-xs font-semibold uppercase tracking-wider text-paragraph/60"
							>ID Sekolah</span
						>
						<p class="font-mono text-heading font-medium mt-1">{school.schoolId}</p>
					</div>
					<div>
						<span class="text-xs font-semibold uppercase tracking-wider text-paragraph/60"
							>Plan Langganan</span
						>
						<p class="mt-1">
							<span
								class="inline-flex items-center rounded-lg bg-heading/5 px-2.5 py-1 text-xs font-semibold text-heading/85 border border-heading/10"
							>
								{school.planType}
							</span>
						</p>
					</div>
					<div>
						<span class="text-xs font-semibold uppercase tracking-wider text-paragraph/60"
							>Tanggal Terdaftar</span
						>
						<p class="text-heading font-medium mt-1">
							{new Date(school.createdAt).toLocaleDateString('id-ID', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</p>
					</div>
				</div>
			</Card>

			<Card class="p-6 space-y-5">
				<h3 class="font-bold text-heading text-base pb-2 border-b border-primary/10">Penyimpanan</h3>

				<div>
					<div class="flex items-center justify-between text-sm">
						<span class="text-paragraph">Kuota Dialokasikan</span>
						<span class="font-bold text-heading">{school.maxStorageGb} GB</span>
					</div>
					<div class="w-full bg-primary/10 h-2.5 rounded-full mt-3 overflow-hidden">
						<div class="bg-primary h-full rounded-full" style="width: 100%"></div>
					</div>
				</div>

				<div class="space-y-3">
					<span class="text-xs font-semibold uppercase tracking-wider text-paragraph/60 block"
						>Database Terpilih</span
					>
					<div class="flex flex-wrap gap-1.5">
						{#if school.storageAllocation.length > 0}
							{#each school.storageAllocation as db}
								<span
									class="inline-flex items-center rounded-lg border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
								>
									{db}
								</span>
							{/each}
						{:else}
							<span class="text-paragraph italic text-xs">Belum dialokasikan</span>
						{/if}
					</div>
				</div>
			</Card>
		</div>

		<!-- Connection status / Credentials configuration -->
		<div class="md:col-span-2 space-y-6">
			<Card class="p-6 space-y-5">
				<h3 class="font-bold text-heading text-base pb-2 border-b border-primary/10"
					>Status Integrasi Database</h3
				>

				<div class="grid gap-3 sm:grid-cols-2">
					{#each displayCredentials as cred}
						<div
							class="flex items-center justify-between rounded-xl border border-primary/10 p-3.5 bg-[#F8FAF8]/50"
						>
							<div class="overflow-hidden pr-2">
								<h4 class="truncate text-xs font-bold text-heading">
									{cred.name}
								</h4>
								<p class="text-[10px] text-paragraph mt-0.5">Integrasi tenant database</p>
							</div>
							<StatusBadge status={cred.isConfigured ? 'DONE' : 'NOT_STARTED'} />
						</div>
					{:else}
						<div class="sm:col-span-2 text-center py-6 text-sm text-paragraph italic">
							Belum ada database yang dialokasikan
						</div>
					{/each}
				</div>
			</Card>

			<!-- Error Logs if failed initialization -->
			{#if school.initStatus === 'FAILED' && school.initError}
				<Card class="p-6 border-l-4 border-l-red-500 space-y-3 bg-red-50/20">
					<div class="flex items-center gap-2 text-red-600">
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						<h3 class="font-bold text-sm">Kesalahan Inisialisasi</h3>
					</div>
					<pre
						class="overflow-x-auto rounded-xl bg-red-50/80 p-4 font-mono text-xs text-red-700 border border-red-100"
					>{school.initError}</pre>
				</Card>
			{/if}

			<!-- Actions -->
			<div class="flex flex-wrap gap-3">
				<Button variant="secondary" on:click={() => goto(`/schools/${school?.schoolId}/edit`)}>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
						/>
					</svg>
					Ubah Konfigurasi
				</Button>
				<Button variant="danger" on:click={handleSuspend}>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
						/>
					</svg>
					Nonaktifkan Tenant
				</Button>
			</div>
		</div>
	</div>
</div>
