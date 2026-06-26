<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';
	export let disabled = false;
	let className = '';
	export { className as class };

	const variants = {
		primary: 'bg-[#F4D35E] text-[#1C2B26] hover:bg-[#e8c94e]',
		secondary: 'bg-[#789D8E] text-white hover:bg-[#6b8d7f]',
		ghost: 'bg-transparent text-[#789D8E] hover:bg-[#F8FAF8]',
		danger: 'bg-[#D95F5F] text-white hover:bg-[#c54e4e]'
	};
</script>

<button
	{disabled}
	on:click
	class="rounded-lg px-4 py-2 font-medium transition-colors disabled:opacity-50 {variants[
		variant
	]} {className}"
>
	<slot />
</button>
