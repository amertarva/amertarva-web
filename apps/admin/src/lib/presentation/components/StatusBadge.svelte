<script lang="ts">
	import Badge from '../shared/Badge.svelte';

	export let status: string;

	const colorMap: Record<string, 'green' | 'yellow' | 'red' | 'gray'> = {
		ACTIVE: 'green',
		DONE: 'green',
		PENDING: 'yellow',
		IN_PROGRESS: 'yellow',
		NOT_STARTED: 'gray',
		SUSPENDED: 'red',
		FAILED: 'red'
	};
</script>

<Badge color={colorMap[status] ?? 'gray'}>{status}</Badge>
