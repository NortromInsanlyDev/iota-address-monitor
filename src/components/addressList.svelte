<script lang="ts">
	import { AddressStore } from '../stores/addressStore';
	import AddressCard from './addressCard.svelte';
	import { KeywordStore } from '../stores/keywordStore';
	import type { Address } from '../typings/address';
	let filterdAddresses: Address[] = [];

	$: {
		if ($KeywordStore || $KeywordStore.trim().length === 0) {
			filterdAddresses = $AddressStore.filter((value) => value.address.includes($KeywordStore));
		} else {
			filterdAddresses = $AddressStore;
		}
	}
</script>

<div class="rounded-md shadow-xl p-8 my-4 bg-white">
	{#if filterdAddresses.length > 0}
		<div class="col-1 space-y-4">
			{#each filterdAddresses as address (address.address)}
				<AddressCard {address} />
			{/each}
		</div>
	{:else}
		<p>No search result!</p>
	{/if}
</div>
