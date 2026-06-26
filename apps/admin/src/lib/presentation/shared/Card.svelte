<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div class="rounded-xl border border-[#E2EAE6] bg-white shadow-sm {className}">
	<slot />
</div>
