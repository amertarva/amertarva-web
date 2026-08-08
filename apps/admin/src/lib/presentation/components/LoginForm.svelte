<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '../../application/use-cases/auth.usecase';
	import Card from '../shared/Card.svelte';
	import Input from '../shared/Input.svelte';
	import Button from '../shared/Button.svelte';

	let email = '';
	let password = '';
	let error = '';
	let loading = false;

	async function handleSubmit() {
		error = '';
		loading = true;
		try {
			await login(email, password);
			goto('/');
		} catch {
			error = 'Email atau password salah';
		} finally {
			loading = false;
		}
	}
</script>

<Card
	class="relative w-full max-w-md p-8 md:p-10 border border-primary/15 shadow-[0_10px_50px_-12px_rgba(120,157,142,0.12)]"
>
	<!-- Brand Logo Lockup -->
	<div class="mb-8 text-center">
		<div
			class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white font-bold text-2xl shadow-lg shadow-primary/25"
		>
			A
		</div>
		<h1 class="text-2xl font-bold tracking-tight text-heading">Amertarva</h1>
		<p class="text-xs font-semibold uppercase tracking-wider text-primary mt-1">
			Master Admin Dashboard
		</p>
	</div>

	<!-- Form fields -->
	<form on:submit|preventDefault={handleSubmit} class="space-y-4">
		<Input
			label="Email Administrasi"
			type="email"
			placeholder="admin@amertarva.com"
			bind:value={email}
		/>

		<Input label="Kata Sandi" type="password" placeholder="••••••••" bind:value={password} />

		{#if error}
			<div
				class="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600 border border-red-100"
			>
				<svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
				<span>{error}</span>
			</div>
		{/if}

		<Button variant="primary" type="submit" disabled={loading} class="w-full mt-6 py-2.5">
			{#if loading}
				<svg class="mr-2 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
				Memproses...
			{:else}
				Masuk Ke Dashboard
			{/if}
		</Button>
	</form>
</Card>
