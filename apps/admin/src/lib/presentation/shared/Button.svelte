<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled = false;
	let className = '';
	export { className as class };

	const variants = {
		primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm active:scale-[0.98]',
		secondary: 'bg-secondary text-heading hover:bg-secondary-hover shadow-sm active:scale-[0.98]',
		ghost: 'bg-transparent text-primary hover:bg-primary/10 active:bg-primary/25',
		danger: 'bg-[#D95F5F] text-white hover:bg-[#c54e4e] shadow-sm active:scale-[0.98]'
	};
</script>

<button
	{type}
	{disabled}
	on:click
	class="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/25 disabled:pointer-events-none disabled:opacity-50 {variants[
		variant
	]} {className}"
>
	<slot />
</button>
