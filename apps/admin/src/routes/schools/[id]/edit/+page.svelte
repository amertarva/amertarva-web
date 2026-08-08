<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getSchool } from '$lib/application/use-cases/schools.usecase';
	import type { SchoolDetail } from '$lib/domain/school';
	import SchoolEditForm from '$lib/presentation/components/SchoolEditForm.svelte';

	let school: SchoolDetail | null = null;
	onMount(async () => {
		if ($page.params.id) {
			school = await getSchool($page.params.id);
		}
	});
</script>

{#if school}
	<div class="space-y-6">
		<!-- Page Header -->
		<div>
			<h1 class="text-2xl font-bold tracking-tight text-heading">Ubah Konfigurasi</h1>
			<p class="text-sm text-paragraph">
				Perbarui konfigurasi database dan kapasitas storage untuk {school.schoolName}.
				<a href="/schools/{school.schoolId}" class="text-primary hover:underline font-semibold ml-1">
					Kembali ke Detail →
				</a>
			</p>
		</div>

		<SchoolEditForm {school} />
	</div>
{/if}
