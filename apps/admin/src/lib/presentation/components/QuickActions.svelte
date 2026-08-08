<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '../shared/Card.svelte';
</script>

<div class="space-y-4">
	<h2 class="text-lg font-bold text-heading">Pintasan Cepat</h2>
	<Card class="p-6 space-y-4">
		<div class="flex items-start gap-4">
			<div
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-heading"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
			<div>
				<h4 class="font-semibold text-heading text-sm">Registrasi Sekolah Baru</h4>
				<p class="text-xs text-paragraph mt-1">
					Daftarkan sekolah baru dan persiapkan alokasi databasenya.
				</p>
				<button
					on:click={() => goto('/schools/new')}
					class="mt-2 text-xs font-bold text-primary hover:underline"
					>Mulai Pendaftaran →</button
				>
			</div>
		</div>

		<hr class="border-primary/10" />

		<div class="flex items-start gap-4">
			<div
				class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
			</div>
			<div>
				<h4 class="font-semibold text-heading text-sm">Monitoring Database</h4>
				<p class="text-xs text-paragraph mt-1">
					Cek koneksi dan status inisialisasi tenant secara berkala.
				</p>
				<button
					on:click={() => goto('/schools')}
					class="mt-2 text-xs font-bold text-primary hover:underline"
					>Monitor Status →</button
				>
			</div>
		</div>
	</Card>
</div>
