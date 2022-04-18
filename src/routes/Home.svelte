<script lang="ts">
	import SearchAddress from '../components/searchAddress.svelte';

	import AddAddress from '../components/addAddress.svelte';
	import AddressList from '../components/addressList.svelte';
	import { AddressStore } from '../stores/addressStore';
</script>

<svelte:head>
	<title>Address monitor</title>
</svelte:head>
<SearchAddress on:update-keyword />
<AddAddress />

{#if $AddressStore.length > 0}
	<AddressList on:update-keyword />
{/if}

