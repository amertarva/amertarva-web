<script lang="ts">
	import { onMount } from 'svelte';
	import { schoolsStore } from '$lib/application/stores/schools.store';
	import { loadSchools } from '$lib/application/use-cases/schools.usecase';
	import SchoolListPanel from '$lib/presentation/components/SchoolListPanel.svelte';

	onMount(loadSchools);
</script>

<SchoolListPanel schools={$schoolsStore} />
