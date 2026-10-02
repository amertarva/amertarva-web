<script lang="ts">
	import Badge from '../shared/Badge.svelte';

	export let status: string;

	const colorMap: Record<string, 'green' | 'yellow' | 'red' | 'gray' | 'blue'> = {
		ACTIVE: 'green',
		DONE: 'green',
		PENDING: 'yellow',
		IN_PROGRESS: 'blue',
		PENDING_DNS: 'yellow',
		EXPIRING_SOON: 'yellow',
		MAINTENANCE: 'yellow',
		NOT_STARTED: 'gray',
		NONE: 'gray',
		SUSPENDED: 'red',
		FAILED: 'red',
		EXPIRED: 'red'
	};

	const dotColorMap: Record<string, string> = {
		green: 'bg-emerald-600',
		yellow: 'bg-amber-600',
		red: 'bg-rose-600',
		blue: 'bg-teal-600',
		gray: 'bg-slate-500'
	};

	$: color = colorMap[status] ?? 'gray';
</script>

<Badge {color}>
	<span class="h-1.5 w-1.5 rounded-full {dotColorMap[color]}"></span>
	<span>{status}</span>
</Badge>
