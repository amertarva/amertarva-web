<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '../shared/Card.svelte';
	import { PlusCircle, Globe, ChevronRight } from '@lucide/svelte';
</script>

<div class="space-y-3.5">
	<h2 class="text-base font-bold text-heading">Aksi & Panduan Admin</h2>
	<Card class="p-5 space-y-4">
		<!-- Action 1 -->
		<div class="flex items-start gap-3.5">
			<div
				class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20"
			>
				<PlusCircle class="h-4 w-4" />
			</div>
			<div>
				<h4 class="font-bold text-heading text-sm">Registrasi Tenant Baru</h4>
				<p class="text-xs text-paragraph mt-0.5 leading-relaxed">
					Daftarkan sekolah baru, tentukan durasi sewa, dan alokasikan basis data.
				</p>
				<button
					type="button"
					on:click={() => goto('/schools/new')}
					class="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer"
				>
					<span>Buka Form Pendaftaran</span>
					<ChevronRight class="h-3 w-3" />
				</button>
			</div>
		</div>

		<hr class="border-primary/15" />

		<!-- Action 2 -->
		<div class="flex items-start gap-3.5">
			<div
				class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/20 text-heading border border-secondary/30"
			>
				<Globe class="h-4 w-4 text-heading/80" />
			</div>
			<div>
				<h4 class="font-bold text-heading text-sm">Kelola Domain & Kill-Switch</h4>
				<p class="text-xs text-paragraph mt-0.5 leading-relaxed">
					Atur custom domain DNS institusi atau aktifkan penangguhan web sekolah.
				</p>
				<button
					type="button"
					on:click={() => goto('/schools')}
					class="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer"
				>
					<span>Lihat Daftar Tenant</span>
					<ChevronRight class="h-3 w-3" />
				</button>
			</div>
		</div>
	</Card>
</div>
