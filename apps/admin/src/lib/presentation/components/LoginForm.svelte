<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { login } from '../../application/use-cases/auth.usecase';
	import Card from '../shared/Card.svelte';
	import Input from '../shared/Input.svelte';
	import Button from '../shared/Button.svelte';
	import { AlertTriangle, Loader2, Clock } from '@lucide/svelte';

	let email = '';
	let password = '';
	let error = '';
	let loading = false;

	$: isSessionExpired = $page.url.searchParams.get('reason') === 'session_expired';

	async function handleSubmit() {
		error = '';
		loading = true;
		try {
			await login(email, password);
			goto('/');
		} catch {
			error = 'Email atau password salah. Silakan coba lagi.';
		} finally {
			loading = false;
		}
	}
</script>

<Card
	class="relative w-full max-w-md p-8 md:p-9 border border-primary/20 bg-white shadow-[0_4px_24px_rgba(45,52,54,0.06)]"
>
	<!-- Brand Logo Lockup -->
	<div class="mb-6 text-center">
		<div
			class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white font-bold text-xl shadow-xs"
		>
			A
		</div>
		<h1 class="text-xl font-bold tracking-tight text-heading">Amertarva</h1>
		<p class="text-xs font-bold uppercase tracking-wider text-primary mt-0.5">
			Lord Platform Admin
		</p>
	</div>

	{#if isSessionExpired}
		<div class="mb-4 flex items-start gap-2.5 rounded-lg bg-amber-50 p-3 text-xs font-medium text-amber-900 border border-amber-300">
			<Clock class="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
			<span>Sesi login telah berakhir otomatis karena tidak ada aktivitas selama lebih dari 1 jam. Silakan login kembali.</span>
		</div>
	{/if}

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
				class="flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-xs font-medium text-rose-700 border border-rose-200"
			>
				<AlertTriangle class="h-4 w-4 shrink-0 text-rose-600" />
				<span>{error}</span>
			</div>
		{/if}

		<Button variant="primary" type="submit" disabled={loading} class="w-full mt-5 py-2.5 shadow-sm inline-flex items-center justify-center gap-2">
			{#if loading}
				<Loader2 class="h-4 w-4 animate-spin" />
				<span>Memverifikasi...</span>
			{:else}
				<span>Masuk Dashboard</span>
			{/if}
		</Button>
	</form>
</Card>
