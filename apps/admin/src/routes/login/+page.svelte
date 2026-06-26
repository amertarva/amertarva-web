<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/application/use-cases/auth.usecase';
	import Card from '$lib/presentation/shared/Card.svelte';
	import Input from '$lib/presentation/shared/Input.svelte';
	import Button from '$lib/presentation/shared/Button.svelte';

	let email = '';
	let password = '';
	let error = '';
	let loading = false;

	// Submit login
	async function handleSubmit() {
		error = '';
		loading = true;
		try {
			await login(email, password);
			goto('/schools');
		} catch {
			error = 'Email atau password salah';
		} finally {
			loading = false;
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-[#F8FAF8]">
	<Card class="w-full max-w-sm p-8">
		<h1 class="mb-1 text-xl font-semibold text-[#789D8E]">Amertarva</h1>
		<p class="mb-6 text-sm text-[#7A9590]">Lord Admin Dashboard</p>

		<Input label="Email" type="email" bind:value={email} />
		<Input label="Password" type="password" bind:value={password} />

		{#if error}
			<p class="mt-2 text-sm text-[#D95F5F]">{error}</p>
		{/if}

		<Button variant="primary" on:click={handleSubmit} disabled={loading} class="mt-4 w-full">
			{loading ? 'Memproses...' : 'Masuk'}
		</Button>
	</Card>
</div>
