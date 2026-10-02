<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { authStore } from '$lib/application/stores/auth.store';
	import {
		logout,
		recordUserActivity,
		checkSessionInactivity
	} from '$lib/application/use-cases/auth.usecase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import {
		LayoutDashboard,
		Building2,
		PlusCircle,
		Settings,
		LogOut,
		ChevronLeft,
		ChevronRight
	} from '@lucide/svelte';

	let { children } = $props();
	let sidebarCollapsed = $state(false);
	let checkInterval: ReturnType<typeof setInterval>;

	// Guard auth — redirect ke /login kalau tidak punya token
	$effect(() => {
		if ($authStore.accessToken === null && $page.url.pathname !== '/login') {
			goto('/login');
		}
	});

	function handleActivity() {
		if ($authStore.accessToken) {
			recordUserActivity();
		}
	}

	function verifySession() {
		if ($authStore.accessToken && $page.url.pathname !== '/login') {
			const isExpired = checkSessionInactivity();
			if (isExpired) {
				goto('/login?reason=session_expired');
			}
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			// Periksa sesi saat halaman dimuat
			verifySession();

			const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
			events.forEach((evt) => window.addEventListener(evt, handleActivity, { passive: true }));
			document.addEventListener('visibilitychange', verifySession);

			// Interval pengecekan berkala setiap 15 detik
			checkInterval = setInterval(verifySession, 15_000);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
			events.forEach((evt) => window.removeEventListener(evt, handleActivity));
			document.removeEventListener('visibilitychange', verifySession);
			if (checkInterval) clearInterval(checkInterval);
		}
	});

	function handleLogout() {
		logout();
		goto('/login');
	}
</script>

<svelte:head>
	<title>Amertarva Master Admin</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if $page.url.pathname === '/login'}
	{@render children()}
{:else}
	<div class="flex min-h-screen bg-amerta-bg text-paragraph">
		<!-- Sidebar -->
		<aside
			class="fixed inset-y-0 left-0 z-20 flex flex-col border-r border-primary/20 bg-white transition-all duration-200 {sidebarCollapsed
				? 'w-20'
				: 'w-64'}"
		>
			<!-- Logo Section -->
			<div
				class="flex h-16 items-center border-b border-primary/15 transition-all duration-200 {sidebarCollapsed
					? 'justify-center px-4'
					: 'gap-3 px-6'}"
			>
				<div
					class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold text-base shadow-xs"
				>
					A
				</div>
				{#if !sidebarCollapsed}
					<div class="overflow-hidden">
						<h1 class="font-bold tracking-tight text-heading text-base leading-tight truncate">
							Amertarva
						</h1>
						<span
							class="text-[10px] font-bold uppercase tracking-wider text-primary truncate block"
							>Lord Platform</span
						>
					</div>
				{/if}
			</div>

			<!-- Navigation -->
			<nav class="flex-1 space-y-1 px-3 py-5 transition-all duration-200">
				<a
					href="/"
					title={sidebarCollapsed ? 'Dashboard Overview' : ''}
					class="flex items-center rounded-lg py-2.5 text-sm font-medium transition-all duration-150 {$page
						.url.pathname === '/'
						? 'bg-primary text-white shadow-xs font-semibold'
						: 'text-paragraph hover:bg-primary/10 hover:text-heading'} {sidebarCollapsed
						? 'justify-center px-0'
						: 'gap-3 px-3.5'}"
				>
					<LayoutDashboard class="h-5 w-5 shrink-0" />
					{#if !sidebarCollapsed}
						<span class="truncate">Dashboard Overview</span>
					{/if}
				</a>

				<a
					href="/schools"
					title={sidebarCollapsed ? 'Kelola Sekolah' : ''}
					class="flex items-center rounded-lg py-2.5 text-sm font-medium transition-all duration-150 {$page
						.url.pathname.startsWith('/schools') && $page.url.pathname !== '/schools/new'
						? 'bg-primary text-white shadow-xs font-semibold'
						: 'text-paragraph hover:bg-primary/10 hover:text-heading'} {sidebarCollapsed
						? 'justify-center px-0'
						: 'gap-3 px-3.5'}"
				>
					<Building2 class="h-5 w-5 shrink-0" />
					{#if !sidebarCollapsed}
						<span class="truncate">Kelola Sekolah</span>
					{/if}
				</a>

				<a
					href="/schools/new"
					title={sidebarCollapsed ? 'Tambah Sekolah' : ''}
					class="flex items-center rounded-lg py-2.5 text-sm font-medium transition-all duration-150 {$page
						.url.pathname === '/schools/new'
						? 'bg-primary text-white shadow-xs font-semibold'
						: 'text-paragraph hover:bg-primary/10 hover:text-heading'} {sidebarCollapsed
						? 'justify-center px-0'
						: 'gap-3 px-3.5'}"
				>
					<PlusCircle class="h-5 w-5 shrink-0" />
					{#if !sidebarCollapsed}
						<span class="truncate">Tambah Sekolah</span>
					{/if}
				</a>

				<a
					href="/settings"
					title={sidebarCollapsed ? 'Pengaturan Akun' : ''}
					class="flex items-center rounded-lg py-2.5 text-sm font-medium transition-all duration-150 {$page
						.url.pathname === '/settings'
						? 'bg-primary text-white shadow-xs font-semibold'
						: 'text-paragraph hover:bg-primary/10 hover:text-heading'} {sidebarCollapsed
						? 'justify-center px-0'
						: 'gap-3 px-3.5'}"
				>
					<Settings class="h-5 w-5 shrink-0" />
					{#if !sidebarCollapsed}
						<span class="truncate">Pengaturan Akun</span>
					{/if}
				</a>
			</nav>

			<!-- User Profile & Logout -->
			<div class="mt-auto border-t border-primary/15 p-3 transition-all duration-200 bg-[#FAFDFB]">
				<a
					href="/settings"
					title={sidebarCollapsed ? 'Pengaturan Profil Admin' : ''}
					class="mb-2.5 flex items-center rounded-lg p-1.5 transition-all duration-150 hover:bg-primary/10 {sidebarCollapsed
						? 'justify-center px-0'
						: 'gap-2.5'}"
				>
					<div
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary/30 text-heading font-bold text-xs border border-secondary/40"
						title={sidebarCollapsed ? $authStore.admin?.name || 'Administrator' : ''}
					>
						{$authStore.admin?.name?.substring(0, 2).toUpperCase() || 'AD'}
					</div>
					{#if !sidebarCollapsed}
						<div class="overflow-hidden text-left flex-1">
							<h4 class="truncate text-xs font-bold text-heading leading-tight hover:text-primary">
								{$authStore.admin?.name || 'Administrator'}
							</h4>
							<p class="truncate text-[10px] text-paragraph leading-tight">
								{$authStore.admin?.email || 'admin@amertarva.com'}
							</p>
						</div>
					{/if}
				</a>

				<button
					onclick={handleLogout}
					title={sidebarCollapsed ? 'Keluar Akun' : ''}
					class="flex items-center justify-center gap-2 rounded-lg bg-rose-50 border border-rose-200/80 py-2 text-xs font-semibold text-rose-700 transition-all duration-150 hover:bg-rose-100 active:scale-[0.98] cursor-pointer {sidebarCollapsed
						? 'w-10 mx-auto px-0'
						: 'w-full px-3'}"
				>
					<LogOut class="h-4 w-4 shrink-0" />
					{#if !sidebarCollapsed}
						<span>Keluar Akun</span>
					{/if}
				</button>
			</div>
		</aside>

		<!-- Main Workspace Area -->
		<div
			class="flex flex-1 flex-col transition-all duration-200 {sidebarCollapsed
				? 'pl-20'
				: 'pl-64'}"
		>
			<!-- Header / Top Bar -->
			<header
				class="flex h-16 items-center justify-between border-b border-primary/20 bg-white px-6 md:px-10"
			>

				<div class="flex items-center gap-4">
					<button
						onclick={() => (sidebarCollapsed = !sidebarCollapsed)}
						class="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-white text-heading hover:bg-primary/10 transition-all duration-150 focus:outline-none cursor-pointer"
						aria-label="Toggle Sidebar"
					>
						{#if sidebarCollapsed}
							<ChevronRight class="h-4 w-4" />
						{:else}
							<ChevronLeft class="h-4 w-4" />
						{/if}
					</button>

					<div class="text-xs font-semibold text-paragraph flex items-center gap-1.5">
						<span class="text-heading">Amertarva</span>
						<span>/</span>
						<span class="text-primary font-bold">
							{$page.url.pathname === '/'
								? 'Overview'
								: $page.url.pathname === '/settings'
									? 'Pengaturan Akun'
									: $page.url.pathname.startsWith('/schools/new')
										? 'Pendaftaran Sekolah'
										: $page.url.pathname.startsWith('/schools')
											? 'Kelola Tenant'
											: 'Admin'}
						</span>
					</div>
				</div>

				<div class="flex items-center gap-4">
					<div
						class="flex items-center gap-1.5 rounded-md border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800"
					>
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
						Registry Server Online
					</div>
				</div>
			</header>

			<!-- Content Panel -->
			<main class="flex-1 p-6 md:px-10 md:py-8 w-full">
				{@render children()}
			</main>
		</div>
	</div>
{/if}
