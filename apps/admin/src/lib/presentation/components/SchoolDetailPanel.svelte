<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		deleteSchool,
		changeSchoolStatus,
		configureCustomDomain,
		checkCustomDomainDNS,
		deleteCustomDomain,
		addSchoolRentMonths,
		updateSchool,
		initializeSchool,
		getSchoolApiKey
	} from '../../application/use-cases/schools.usecase';
	import type { SchoolDetail } from '../../domain/school';
	import Card from '../shared/Card.svelte';
	import Button from '../shared/Button.svelte';
	import StatusBadge from './StatusBadge.svelte';
	import {
		Globe,
		ExternalLink,
		AlertTriangle,
		CheckCircle2,
		Check,
		Copy,
		RefreshCw,
		Power,
		CalendarPlus,
		ShieldAlert,
		Trash2,
		Edit3,
		Plus,
		Database,
		Building2,
		Calendar,
		HardDrive,
		User,
		Mail,
		Zap,
		Key,
		CheckCheck,
		Eye,
		EyeOff
	} from '@lucide/svelte';

	let { school }: { school: SchoolDetail } = $props();

	// Modal States
	let showSuspendModal = $state(false);
	let showCustomDomainModal = $state(false);
	let showExtendRentModal = $state(false);
	let showSuperAdminModal = $state(false);
	let showInitializeModal = $state(false);

	// Form States
	let suspendReason = $state<'ADMIN_SUSPENDED' | 'SUBSCRIPTION_EXPIRED' | 'MAINTENANCE'>(
		'ADMIN_SUSPENDED'
	);
	let suspendNotice = $state('');
	let customDomainInput = $state('');
	let extendMonthsInput = $state(12);
	let superAdminEmailInput = $state('');
	let initStatusInput = $state<'NOT_STARTED' | 'IN_PROGRESS' | 'DONE' | 'FAILED'>('NOT_STARTED');

	// Auto Provisioning States
	let initEmailInput = $state('');
	let initPasswordInput = $state('');
	let useAutoPassword = $state(true);
	let showPasswordPlain = $state(false);
	let initSuccessResult = $state<{
		email: string;
		password?: string;
		message?: string;
	} | null>(null);
	let initErrorMessage = $state<string | null>(null);
	let copiedKey = $state<string | null>(null);

	// Server API Key state
	let serverApiKey = $state<string | null>(school.serverApiKey ?? null);
	let isFetchingApiKey = $state(false);
	let showApiKeyPlain = $state(false);

	async function fetchServerApiKey() {
		isFetchingApiKey = true;
		try {
			const res = await getSchoolApiKey(school.schoolId);
			serverApiKey = res.serverApiKey;
		} catch {
			alert('Gagal memuat Server API Key.');
		} finally {
			isFetchingApiKey = false;
		}
	}

	$effect(() => {
		customDomainInput = school.customDomain || '';
		superAdminEmailInput = school.superAdminEmail || '';
		initEmailInput = school.superAdminEmail || '';
		initStatusInput = (school.initStatus as any) || 'NOT_STARTED';
	});

	let isProcessing = $state(false);
	let verifyResult = $state<{
		success: boolean;
		verified: boolean;
		message?: string;
		method?: string;
		diagnostics?: string[];
	} | null>(null);

	let displayCredentials = $derived(
		[
			{
				name: 'Supabase',
				isConfigured: school.credentials?.supaTeachers?.isConfigured || false
			},
			{
				name: 'AstraDB',
				isConfigured: school.credentials?.astradb?.isConfigured || false
			},
			{
				name: 'MongoDB',
				isConfigured: school.credentials?.mongodb?.isConfigured || false
			},
			{
				name: 'Turso',
				isConfigured: school.credentials?.turso?.isConfigured || false
			},
			{
				name: 'NAS',
				isConfigured: school.credentials?.nas?.isConfigured || false
			}
		].filter((c) => c.name === 'Supabase' || (school.storageAllocation || []).includes(c.name))
	);

	async function handleQuickToggleStatus() {
		if (school.status === 'ACTIVE') {
			showSuspendModal = true;
		} else {
			if (!confirm(`Aktifkan kembali akses web untuk ${school.schoolName}?`)) return;
			isProcessing = true;
			try {
				await changeSchoolStatus(school.schoolId, { status: 'ACTIVE' });
			} catch (e: any) {
				alert(`Gagal mengaktifkan tenant: ${e.message}`);
			} finally {
				isProcessing = false;
			}
		}
	}

	async function submitSuspend() {
		isProcessing = true;
		try {
			await changeSchoolStatus(school.schoolId, {
				status: 'SUSPENDED',
				suspensionReason: suspendReason,
				suspensionNotice: suspendNotice.trim() || undefined
			});
			showSuspendModal = false;
			suspendNotice = '';
		} catch (e: any) {
			alert(`Gagal menonaktifkan tenant: ${e.message}`);
		} finally {
			isProcessing = false;
		}
	}

	async function handleSaveCustomDomain() {
		if (!customDomainInput.trim()) {
			alert('Masukkan domain yang valid');
			return;
		}
		isProcessing = true;
		try {
			await configureCustomDomain(school.schoolId, customDomainInput.trim());
			showCustomDomainModal = false;
		} catch (e: any) {
			alert(`Gagal mendaftarkan domain: ${e.message}`);
		} finally {
			isProcessing = false;
		}
	}

	async function handleVerifyDNS() {
		isProcessing = true;
		verifyResult = null;
		try {
			const res = await checkCustomDomainDNS(school.schoolId);
			verifyResult = res;
		} catch (e: any) {
			verifyResult = {
				success: false,
				verified: false,
				message: e.message || 'Gagal menghubungi server verifikasi DNS'
			};
		} finally {
			isProcessing = false;
		}
	}

	async function handleRemoveDomain() {
		if (!confirm(`Hapus custom domain ${school.customDomain} dari sekolah ini?`)) return;
		isProcessing = true;
		try {
			await deleteCustomDomain(school.schoolId);
			verifyResult = null;
		} catch (e: any) {
			alert(`Gagal menghapus custom domain: ${e.message}`);
		} finally {
			isProcessing = false;
		}
	}

	async function submitExtendRent() {
		if (extendMonthsInput <= 0) return;
		isProcessing = true;
		try {
			await addSchoolRentMonths(school.schoolId, extendMonthsInput);
			showExtendRentModal = false;
		} catch (e: any) {
			alert(`Gagal memperpanjang masa sewa: ${e.message}`);
		} finally {
			isProcessing = false;
		}
	}

	async function submitSuperAdmin() {
		isProcessing = true;
		try {
			const updated = await updateSchool(school.schoolId, {
				superAdminEmail: superAdminEmailInput.trim() || null,
				initStatus: initStatusInput
			});
			if (updated) {
				school = updated;
			}
			showSuperAdminModal = false;
		} catch (e: any) {
			alert(`Gagal menyimpan data Super Admin: ${e.message}`);
		} finally {
			isProcessing = false;
		}
	}

	async function handleAutoInitialize() {
		if (!initEmailInput.trim()) {
			initErrorMessage = 'Email Super Admin wajib diisi.';
			return;
		}
		isProcessing = true;
		initErrorMessage = null;
		try {
			const res = await initializeSchool(school.schoolId, {
				superAdminEmail: initEmailInput.trim(),
				superAdminPassword: useAutoPassword ? undefined : initPasswordInput.trim() || undefined,
				generatePassword: useAutoPassword
			});
			if (res.success) {
				school = res.school;
				initSuccessResult = res.superAdmin;
			}
		} catch (e: any) {
			initErrorMessage = e.message || 'Gagal melakukan inisialisasi database sekolah';
		} finally {
			isProcessing = false;
		}
	}

	function copyText(text: string, key: string) {
		navigator.clipboard.writeText(text);
		copiedKey = key;
		setTimeout(() => {
			if (copiedKey === key) copiedKey = null;
		}, 2500);
	}

	async function handleDeletePermanent() {
		if (!confirm(`PERINGATAN: Hapus permanen seluruh konfigurasi ${school.schoolName}?`)) return;
		isProcessing = true;
		try {
			await deleteSchool(school.schoolId);
			goto('/schools');
		} catch (e: any) {
			alert(`Gagal menghapus sekolah: ${e.message}`);
			isProcessing = false;
		}
	}
</script>

<div class="space-y-6">
	<!-- Header Page -->
	<div
		class="flex flex-col gap-4 border-b border-primary/20 pb-5 md:flex-row md:items-center md:justify-between"
	>
		<div class="flex items-start gap-3.5">
			<div
				class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-lg font-bold text-white shadow-xs"
			>
				{school.schoolName.substring(0, 1).toUpperCase()}
			</div>
			<div>
				<h1 class="text-2xl leading-tight font-bold tracking-tight text-heading">
					{school.schoolName}
				</h1>
				<div class="mt-2 flex flex-wrap items-center gap-2">
					<a
						href="http://{school.subdomainSlug}.amertarva.com"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1 font-mono text-xs font-bold text-primary transition-all hover:bg-primary/20 hover:text-primary-hover"
						title="Buka Website Sekolah"
					>
						<ExternalLink class="h-3.5 w-3.5" />
						<span>{school.subdomainSlug}.amertarva.com</span>
					</a>
					{#if school.customDomain}
						<a
							href="http://{school.customDomain}"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-1.5 rounded-md border border-emerald-300 bg-emerald-50 px-2.5 py-1 font-mono text-xs font-bold text-emerald-800 transition-all hover:bg-emerald-100 hover:text-emerald-900"
							title="Buka Domain Kustom"
						>
							<Globe class="h-3.5 w-3.5 text-emerald-700" />
							<span>{school.customDomain}</span>
						</a>
					{/if}
				</div>
			</div>
		</div>

		<div class="flex flex-wrap items-center gap-2">
			<StatusBadge status={school.status} />
			{#if school.rent?.status}
				<StatusBadge status={school.rent.status} />
			{/if}
			<StatusBadge status={school.initStatus} />
		</div>
	</div>

	<!-- Banner jika status Suspended -->
	{#if school.status === 'SUSPENDED'}
		<div
			class="flex flex-col justify-between gap-4 rounded-xl border border-rose-300 bg-rose-50/90 p-5 shadow-xs sm:flex-row sm:items-center"
		>
			<div class="flex items-start gap-3">
				<div class="shrink-0 rounded-lg bg-rose-100 p-2 text-rose-700">
					<ShieldAlert class="h-5 w-5" />
				</div>
				<div>
					<h3 class="text-sm font-bold text-rose-900">
						Website Sekolah Sedang Dinonaktifkan (Suspended)
					</h3>
					<p class="mt-0.5 text-xs leading-relaxed text-rose-800">
						Akses siswa dan guru terkunci. Pengunjung dialihkan ke layar penangguhan layanan resmi
						Amertarva.
					</p>
					{#if school.suspensionReason}
						<p class="mt-1 font-mono text-xs text-rose-900">
							Alasan: <strong>{school.suspensionReason}</strong>
							{school.suspensionNotice ? `("${school.suspensionNotice}")` : ''}
						</p>
					{/if}
				</div>
			</div>
			<Button variant="primary" on:click={handleQuickToggleStatus} disabled={isProcessing}>
				Aktifkan Kembali
			</Button>
		</div>
	{/if}

	<div class="grid gap-6 md:grid-cols-3">
		<!-- Left Column: Info Umum & Masa Sewa -->
		<div class="space-y-6 md:col-span-1">
			<!-- Info Umum Card -->
			<Card class="space-y-4 p-5">
				<div class="flex items-center gap-2 border-b border-primary/15 pb-2">
					<Building2 class="h-4 w-4 text-primary" />
					<h3 class="text-sm font-bold text-heading">Identitas Tenant</h3>
				</div>

				<div class="space-y-3.5 text-xs">
					<div>
						<span class="text-[11px] font-bold tracking-wider text-paragraph/70 uppercase"
							>Domain / Subdomain</span
						>
						<p class="mt-0.5">
							<a
								href="http://{school.subdomainSlug}.amertarva.com"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1 font-mono font-bold text-primary hover:underline"
							>
								<span>{school.subdomainSlug}.amertarva.com</span>
								<ExternalLink class="h-3 w-3" />
							</a>
						</p>
					</div>
					{#if school.customDomain}
						<div>
							<span class="text-[11px] font-bold tracking-wider text-paragraph/70 uppercase"
								>Domain Kustom</span
							>
							<p
								class="mt-0.5 inline-flex items-center gap-1.5 font-mono font-bold text-emerald-800"
							>
								<Globe class="h-3.5 w-3.5 text-emerald-700" />
								<span>{school.customDomain}</span>
							</p>
						</div>
					{/if}
					<div>
						<span class="text-[11px] font-bold tracking-wider text-paragraph/70 uppercase"
							>ID Sekolah</span
						>
						<p class="mt-0.5 font-mono font-semibold text-heading">{school.schoolId}</p>
					</div>
					<div>
						<span class="text-[11px] font-bold tracking-wider text-paragraph/70 uppercase"
							>Paket Layanan</span
						>
						<p class="mt-1">
							<span
								class="inline-flex items-center rounded border border-heading/10 bg-heading/5 px-2 py-0.5 text-xs font-bold text-heading"
							>
								{school.planType}
							</span>
						</p>
					</div>
					<div>
						<span class="text-[11px] font-bold tracking-wider text-paragraph/70 uppercase"
							>Tanggal Registrasi</span
						>
						<p class="mt-0.5 font-medium text-heading">
							{new Date(school.createdAt).toLocaleDateString('id-ID', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</p>
					</div>
				</div>
			</Card>

			<!-- Server API Key (Kunci Koneksi Server-to-Server) -->
			<Card class="space-y-4 p-5">
				<div class="flex items-center gap-2 border-b border-primary/15 pb-2">
					<Key class="h-4 w-4 text-primary" />
					<h3 class="text-sm font-bold text-heading">Server API Key</h3>
					<span
						class="ml-auto rounded border border-amber-200 bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800"
						>Rahasia</span
					>
				</div>
				<p class="text-[11px] leading-relaxed text-paragraph">
					Kunci ini digunakan oleh <strong>Server Go Sekolah</strong> untuk autentikasi ke Master
					Admin. Salin nilai ini ke variabel
					<code class="rounded bg-heading/5 px-1 font-mono">AMERTARVA_API_TOKEN</code>
					di file <code class="rounded bg-heading/5 px-1 font-mono">.env</code> server sekolah.
				</p>
				{#if serverApiKey}
					<div class="space-y-2">
						<div
							class="relative flex items-center gap-2 rounded-lg border border-heading/10 bg-heading/5 px-3 py-2.5"
						>
							<code class="flex-1 font-mono text-[11px] break-all text-heading select-all">
								{showApiKeyPlain ? serverApiKey : '••••••••••••••••••••••••••••••••••••••••'}
							</code>
							<div class="flex shrink-0 items-center gap-1.5">
								<button
									type="button"
									aria-label={showApiKeyPlain ? 'Sembunyikan kunci' : 'Tampilkan kunci'}
									class="flex h-7 w-7 items-center justify-center rounded text-paragraph transition-colors hover:bg-heading/10"
									onclick={() => (showApiKeyPlain = !showApiKeyPlain)}
								>
									{#if showApiKeyPlain}
										<EyeOff class="h-3.5 w-3.5" />
									{:else}
										<Eye class="h-3.5 w-3.5" />
									{/if}
								</button>
								<button
									type="button"
									aria-label="Salin kunci"
									class="flex h-7 w-7 items-center justify-center rounded text-paragraph transition-colors hover:bg-heading/10"
									onclick={() => copyText(serverApiKey!, 'server-api-key')}
								>
									{#if copiedKey === 'server-api-key'}
										<CheckCheck class="h-3.5 w-3.5 text-emerald-600" />
									{:else}
										<Copy class="h-3.5 w-3.5" />
									{/if}
								</button>
							</div>
						</div>
						<p class="font-mono text-[10px] text-paragraph/70">
							Tempel ke: <span class="font-semibold text-heading"
								>AMERTARVA_API_TOKEN=<em>{serverApiKey.slice(0, 14)}...</em></span
							>
						</p>
					</div>
				{:else}
					<div class="py-3 text-center">
						<p class="mb-3 text-xs text-paragraph">
							Kunci belum dimuat. Klik tombol di bawah untuk mengambil kunci dari database.
						</p>
						<Button
							variant="secondary"
							class="flex w-full items-center justify-center gap-1.5 text-xs"
							on:click={fetchServerApiKey}
							disabled={isFetchingApiKey}
						>
							{#if isFetchingApiKey}
								<RefreshCw class="h-3.5 w-3.5 animate-spin" />
								<span>Memuat Kunci...</span>
							{:else}
								<Key class="h-3.5 w-3.5" />
								<span>Tampilkan Server API Key</span>
							{/if}
						</Button>
					</div>
				{/if}
			</Card>

			<!-- Masa Sewa & Status Langganan -->
			<Card class="space-y-4 p-5">
				<div class="flex items-center justify-between border-b border-primary/15 pb-2">
					<div class="flex items-center gap-2">
						<Calendar class="h-4 w-4 text-primary" />
						<h3 class="text-sm font-bold text-heading">Masa Sewa Tahunan</h3>
					</div>
					{#if school.rent?.status}
						<StatusBadge status={school.rent.status} />
					{/if}
				</div>

				<div class="space-y-3 text-xs">
					<div class="flex items-center justify-between">
						<span class="text-paragraph">Durasi Total:</span>
						<span class="font-bold text-heading">{school.rent?.durationMonths || 12} Bulan</span>
					</div>
					{#if school.rent?.endDate}
						<div class="flex items-center justify-between">
							<span class="text-paragraph">Tanggal Jatuh Tempo:</span>
							<span class="font-bold text-heading">
								{new Date(school.rent.endDate).toLocaleDateString('id-ID', {
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								})}
							</span>
						</div>
					{/if}

					<div class="pt-2">
						<Button
							variant="secondary"
							class="flex w-full items-center justify-center gap-1.5 text-xs"
							on:click={() => (showExtendRentModal = true)}
						>
							<CalendarPlus class="h-3.5 w-3.5" />
							<span>Perpanjang Masa Sewa</span>
						</Button>
					</div>
				</div>
			</Card>

			<!-- Kuota & Penyimpanan -->
			<Card class="space-y-4 p-5">
				<div class="flex items-center gap-2 border-b border-primary/15 pb-2">
					<HardDrive class="h-4 w-4 text-primary" />
					<h3 class="text-sm font-bold text-heading">Alokasi Storage</h3>
				</div>

				<div>
					<div class="flex items-center justify-between text-xs">
						<span class="text-paragraph">Kapasitas Maksimal</span>
						<span class="font-bold text-heading">{school.maxStorageGb} GB</span>
					</div>
					<div class="mt-2 h-2 w-full overflow-hidden rounded bg-primary/15">
						<div class="h-full rounded bg-primary" style="width: 100%"></div>
					</div>
				</div>

				<div class="space-y-2 pt-1">
					<span class="block text-[11px] font-bold tracking-wider text-paragraph/70 uppercase"
						>Database Terpasang</span
					>
					<div class="flex flex-wrap gap-1.5">
						{#if (school.storageAllocation || []).length > 0}
							{#each school.storageAllocation as db}
								<span
									class="inline-flex items-center rounded border border-primary/25 bg-primary/10 px-2 py-0.5 text-xs font-bold text-heading"
								>
									{db}
								</span>
							{/each}
						{:else}
							<span class="text-xs text-paragraph italic">Belum dialokasikan</span>
						{/if}
					</div>
				</div>
			</Card>
		</div>

		<!-- Right Column: Custom Domain, DB Integrations, Actions -->
		<div class="space-y-6 md:col-span-2">
			<!-- Quick Status & Kill Switch Panel -->
			<Card class="space-y-4 p-5">
				<div
					class="flex flex-col justify-between gap-4 border-b border-primary/15 pb-2 sm:flex-row sm:items-center"
				>
					<div>
						<div class="flex items-center gap-2">
							<Power class="h-4 w-4 text-primary" />
							<h3 class="text-sm font-bold text-heading">Status Akses Web (Kill-Switch)</h3>
						</div>
						<p class="mt-0.5 text-xs text-paragraph">
							Kontrol penangguhan web jika sekolah belum menyelesaikan sewa tahunan atau dalam
							pemeliharaan.
						</p>
					</div>
					<div>
						{#if school.status === 'ACTIVE'}
							<Button variant="danger" on:click={handleQuickToggleStatus} disabled={isProcessing}>
								Nonaktifkan Web (Off)
							</Button>
						{:else}
							<Button variant="primary" on:click={handleQuickToggleStatus} disabled={isProcessing}>
								Aktifkan Web (On)
							</Button>
						{/if}
					</div>
				</div>
			</Card>

			<!-- Custom Domain Panel -->
			<Card class="space-y-4 p-5">
				<div class="flex items-center justify-between border-b border-primary/15 pb-2">
					<div>
						<div class="flex items-center gap-2">
							<Globe class="h-4 w-4 text-primary" />
							<h3 class="text-sm font-bold text-heading">Domain Kustom (Custom Domain)</h3>
						</div>
						<p class="mt-0.5 text-xs text-paragraph">
							Mengarahkan domain resmi sekolah (contoh: <code>lms.sman1.sch.id</code>).
						</p>
					</div>
					{#if school.customDomain}
						<StatusBadge status={school.customDomainStatus || 'PENDING_DNS'} />
					{/if}
				</div>

				{#if school.customDomain}
					<div class="space-y-4">
						<div
							class="flex flex-col justify-between gap-3 rounded-lg border border-primary/20 bg-slate-50 p-3.5 sm:flex-row sm:items-center"
						>
							<div>
								<span class="text-[11px] font-bold tracking-wider text-paragraph/70 uppercase"
									>Domain Aktif</span
								>
								<p class="mt-0.5 font-mono text-sm font-bold text-heading">{school.customDomain}</p>
								{#if school.customDomainVerifiedAt}
									<p
										class="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-emerald-700"
									>
										<Check class="h-3.5 w-3.5" />
										<span
											>DNS terverifikasi ({new Date(
												school.customDomainVerifiedAt
											).toLocaleDateString('id-ID')})</span
										>
									</p>
								{/if}
							</div>
							<div class="flex items-center gap-2">
								<Button
									variant="outline"
									class="flex items-center gap-1.5 text-xs"
									on:click={handleVerifyDNS}
									disabled={isProcessing}
								>
									<RefreshCw class="h-3.5 w-3.5 {isProcessing ? 'animate-spin' : ''}" />
									<span>{isProcessing ? 'Memeriksa...' : 'Cek DNS Sekarang'}</span>
								</Button>
								<Button
									variant="danger"
									class="flex items-center gap-1.5 text-xs"
									on:click={handleRemoveDomain}
									disabled={isProcessing}
								>
									<Trash2 class="h-3.5 w-3.5" />
									<span>Hapus</span>
								</Button>
							</div>
						</div>

						<!-- Panduan DNS Record -->
						<div class="space-y-3 rounded-lg border border-primary/20 bg-white p-4">
							<h4 class="text-xs font-bold tracking-wider text-heading uppercase">
								Panduan DNS Record Sekolah:
							</h4>
							<div class="grid gap-3 text-xs sm:grid-cols-2">
								<div class="rounded-md border border-slate-200 bg-slate-50 p-3">
									<span class="block font-bold text-heading">1. Record CNAME (Wajib)</span>
									<div class="mt-1 space-y-0.5 font-mono text-[11px] text-slate-800">
										<p>Host/Name: <strong>{school.customDomain.split('.')[0]}</strong></p>
										<p>Target: <strong>cname.amertarva.com</strong></p>
									</div>
								</div>
								{#if school.customDomainToken}
									<div class="rounded-md border border-slate-200 bg-slate-50 p-3">
										<span class="block font-bold text-heading">2. Record TXT (Challenge)</span>
										<div class="mt-1 space-y-0.5 font-mono text-[11px] text-slate-800">
											<p>Host: <strong>_amertarva-challenge</strong></p>
											<p class="truncate" title={school.customDomainToken}>
												Nilai: <strong>{school.customDomainToken}</strong>
											</p>
										</div>
									</div>
								{/if}
							</div>
						</div>

						<!-- Diagnostics Result Alert -->
						{#if verifyResult}
							<div
								class={`flex items-start gap-2 rounded-lg border p-3 text-xs ${verifyResult.verified ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-amber-300 bg-amber-50 text-amber-900'}`}
							>
								{#if verifyResult.verified}
									<CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
								{:else}
									<AlertTriangle class="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
								{/if}
								<div>
									<p class="font-bold">
										{verifyResult.verified
											? 'Domain Berhasil Terverifikasi'
											: 'DNS Belum Terhubung'}
									</p>
									<p class="mt-0.5">
										{verifyResult.message ||
											(verifyResult.verified ? `Metode verifikasi: ${verifyResult.method}` : '')}
									</p>
								</div>
							</div>
						{/if}
					</div>
				{:else}
					<div
						class="space-y-2.5 rounded-lg border border-dashed border-primary/25 py-6 text-center"
					>
						<p class="text-xs text-paragraph">Sekolah ini belum menggunakan domain kustom.</p>
						<Button
							variant="secondary"
							on:click={() => (showCustomDomainModal = true)}
							class="inline-flex items-center gap-1.5"
						>
							<Plus class="h-3.5 w-3.5" />
							<span>Daftarkan Custom Domain</span>
						</Button>
					</div>
				{/if}
			</Card>

			<!-- Super Admin & Inisialisasi Tenant Panel -->
			<Card class="space-y-4 p-5">
				<div
					class="flex flex-col justify-between gap-3 border-b border-primary/15 pb-2 sm:flex-row sm:items-center"
				>
					<div>
						<div class="flex items-center gap-2">
							<User class="h-4 w-4 text-primary" />
							<h3 class="text-sm font-bold text-heading">
								Super Admin & Inisialisasi Database Tenant
							</h3>
						</div>
						<p class="mt-0.5 text-xs text-paragraph">
							Otomasi pembuatan akun Super Admin dan setup akses Supabase sekolah.
						</p>
					</div>
					<StatusBadge status={school.initStatus || 'NOT_STARTED'} />
				</div>

				{#if school.initError && school.initStatus === 'FAILED'}
					<div
						class="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800"
					>
						<AlertTriangle class="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
						<div>
							<p class="font-bold">Inisialisasi Gagal:</p>
							<p class="mt-0.5">{school.initError}</p>
						</div>
					</div>
				{/if}

				<div class="space-y-3">
					<div
						class="flex flex-col justify-between gap-3 rounded-lg border border-primary/20 bg-slate-50 p-3.5 sm:flex-row sm:items-center"
					>
						<div class="space-y-1">
							<span class="block text-[11px] font-bold tracking-wider text-paragraph/70 uppercase"
								>Email Super Admin Sekolah</span
							>
							{#if school.superAdminEmail}
								<div class="flex items-center gap-1.5 font-mono text-sm font-bold text-heading">
									<Mail class="h-3.5 w-3.5 text-primary" />
									<span>{school.superAdminEmail}</span>
								</div>
								{#if school.initStatus === 'DONE'}
									<p
										class="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700"
									>
										<Check class="h-3 w-3" />
										<span>Akun Super Admin aktif di Supabase Auth</span>
									</p>
								{/if}
							{:else}
								<p class="text-xs text-paragraph italic">Belum ditentukan</p>
							{/if}
						</div>
						<div class="flex flex-wrap items-center gap-2">
							<Button
								variant="primary"
								class="flex items-center gap-1.5 text-xs shadow-sm"
								on:click={() => {
									initErrorMessage = null;
									initSuccessResult = null;
									initEmailInput = school.superAdminEmail || '';
									showInitializeModal = true;
								}}
							>
								<Zap class="h-3.5 w-3.5" />
								<span
									>{school.initStatus === 'DONE'
										? 'Reset / Init Ulang'
										: 'Inisialisasi Otomatis (1-Klik)'}</span
								>
							</Button>
							<Button
								variant="secondary"
								class="flex items-center gap-1.5 text-xs"
								on:click={() => (showSuperAdminModal = true)}
							>
								<Edit3 class="h-3.5 w-3.5" />
								<span>Metadata</span>
							</Button>
						</div>
					</div>

					<div
						class="rounded-lg border border-primary/15 bg-primary/5 p-3 text-xs leading-relaxed text-paragraph"
					>
						<p class="mb-0.5 font-semibold text-heading">Keterangan Auto-Provisioning:</p>
						Fitur<strong>Inisialisasi Otomatis</strong> langsung mendaftarkan user ke Supabase Auth sekolah,
						mengonfirmasi email secara instan, dan memberikan kredensial login agar admin sekolah bisa
						langsung masuk.
					</div>
				</div>
			</Card>

			<!-- Database Integrations -->
			<Card class="space-y-4 p-5">
				<div class="flex items-center gap-2 border-b border-primary/15 pb-2">
					<Database class="h-4 w-4 text-primary" />
					<h3 class="text-sm font-bold text-heading">Status Database Tenant</h3>
				</div>

				<div class="grid gap-2.5 sm:grid-cols-2">
					{#each displayCredentials as cred}
						<div
							class="flex items-center justify-between rounded-lg border border-primary/15 bg-[#FAFDFB] p-3"
						>
							<div class="overflow-hidden pr-2">
								<h4 class="truncate text-xs font-bold text-heading">{cred.name}</h4>
								<p class="mt-0.5 text-[11px] text-paragraph">Koneksi data institusi</p>
							</div>
							<StatusBadge status={cred.isConfigured ? 'DONE' : 'NOT_STARTED'} />
						</div>
					{:else}
						<div class="sm:col-span-2 text-center py-4 text-xs text-paragraph italic">
							Belum ada database yang dialokasikan
						</div>
					{/each}
				</div>
			</Card>

			<!-- Actions -->
			<div class="flex flex-wrap gap-2.5 pt-2">
				<Button
					variant="outline"
					class="inline-flex items-center gap-1.5"
					on:click={() => goto(`/schools/${school?.schoolId}/edit`)}
				>
					<Edit3 class="h-3.5 w-3.5" />
					<span>Ubah Konfigurasi</span>
				</Button>
				<Button
					variant="danger"
					class="inline-flex items-center gap-1.5"
					on:click={handleDeletePermanent}
				>
					<Trash2 class="h-3.5 w-3.5" />
					<span>Hapus Sekolah</span>
				</Button>
			</div>
		</div>
	</div>
</div>

<!-- Modal Inisialisasi Otomatis Tenant -->
{#if showInitializeModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-heading/60 p-4">
		<div
			class="w-full max-w-lg space-y-4 rounded-xl border border-primary/20 bg-white p-6 shadow-xl"
		>
			{#if initSuccessResult}
				<!-- Result State -->
				<div class="space-y-4">
					<div class="flex items-center gap-2 text-emerald-700">
						<CheckCircle2 class="h-6 w-6 shrink-0" />
						<div>
							<h3 class="text-base font-bold text-heading">Inisialisasi Berhasil & Akun Aktif!</h3>
							<p class="mt-0.5 text-xs text-paragraph">
								Database sekolah telah terhubung dan Super Admin siap login.
							</p>
						</div>
					</div>

					<div
						class="space-y-3 rounded-lg bg-slate-900 p-4 font-mono text-xs text-white shadow-inner"
					>
						<div class="flex items-center justify-between border-b border-slate-800 pb-2">
							<span class="text-slate-400">Portal LMS:</span>
							<div class="flex items-center gap-2">
								<span class="font-bold text-emerald-400">{school.subdomainSlug}.amertarva.com</span>
								<a
									href="http://{school.subdomainSlug}.amertarva.com"
									target="_blank"
									rel="noopener noreferrer"
									class="text-slate-400 hover:text-white"
									title="Buka Website"
								>
									<ExternalLink class="h-3.5 w-3.5" />
								</a>
							</div>
						</div>

						<div class="flex items-center justify-between border-b border-slate-800 pb-2">
							<span class="text-slate-400">Email Login:</span>
							<div class="flex items-center gap-2">
								<span class="font-bold text-white">{initSuccessResult.email}</span>
								<button
									type="button"
									class="text-slate-400 transition-colors hover:text-white"
									onclick={() => copyText(initSuccessResult?.email || '', 'email')}
									title="Salin Email"
								>
									{#if copiedKey === 'email'}
										<CheckCheck class="h-3.5 w-3.5 text-emerald-400" />
									{:else}
										<Copy class="h-3.5 w-3.5" />
									{/if}
								</button>
							</div>
						</div>

						{#if initSuccessResult.password}
							<div class="flex items-center justify-between">
								<span class="text-slate-400">Password Sementara:</span>
								<div class="flex items-center gap-2">
									<span class="font-bold tracking-wider text-amber-300"
										>{initSuccessResult.password}</span
									>
									<button
										type="button"
										class="text-slate-400 transition-colors hover:text-white"
										onclick={() => copyText(initSuccessResult?.password || '', 'pwd')}
										title="Salin Password"
									>
										{#if copiedKey === 'pwd'}
											<CheckCheck class="h-3.5 w-3.5 text-emerald-400" />
										{:else}
											<Copy class="h-3.5 w-3.5" />
										{/if}
									</button>
								</div>
							</div>
						{/if}
					</div>

					<div
						class="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900"
					>
						<Key class="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
						<div>
							<strong>Penting:</strong> Salin dan kirimkan informasi login di atas kepada penanggung jawab
							sekolah. Password ini tidak disimpan dalam bentuk teks polos untuk keamanan.
						</div>
					</div>

					<div class="flex justify-end pt-2">
						<Button
							variant="primary"
							on:click={() => {
								showInitializeModal = false;
								initSuccessResult = null;
							}}
						>
							Selesai & Tutup
						</Button>
					</div>
				</div>
			{:else}
				<!-- Input Form State -->
				<div class="space-y-4">
					<div class="flex items-center gap-2">
						<Zap class="h-5 w-5 text-primary" />
						<h3 class="text-base font-bold text-heading">
							Inisialisasi Otomatis & Buat Akun Super Admin
						</h3>
					</div>

					<p class="text-xs leading-relaxed text-paragraph">
						Sistem akan menghubungkan Supabase Guru sekolah ({school.schoolName}), membuatkan akun
						Super Admin yang langsung terkonfirmasi, dan menyiapkan database.
					</p>

					{#if initErrorMessage}
						<div
							class="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800"
						>
							<AlertTriangle class="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
							<div>
								<p class="font-bold">Gagal Inisialisasi</p>
								<p class="mt-0.5">{initErrorMessage}</p>
							</div>
						</div>
					{/if}

					<div class="space-y-3.5 pt-1 text-xs">
						<div>
							<label for="init-email" class="mb-1 block font-bold text-heading">
								Email Super Admin Sekolah <span class="text-rose-500">*</span>
							</label>
							<input
								id="init-email"
								type="email"
								placeholder="admin@namasekolah.sch.id"
								bind:value={initEmailInput}
								class="w-full rounded-lg border border-primary/25 bg-white px-3 py-2 font-mono text-xs text-heading focus:border-primary focus:outline-none"
								required
							/>
						</div>

						<div class="space-y-2">
							<span class="block font-bold text-heading">Opsi Password Login</span>
							<div class="space-y-1.5">
								<label class="flex cursor-pointer items-center gap-2">
									<input
										type="radio"
										name="password-option"
										checked={useAutoPassword}
										onchange={() => (useAutoPassword = true)}
										class="text-primary focus:ring-primary"
									/>
									<span class="text-xs font-medium text-heading"
										>Generate Password Acak Aman (Direkomendasikan)</span
									>
								</label>
								<label class="flex cursor-pointer items-center gap-2">
									<input
										type="radio"
										name="password-option"
										checked={!useAutoPassword}
										onchange={() => (useAutoPassword = false)}
										class="text-primary focus:ring-primary"
									/>
									<span class="text-xs font-medium text-heading">Tentukan Password Manual</span>
								</label>
							</div>

							{#if !useAutoPassword}
								<div class="pt-1">
									<input
										type="password"
										placeholder="Minimal 6 karakter..."
										bind:value={initPasswordInput}
										class="w-full rounded-lg border border-primary/25 bg-white px-3 py-2 font-mono text-xs text-heading focus:border-primary focus:outline-none"
									/>
								</div>
							{/if}
						</div>
					</div>

					<div class="flex justify-end gap-2 border-t border-primary/15 pt-3">
						<Button
							variant="outline"
							on:click={() => (showInitializeModal = false)}
							disabled={isProcessing}
						>
							Batal
						</Button>
						<Button
							variant="primary"
							class="flex items-center gap-1.5"
							on:click={handleAutoInitialize}
							disabled={isProcessing || !initEmailInput.trim()}
						>
							{#if isProcessing}
								<RefreshCw class="h-3.5 w-3.5 animate-spin" />
								<span>Memproses Inisialisasi...</span>
							{:else}
								<Zap class="h-3.5 w-3.5" />
								<span>Jalankan Inisialisasi Otomatis</span>
							{/if}
						</Button>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<!-- Modal Super Admin Tenant -->
{#if showSuperAdminModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-heading/60 p-4">
		<div
			class="w-full max-w-md space-y-4 rounded-xl border border-primary/20 bg-white p-6 shadow-xl"
		>
			<div class="flex items-center gap-2">
				<User class="h-5 w-5 text-primary" />
				<h3 class="text-base font-bold text-heading">Kelola Super Admin Sekolah</h3>
			</div>

			<p class="text-xs text-paragraph">
				Tentukan email penanggung jawab utama sekolah yang berhak mengelola tenant ini secara
				mandiri.
			</p>

			<div class="space-y-3.5 pt-1 text-xs">
				<div>
					<label for="super-admin-email" class="mb-1 block font-bold text-heading">
						Email Super Admin Sekolah
					</label>
					<input
						id="super-admin-email"
						type="email"
						placeholder="admin@sman1jkt.sch.id"
						bind:value={superAdminEmailInput}
						class="w-full rounded-lg border border-primary/25 bg-white px-3 py-2 font-mono text-xs text-heading focus:border-primary focus:outline-none"
					/>
				</div>

				<div>
					<label for="init-status-select" class="mb-1 block font-bold text-heading">
						Status Inisialisasi Tenant
					</label>
					<select
						id="init-status-select"
						bind:value={initStatusInput}
						class="w-full rounded-lg border border-primary/25 bg-white px-3 py-2 text-xs text-heading focus:border-primary focus:outline-none"
					>
						<option value="NOT_STARTED">Belum Diinisialisasi (NOT_STARTED)</option>
						<option value="IN_PROGRESS">Sedang Diinisialisasi (IN_PROGRESS)</option>
						<option value="DONE">Selesai / Siap Digunakan (DONE)</option>
						<option value="FAILED">Inisialisasi Gagal (FAILED)</option>
					</select>
				</div>
			</div>

			<div class="flex justify-end gap-2 border-t border-primary/15 pt-3">
				<Button
					variant="outline"
					on:click={() => (showSuperAdminModal = false)}
					disabled={isProcessing}
				>
					Batal
				</Button>
				<Button variant="primary" on:click={submitSuperAdmin} disabled={isProcessing}>
					{isProcessing ? 'Menyimpan...' : 'Simpan Data'}
				</Button>
			</div>
		</div>
	</div>
{/if}

<!-- Modal Suspend Tenant -->
{#if showSuspendModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-heading/60 p-4">
		<div
			class="w-full max-w-md space-y-4 rounded-xl border border-primary/20 bg-white p-6 shadow-xl"
		>
			<div class="flex items-center gap-2">
				<ShieldAlert class="h-5 w-5 text-rose-600" />
				<h3 class="text-base font-bold text-heading">Nonaktifkan Web Sekolah</h3>
			</div>
			<p class="text-xs leading-relaxed text-paragraph">
				Akses web e-learning sekolah ini akan dialihkan ke layar penangguhan layanan (Suspended).
			</p>

			<div class="space-y-3.5 text-xs">
				<div>
					<label for="suspend-reason" class="mb-1 block font-bold text-heading"
						>Alasan Penonaktifan</label
					>
					<select
						id="suspend-reason"
						bind:value={suspendReason}
						class="w-full rounded-lg border border-primary/25 bg-white px-3 py-2 text-xs text-heading focus:border-primary focus:outline-none"
					>
						<option value="ADMIN_SUSPENDED">Penangguhan Administratif</option>
						<option value="SUBSCRIPTION_EXPIRED">Masa Sewa Tahunan Telah Berakhir</option>
						<option value="MAINTENANCE">Mode Pemeliharaan Teknis (Maintenance)</option>
					</select>
				</div>

				<div>
					<label for="suspend-notice" class="mb-1 block font-bold text-heading"
						>Catatan Tambahan (Opsional)</label
					>
					<textarea
						id="suspend-notice"
						bind:value={suspendNotice}
						rows="3"
						placeholder="Pesan khusus untuk sekolah..."
						class="w-full rounded-lg border border-primary/25 bg-white p-2.5 text-xs text-heading focus:border-primary focus:outline-none"
					></textarea>
				</div>
			</div>

			<div class="flex justify-end gap-2 pt-2">
				<Button
					variant="outline"
					on:click={() => (showSuspendModal = false)}
					disabled={isProcessing}
				>
					Batal
				</Button>
				<Button variant="danger" on:click={submitSuspend} disabled={isProcessing}>
					{isProcessing ? 'Memproses...' : 'Nonaktifkan Sekarang'}
				</Button>
			</div>
		</div>
	</div>
{/if}

<!-- Modal Custom Domain -->
{#if showCustomDomainModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-heading/60 p-4">
		<div
			class="w-full max-w-md space-y-4 rounded-xl border border-primary/20 bg-white p-6 shadow-xl"
		>
			<div class="flex items-center gap-2">
				<Globe class="h-5 w-5 text-primary" />
				<h3 class="text-base font-bold text-heading">Daftarkan Custom Domain</h3>
			</div>
			<p class="text-xs leading-relaxed text-paragraph">
				Masukkan domain resmi yang dimiliki sekolah (contoh: <code>lms.sman1.sch.id</code>).
			</p>

			<div>
				<label for="custom-domain-input" class="mb-1 block text-xs font-bold text-heading"
					>Nama Domain</label
				>
				<input
					id="custom-domain-input"
					type="text"
					bind:value={customDomainInput}
					placeholder="lms.sekolah.sch.id"
					class="w-full rounded-lg border border-primary/25 bg-white px-3 py-2 font-mono text-xs text-heading focus:border-primary focus:outline-none"
				/>
			</div>

			<div class="flex justify-end gap-2 pt-2">
				<Button
					variant="outline"
					on:click={() => (showCustomDomainModal = false)}
					disabled={isProcessing}
				>
					Batal
				</Button>
				<Button variant="primary" on:click={handleSaveCustomDomain} disabled={isProcessing}>
					{isProcessing ? 'Menyimpan...' : 'Simpan Domain'}
				</Button>
			</div>
		</div>
	</div>
{/if}

<!-- Modal Extend Rent -->
{#if showExtendRentModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-heading/60 p-4">
		<div
			class="w-full max-w-md space-y-4 rounded-xl border border-primary/20 bg-white p-6 shadow-xl"
		>
			<div class="flex items-center gap-2">
				<CalendarPlus class="h-5 w-5 text-secondary" />
				<h3 class="text-base font-bold text-heading">Perpanjang Masa Sewa</h3>
			</div>
			<p class="text-xs leading-relaxed text-paragraph">
				Tambahkan durasi masa sewa sekolah dalam hitungan bulan.
			</p>

			<div>
				<label for="extend-months-input" class="mb-1 block text-xs font-bold text-heading"
					>Tambah Durasi (Bulan)</label
				>
				<input
					id="extend-months-input"
					type="number"
					min="1"
					max="60"
					bind:value={extendMonthsInput}
					class="w-full rounded-lg border border-primary/25 bg-white px-3 py-2 text-xs text-heading focus:border-primary focus:outline-none"
				/>
			</div>

			<div class="flex justify-end gap-2 pt-2">
				<Button
					variant="outline"
					on:click={() => (showExtendRentModal = false)}
					disabled={isProcessing}
				>
					Batal
				</Button>
				<Button variant="primary" on:click={submitExtendRent} disabled={isProcessing}>
					{isProcessing ? 'Memproses...' : 'Perpanjang'}
				</Button>
			</div>
		</div>
	</div>
{/if}
