
<script lang="ts">
  import type { IOutputResponse } from '@iota/iota.js';
  import { onMount } from 'svelte';
  import Card from '../components/card.svelte';
  import Property from '../components/property.svelte';
  import WithCopy from '../components/withCopy.svelte';
  import { getBalanceByAddressBech32,getOutputByAddress,getOutputById } from '../stores/addressStore';

	export let params;
	const address: string = params.id;
	let balance: number = 0;
	let outputIds: string[] = [];
	let outputs: IOutputResponse[] = [];

	onMount(async () => {
		balance = await getBalanceByAddressBech32(address)
    outputIds = (await getOutputByAddress(address)).outputIds;
		for (const outputId of outputIds) {
			const output = await getOutputById(outputId);
			outputs = [...outputs, output];
		}
	});

	$: loadedCount = outputs.length;
</script>

<Card>
	<div class="border-b-[1px] border-gray-400 pb-2 mb-2">
		<h1 class="font-bold">GENERAL</h1>
	</div>
	<Property key="address">
		<WithCopy text={address}><p class="break-all hover:text-cyan-500 hover:underline">{address}</p></WithCopy>
	</Property>
	<Property key="balance">
		<p>{balance / 1000000} Mi</p>
	</Property>
	{#if outputs.length > 0 && loadedCount < outputIds.length}
		<p class="text-gray-400">Loading Balances [{loadedCount} / {outputIds.length}]</p>
	{/if}
</Card>
{#if outputs.length > 0}
	<Card>
		<div class="border-b-[1px] border-gray-400 pb-2">
			<h1 class="font-bold">BALANCES</h1>
		</div>
		{#each outputs as output}
			<div class=" py-4">
				<Property key="message">
					<WithCopy text={output.messageId}><p class="break-all hover:text-cyan-500 hover:underline">{output.messageId}</p></WithCopy>
				</Property>
				<Property key="amount">
					<p>{output.output.amount / 1000000} Mi</p>
				</Property>
			</div>
		{/each}
	</Card>
{/if}
