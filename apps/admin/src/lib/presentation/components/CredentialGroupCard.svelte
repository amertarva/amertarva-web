<script lang="ts">
	import Card from '../shared/Card.svelte';
	import CredentialField from './CredentialField.svelte';

	export let title: string;
	export let fields: readonly { key: string; label: string }[];
	export let values: Record<string, string>;
	export let configured: Record<string, boolean> = {};
</script>

<Card class="p-5 space-y-3.5 border border-primary/20">
	<h3 class="font-bold text-heading text-sm pb-2 border-b border-primary/15">{title}</h3>
	{#each fields as f}
		<CredentialField
			label={f.label}
			bind:value={values[f.key]}
			isConfigured={configured[f.key] ?? false}
		/>
	{/each}
</Card>
