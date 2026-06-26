<script lang="ts">
	import { authStore } from '$lib/application/stores/auth.store';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	// Guard auth — redirect ke /login kalau tidak punya token
	$effect(() => {
		if ($authStore.accessToken === null && $page.url.pathname !== '/login') {
			goto('/login');
		}
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
