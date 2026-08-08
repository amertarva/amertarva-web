<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getSchool } from '$lib/application/use-cases/schools.usecase';
	import type { SchoolDetail } from '$lib/domain/school';
	import SchoolDetailPanel from '$lib/presentation/components/SchoolDetailPanel.svelte';

	let school: SchoolDetail | null = null;
	onMount(async () => {
		if ($page.params.id) {
			school = await getSchool($page.params.id);
		}
	});
</script>

{#if school}
	<SchoolDetailPanel {school} />
{/if}
