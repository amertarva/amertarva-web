<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '$lib/application/stores/auth.store';
	import {
		loadCurrentAdmin,
		updateAdminProfile,
		updateAdminPassword
	} from '$lib/application/use-cases/auth.usecase';
	import Card from '$lib/presentation/shared/Card.svelte';
	import Input from '$lib/presentation/shared/Input.svelte';
	import Button from '$lib/presentation/shared/Button.svelte';
	import {
		User,
		KeyRound,
		ShieldCheck,
		Crown,
		Lightbulb,
		CheckCircle2,
		AlertTriangle,
		Lock,
		Mail
	} from '@lucide/svelte';

	let name = '';
	let email = '';

	// State profile form
	let profileLoading = false;
	let profileSuccess = '';
	let profileError = '';

	// State password form
	let currentPassword = '';
	let newPassword = '';
	let confirmPassword = '';
	let passwordLoading = false;
	let passwordSuccess = '';
	let passwordError = '';

	onMount(async () => {
		if ($authStore.admin) {
			name = $authStore.admin.name || '';
			email = $authStore.admin.email || '';
		}
		const me = await loadCurrentAdmin();
		if (me) {
			name = me.name || '';
			email = me.email || '';
		}
	});

	async function handleSaveProfile() {
		profileError = '';
		profileSuccess = '';
		if (!name.trim()) {
			profileError = 'Nama administrator tidak boleh kosong';
			return;
		}
		if (!email.trim() || !email.includes('@')) {
			profileError = 'Format email tidak valid';
			return;
		}

		profileLoading = true;
		try {
			await updateAdminProfile(name, email);
			profileSuccess = 'Profil administrator berhasil diperbarui!';
			setTimeout(() => (profileSuccess = ''), 4000);
		} catch (e: any) {
			profileError = e.message || 'Gagal memperbarui profil';
		} finally {
			profileLoading = false;
		}
	}

	async function handleSavePassword() {
		passwordError = '';
		passwordSuccess = '';

		if (!currentPassword) {
			passwordError = 'Masukkan kata sandi saat ini';
			return;
		}
		if (!newPassword || newPassword.length < 8) {
			passwordError = 'Kata sandi baru minimal 8 karakter';
			return;
		}
		if (newPassword !== confirmPassword) {
			passwordError = 'Konfirmasi kata sandi baru tidak cocok';
			return;
		}

		passwordLoading = true;
		try {
			await updateAdminPassword(currentPassword, newPassword);
			passwordSuccess = 'Kata sandi berhasil diubah! Gunakan kata sandi baru untuk login berikutnya.';
			currentPassword = '';
			newPassword = '';
			confirmPassword = '';
			setTimeout(() => (passwordSuccess = ''), 5000);
		} catch (e: any) {
			passwordError = e.message || 'Gagal memperbarui kata sandi';
		} finally {
			passwordLoading = false;
		}
	}
</script>

<div class="space-y-8">
	<!-- Page Header -->
	<div class="border-b border-primary/20 pb-5">
		<h1 class="text-2xl font-bold tracking-tight text-heading">Pengaturan Akun (Lord Admin)</h1>
		<p class="text-sm text-paragraph mt-1">
			Kelola identitas akun master administrator, email login, serta kata sandi platform.
		</p>
	</div>

	<div class="grid gap-6 lg:grid-cols-3">
		<!-- Left / Main Column: Profile & Password Forms -->
		<div class="lg:col-span-2 space-y-6">
			<!-- 1. Form Profil Akun -->
			<Card class="p-6 space-y-5">
				<div class="border-b border-primary/15 pb-3 flex items-center justify-between">
					<div>
						<div class="flex items-center gap-2">
							<User class="h-4 w-4 text-primary" />
							<h3 class="font-bold text-heading text-base">Identitas & Informasi Akun</h3>
						</div>
						<p class="text-xs text-paragraph mt-0.5">
							Nama dan email yang digunakan untuk mengakses dashboard manajemen platform.
						</p>
					</div>
				</div>

				<form on:submit|preventDefault={handleSaveProfile} class="space-y-4">
					<div class="grid gap-4 sm:grid-cols-2">
						<Input
							label="Nama Lengkap Administrator"
							placeholder="Admin Amertarva"
							bind:value={name}
						/>
						<Input
							label="Email Login"
							type="email"
							placeholder="admin@amertarva.com"
							bind:value={email}
						/>
					</div>

					{#if profileError}
						<div class="flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-xs font-medium text-rose-700 border border-rose-200">
							<AlertTriangle class="h-4 w-4 shrink-0 text-rose-600" />
							<span>{profileError}</span>
						</div>
					{/if}

					{#if profileSuccess}
						<div class="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs font-medium text-emerald-800 border border-emerald-200">
							<CheckCircle2 class="h-4 w-4 shrink-0 text-emerald-600" />
							<span>{profileSuccess}</span>
						</div>
					{/if}

					<div class="flex justify-end pt-2">
						<Button variant="primary" type="submit" disabled={profileLoading} class="px-5 py-2">
							{#if profileLoading}
								Menyimpan...
							{:else}
								Simpan Profil
							{/if}
						</Button>
					</div>
				</form>
			</Card>

			<!-- 2. Form Ganti Kata Sandi -->
			<Card class="p-6 space-y-5">
				<div class="border-b border-primary/15 pb-3">
					<div class="flex items-center gap-2">
						<KeyRound class="h-4 w-4 text-primary" />
						<h3 class="font-bold text-heading text-base">Perbarui Kata Sandi</h3>
					</div>
					<p class="text-xs text-paragraph mt-0.5">
						Gunakan kombinasi minimal 8 karakter untuk menjaga keamanan akses root platform.
					</p>
				</div>

				<form on:submit|preventDefault={handleSavePassword} class="space-y-4">
					<Input
						label="Kata Sandi Saat Ini"
						type="password"
						placeholder="••••••••"
						bind:value={currentPassword}
					/>

					<div class="grid gap-4 sm:grid-cols-2">
						<Input
							label="Kata Sandi Baru"
							type="password"
							placeholder="Minimal 8 karakter"
							bind:value={newPassword}
						/>
						<Input
							label="Konfirmasi Kata Sandi Baru"
							type="password"
							placeholder="Ulangi kata sandi baru"
							bind:value={confirmPassword}
						/>
					</div>

					{#if passwordError}
						<div class="flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-xs font-medium text-rose-700 border border-rose-200">
							<AlertTriangle class="h-4 w-4 shrink-0 text-rose-600" />
							<span>{passwordError}</span>
						</div>
					{/if}

					{#if passwordSuccess}
						<div class="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs font-medium text-emerald-800 border border-emerald-200">
							<CheckCircle2 class="h-4 w-4 shrink-0 text-emerald-600" />
							<span>{passwordSuccess}</span>
						</div>
					{/if}

					<div class="flex justify-end pt-2">
						<Button variant="secondary" type="submit" disabled={passwordLoading} class="px-5 py-2">
							{#if passwordLoading}
								Memproses...
							{:else}
								Perbarui Kata Sandi
							{/if}
						</Button>
					</div>
				</form>
			</Card>
		</div>

		<!-- Right Column: Info Keamanan & Hak Akses -->
		<div class="lg:col-span-1 space-y-6">
			<Card class="p-5 space-y-4">
				<div class="flex items-center gap-2 pb-2 border-b border-primary/15">
					<ShieldCheck class="h-4 w-4 text-primary" />
					<h3 class="font-bold text-heading text-sm">Hak Akses & Otoritas</h3>
				</div>
				<div class="space-y-3 text-xs text-paragraph">
					<div>
						<span class="font-bold uppercase tracking-wider text-paragraph/70 text-[11px]">Level Peran</span>
						<p class="mt-1">
							<span class="inline-flex items-center gap-1.5 rounded bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-900 border border-amber-300">
								<Crown class="h-3.5 w-3.5 text-amber-700" />
								<span>Lord Platform Admin</span>
							</span>
						</p>
					</div>
					<div>
						<span class="font-bold uppercase tracking-wider text-paragraph/70 text-[11px]">Cakupan Wewenang</span>
						<ul class="mt-1.5 space-y-1.5 text-paragraph">
							<li class="flex items-center gap-1.5">
								<span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
								<span>Registrasi & provisioning tenant</span>
							</li>
							<li class="flex items-center gap-1.5">
								<span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
								<span>Kill-Switch & suspensi instan</span>
							</li>
							<li class="flex items-center gap-1.5">
								<span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
								<span>Manajemen custom domain & DNS</span>
							</li>
							<li class="flex items-center gap-1.5">
								<span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
								<span>Perpanjangan siklus sewa tahunan</span>
							</li>
						</ul>
					</div>
					<div class="pt-2 border-t border-primary/10">
						<span class="font-bold uppercase tracking-wider text-paragraph/70 text-[11px]">ID Administrator</span>
						<p class="font-mono text-heading text-[11px] mt-0.5 truncate">
							{$authStore.admin?.id || 'LORD_MASTER_ROOT'}
						</p>
					</div>
				</div>
			</Card>

			<Card class="p-5 space-y-3 bg-[#EAF2EE]/50 border-primary/25">
				<div class="flex items-center gap-2">
					<Lightbulb class="h-4 w-4 text-amber-600" />
					<h4 class="font-bold text-heading text-sm">Rekomendasi Keamanan</h4>
				</div>
				<p class="text-xs text-paragraph leading-relaxed">
					Selalu gunakan alamat email resmi terkelola dan jangan membagikan kata sandi root kepada pihak yang tidak berkepentingan.
				</p>
			</Card>
		</div>
	</div>
</div>
