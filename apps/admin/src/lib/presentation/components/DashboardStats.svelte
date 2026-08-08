<script lang="ts">
	import Card from '../shared/Card.svelte';

	export let totalSchools = 0;
	export let activeSchools = 0;
	export let pendingSchools = 0;
	export let totalStorage = 0;
</script>

<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
	<!-- Total Schools -->
	<Card class="relative overflow-hidden p-6 border-l-4 border-l-primary">
		<div class="flex items-center justify-between">
			<div>
				<p class="text-xs font-semibold uppercase tracking-wider text-paragraph/70">Total Sekolah</p>
				<h3 class="mt-2 text-3xl font-bold text-heading">{totalSchools}</h3>
			</div>
			<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
					/>
				</svg>
			</div>
		</div>
		<p class="mt-3 text-xs text-paragraph">Sekolah terdaftar di sistem pusat.</p>
	</Card>

	<!-- Active Schools -->
	<Card class="relative overflow-hidden p-6 border-l-4 border-l-emerald-500">
		<div class="flex items-center justify-between">
			<div>
				<p class="text-xs font-semibold uppercase tracking-wider text-paragraph/70">Sekolah Aktif</p>
				<h3 class="mt-2 text-3xl font-bold text-heading">{activeSchools}</h3>
			</div>
			<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
		</div>
		<p class="mt-3 text-xs text-paragraph">Sekolah dengan status operasional aktif.</p>
	</Card>

	<!-- Pending Schools -->
	<Card class="relative overflow-hidden p-6 border-l-4 border-l-secondary">
		<div class="flex items-center justify-between">
			<div>
				<p class="text-xs font-semibold uppercase tracking-wider text-paragraph/70">Menunggu</p>
				<h3 class="mt-2 text-3xl font-bold text-heading">{pendingSchools}</h3>
			</div>
			<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-heading">
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
		</div>
		<p class="mt-3 text-xs text-paragraph">Sekolah menunggu inisialisasi database.</p>
	</Card>

	<!-- Total Storage -->
	<Card class="relative overflow-hidden p-6 border-l-4 border-l-blue-500">
		<div class="flex items-center justify-between">
			<div>
				<p class="text-xs font-semibold uppercase tracking-wider text-paragraph/70">Total Storage</p>
				<h3 class="mt-2 text-3xl font-bold text-heading">{totalStorage} GB</h3>
			</div>
			<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
					/>
				</svg>
			</div>
		</div>
		<p class="mt-3 text-xs text-paragraph">Alokasi total kapasitas penyimpanan.</p>
	</Card>
</div>
