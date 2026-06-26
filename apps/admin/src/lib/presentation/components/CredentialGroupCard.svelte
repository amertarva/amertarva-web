<script lang="ts">
	import Card from '../shared/Card.svelte';
	import CredentialField from './CredentialField.svelte';

	export let title: string;
	export let fields: readonly { key: string; label: string }[];
	export let values: Record<string, string>;
	export let configured: Record<string, boolean> = {};
</script>

<Card class="mb-4 p-4">
	<h3 class="mb-3 font-semibold text-[#789D8E]">{title}</h3>
	{#each fields as f}
		<CredentialField
			label={f.label}
			bind:value={values[f.key]}
			isConfigured={configured[f.key] ?? false}
		/>
	{/each}
</Card>
