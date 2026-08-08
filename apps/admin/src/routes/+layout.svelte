<script lang="ts">
	import { authStore } from '$lib/application/stores/auth.store';
	import { logout } from '$lib/application/use-cases/auth.usecase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	let sidebarCollapsed = $state(false);

	// Guard auth — redirect ke /login kalau tidak punya token
	$effect(() => {
		if ($authStore.accessToken === null && $page.url.pathname !== '/login') {
			goto('/login');
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
			class="fixed inset-y-0 left-0 z-20 flex flex-col border-r border-primary/10 bg-white transition-all duration-300 {sidebarCollapsed
				? 'w-20'
				: 'w-64'}"
		>
			<!-- Logo Section -->
			<div
				class="flex h-16 items-center border-b border-primary/10 transition-all duration-300 {sidebarCollapsed
					? 'justify-center px-4'
					: 'gap-3 px-6'}"
			>
				<div
					class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white font-bold text-lg shadow-md shadow-primary/20"
				>
					A
				</div>
				{#if !sidebarCollapsed}
					<div class="overflow-hidden">
						<h1 class="font-bold tracking-tight text-heading text-base leading-none truncate">
							Amertarva
						</h1>
						<span
							class="text-[10px] font-semibold uppercase tracking-wider text-primary truncate block mt-0.5"
							>Master Admin</span
						>
					</div>
				{/if}
			</div>

			<!-- Navigation -->
			<nav class="flex-1 space-y-1.5 px-4 py-6 transition-all duration-300">
				<a
					href="/"
					title={sidebarCollapsed ? 'Dashboard Overview' : ''}
					class="flex items-center rounded-xl py-3 text-sm font-medium transition-all duration-200 {$page
						.url.pathname === '/'
						? 'bg-primary text-white shadow-sm shadow-primary/15'
						: 'text-paragraph hover:bg-primary/5 hover:text-primary'} {sidebarCollapsed
						? 'justify-center px-0'
						: 'gap-3.5 px-4'}"
				>
					<svg
						class="h-5 w-5 shrink-0"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"
						/>
					</svg>
					{#if !sidebarCollapsed}
						<span class="truncate">Dashboard Overview</span>
					{/if}
				</a>

				<a
					href="/schools"
					title={sidebarCollapsed ? 'Kelola Sekolah' : ''}
					class="flex items-center rounded-xl py-3 text-sm font-medium transition-all duration-200 {$page
						.url.pathname.startsWith('/schools') && $page.url.pathname !== '/schools/new'
						? 'bg-primary text-white shadow-sm shadow-primary/15'
						: 'text-paragraph hover:bg-primary/5 hover:text-primary'} {sidebarCollapsed
						? 'justify-center px-0'
						: 'gap-3.5 px-4'}"
				>
					<svg
						class="h-5 w-5 shrink-0"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
						/>
					</svg>
					{#if !sidebarCollapsed}
						<span class="truncate">Kelola Sekolah</span>
					{/if}
				</a>

				<a
					href="/schools/new"
					title={sidebarCollapsed ? 'Tambah Sekolah' : ''}
					class="flex items-center rounded-xl py-3 text-sm font-medium transition-all duration-200 {$page
						.url.pathname === '/schools/new'
						? 'bg-primary text-white shadow-sm shadow-primary/15'
						: 'text-paragraph hover:bg-primary/5 hover:text-primary'} {sidebarCollapsed
						? 'justify-center px-0'
						: 'gap-3.5 px-4'}"
				>
					<svg
						class="h-5 w-5 shrink-0"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					{#if !sidebarCollapsed}
						<span class="truncate">Tambah Sekolah</span>
					{/if}
				</a>
			</nav>

			<!-- User Profile & Logout -->
			<div class="mt-auto border-t border-primary/10 p-4 transition-all duration-300">
				<div
					class="mb-3 flex items-center transition-all duration-300 {sidebarCollapsed
						? 'justify-center px-0'
						: 'gap-3 px-2'}"
				>
					<div
						class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-heading font-semibold text-sm"
						title={sidebarCollapsed ? $authStore.admin?.name || 'Administrator' : ''}
					>
						{$authStore.admin?.name?.substring(0, 2).toUpperCase() || 'AD'}
					</div>
					{#if !sidebarCollapsed}
						<div class="overflow-hidden">
							<h4 class="truncate text-xs font-semibold text-heading leading-tight">
								{$authStore.admin?.name || 'Administrator'}
							</h4>
							<p class="truncate text-[10px] text-paragraph leading-tight">
								{$authStore.admin?.email || 'admin@amertarva.com'}
							</p>
						</div>
					{/if}
				</div>

				<button
					onclick={handleLogout}
					title={sidebarCollapsed ? 'Keluar Akun' : ''}
					class="flex items-center justify-center gap-2 rounded-xl bg-red-50 py-2.5 text-xs font-semibold text-red-600 transition-all duration-200 hover:bg-red-100/80 active:scale-[0.98] {sidebarCollapsed
						? 'w-12 mx-auto px-0'
						: 'w-full px-4'}"
				>
					<svg
						class="h-4 w-4 shrink-0"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
						/>
					</svg>
					{#if !sidebarCollapsed}
						<span>Keluar Akun</span>
					{/if}
				</button>
			</div>
		</aside>

		<!-- Main Workspace Area -->
		<div
			class="flex flex-1 flex-col transition-all duration-300 {sidebarCollapsed
				? 'pl-20'
				: 'pl-64'}"
		>
			<!-- Header / Top Bar -->
			<header
				class="flex h-16 items-center justify-between border-b border-primary/10 bg-white px-8"
			>
				<div class="flex items-center gap-4">
					<button
						onclick={() => (sidebarCollapsed = !sidebarCollapsed)}
						class="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/10 bg-white text-paragraph hover:bg-primary/5 hover:text-primary transition-all duration-200 focus:outline-none cursor-pointer"
						aria-label="Toggle Sidebar"
					>
						{#if sidebarCollapsed}
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 5l7 7-7 7M5 5l7 7-7 7"
								/>
							</svg>
						{:else}
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M11 19l-7-7 7-7M19 19l-7-7 7-7"
								/>
							</svg>
						{/if}
					</button>
				</div>
				<div class="flex items-center gap-4">
					<div
						class="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary"
					>
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
						Sistem Aktif
					</div>
				</div>
			</header>

			<!-- Content Panel -->
			<main class="flex-1 p-8">
				{@render children()}
			</main>
		</div>
	</div>
{/if}
