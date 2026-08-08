<script lang="ts">
	import LoginForm from '$lib/presentation/components/LoginForm.svelte';
</script>

<div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-amerta-bg px-4">
	<!-- Background abstract blobs for premium vibe -->
	<div class="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
	<div class="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-secondary/15 blur-3xl"></div>

	<LoginForm />
</div>
