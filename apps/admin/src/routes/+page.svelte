<script lang="ts">
	import { onMount } from 'svelte';
	import { schoolsStore } from '$lib/application/stores/schools.store';
	import { loadSchools } from '$lib/application/use-cases/schools.usecase';
	import DashboardStats from '$lib/presentation/components/DashboardStats.svelte';
	import RecentSchoolsTable from '$lib/presentation/components/RecentSchoolsTable.svelte';
	import QuickActions from '$lib/presentation/components/QuickActions.svelte';

	onMount(loadSchools);

	// Derived metrics
	$: totalSchools = $schoolsStore.length;
	$: activeSchools = $schoolsStore.filter((s) => s.status === 'ACTIVE').length;
	$: pendingSchools = $schoolsStore.filter((s) => s.status === 'PENDING').length;
	$: totalStorage = $schoolsStore.reduce((acc, s) => acc + s.maxStorageGb, 0);

	// Get latest 5 schools
	$: recentSchools = [...$schoolsStore]
		.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
		.slice(0, 5);
</script>

<div class="space-y-8">
	<!-- Top Welcome Header -->
	<div class="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
		<div>
			<h1 class="text-2xl font-bold tracking-tight text-heading">Dashboard Overview</h1>
			<p class="text-sm text-paragraph">Ringkasan status ekosistem sekolah Amertarva saat ini.</p>
		</div>
	</div>

	<!-- Stats Grid -->
	<DashboardStats {totalSchools} {activeSchools} {pendingSchools} {totalStorage} />

	<!-- Dashboard Body Layout -->
	<div class="grid gap-6 lg:grid-cols-3">
		<!-- Left: Recent Schools Table -->
		<div class="lg:col-span-2">
			<RecentSchoolsTable {recentSchools} />
		</div>

		<!-- Right: Quick Links / Helper Guide -->
		<div>
			<QuickActions />
		</div>
	</div>
</div>
