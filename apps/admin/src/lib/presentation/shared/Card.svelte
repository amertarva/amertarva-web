<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div class="rounded-2xl border border-primary/10 bg-white shadow-[0_4px_20px_-4px_rgba(120,157,142,0.08)] transition-all duration-200 {className}">
	<slot />
</div>
