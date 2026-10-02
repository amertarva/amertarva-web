<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' = 'primary';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled = false;
	let className = '';
	export { className as class };

	const variants: Record<string, string> = {
		primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm border border-primary/30 active:scale-[0.98]',
		secondary: 'bg-secondary text-heading hover:bg-secondary-hover shadow-sm border border-secondary/30 active:scale-[0.98]',
		outline: 'bg-white text-heading hover:bg-primary/5 hover:text-primary hover:border-primary/40 border border-primary/20 shadow-xs active:scale-[0.98]',
		ghost: 'bg-transparent text-paragraph hover:bg-primary/10 hover:text-heading active:bg-primary/20',
		danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm border border-rose-700 active:scale-[0.98]'
	};
</script>

<button
	{type}
	{disabled}
	on:click
	class="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1 disabled:pointer-events-none disabled:opacity-40 cursor-pointer {variants[
		variant
	] || variants.primary} {className}"
>
	<slot />
</button>
