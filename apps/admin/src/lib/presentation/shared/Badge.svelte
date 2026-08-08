<script lang="ts">
	export let color: 'green' | 'yellow' | 'red' | 'gray' = 'gray';

	const colors = {
		green: 'bg-primary/10 text-primary border-primary/25',
		yellow: 'bg-secondary/20 text-heading/85 border-secondary/35',
		red: 'bg-red-500/10 text-red-600 border-red-500/25',
		gray: 'bg-heading/5 text-heading/60 border-heading/10'
	};
</script>

<span
	class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide {colors[
		color
	]}"
>
	<slot />
</span>
