<script lang="ts">
	import Card from '../shared/Card.svelte';
	import { Building2, CheckCircle2, ShieldAlert, Clock } from '@lucide/svelte';

	export let totalSchools = 0;
	export let activeSchools = 0;
	export let suspendedSchools = 0;
	export let expiringSoonSchools = 0;
	export let customDomainSchools = 0;
	export let totalStorage = 0;
</script>

<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
	<!-- Total Schools -->
	<Card class="p-5 border-l-4 border-l-primary flex flex-col justify-between">
		<div>
			<div class="flex items-center justify-between">
				<span class="text-xs font-bold uppercase tracking-wider text-heading/70">Total Sekolah</span>
				<div class="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
					<Building2 class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 text-2xl font-bold text-heading">{totalSchools}</div>
		</div>
		<p class="mt-3 text-xs text-paragraph border-t border-primary/10 pt-2.5">
			<span class="font-bold text-heading">{customDomainSchools}</span> tenant domain kustom.
		</p>
	</Card>

	<!-- Active Schools -->
	<Card class="p-5 border-l-4 border-l-emerald-600 flex flex-col justify-between">
		<div>
			<div class="flex items-center justify-between">
				<span class="text-xs font-bold uppercase tracking-wider text-heading/70">Web Aktif (Online)</span>
				<div class="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
					<CheckCircle2 class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 text-2xl font-bold text-emerald-700">{activeSchools}</div>
		</div>
		<p class="mt-3 text-xs text-paragraph border-t border-primary/10 pt-2.5">
			Operasional normal tanpa pemblokiran.
		</p>
	</Card>

	<!-- Suspended / Off Schools -->
	<Card class="p-5 border-l-4 border-l-rose-600 flex flex-col justify-between">
		<div>
			<div class="flex items-center justify-between">
				<span class="text-xs font-bold uppercase tracking-wider text-heading/70">Ditangguhkan (Off)</span>
				<div class="flex h-8 w-8 items-center justify-center rounded-md bg-rose-50 text-rose-700">
					<ShieldAlert class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 text-2xl font-bold text-rose-700">{suspendedSchools}</div>
		</div>
		<p class="mt-3 text-xs text-paragraph border-t border-primary/10 pt-2.5">
			Akses dikunci via kill-switch / sewa usai.
		</p>
	</Card>

	<!-- Expiring Soon / Storage -->
	<Card class="p-5 border-l-4 border-l-amber-600 flex flex-col justify-between">
		<div>
			<div class="flex items-center justify-between">
				<span class="text-xs font-bold uppercase tracking-wider text-heading/70">Habis Sewa &le; 7 Hari</span>
				<div class="flex h-8 w-8 items-center justify-center rounded-md bg-amber-50 text-amber-800">
					<Clock class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 text-2xl font-bold text-amber-700">{expiringSoonSchools}</div>
		</div>
		<p class="mt-3 text-xs text-paragraph border-t border-primary/10 pt-2.5">
			Kapasitas storage total: <span class="font-bold text-heading">{totalStorage} GB</span>.
		</p>
	</Card>
</div>
