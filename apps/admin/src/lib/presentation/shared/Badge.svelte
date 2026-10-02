<script lang="ts">
	export let color: 'green' | 'yellow' | 'red' | 'gray' | 'blue' = 'gray';

	const colors: Record<string, string> = {
		green: 'bg-emerald-50 text-emerald-800 border-emerald-300/80',
		yellow: 'bg-amber-50 text-amber-900 border-amber-300/80',
		red: 'bg-rose-50 text-rose-800 border-rose-300/80',
		blue: 'bg-teal-50 text-teal-800 border-teal-300/80',
		gray: 'bg-slate-100 text-slate-700 border-slate-300'
	};
</script>

<span
	class="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-semibold tracking-wide {colors[
		color
	] || colors.gray}"
>
	<slot />
</span>
