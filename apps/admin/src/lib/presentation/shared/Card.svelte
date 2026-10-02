<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div class="rounded-xl border border-primary/20 bg-white shadow-[0_1px_3px_rgba(45,52,54,0.05),0_10px_25px_-5px_rgba(120,157,142,0.06)] transition-all duration-200 {className}">
	<slot />
</div>
