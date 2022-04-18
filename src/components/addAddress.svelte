<script lang="ts">
	import { AddressStore, getBalanceByAddressBech32 } from '../stores/addressStore';
	import Card from './card.svelte';
	let newAddress: string = '';

	let btnDisabled = true;
	let message: string = null;

	const handleInput = () => {
		 {
			message = null;
			btnDisabled = false;
		}
		const regexp = new RegExp('^atoi1(\\w{59})')

		if (newAddress.trim().length == 0) {
			btnDisabled = true;
			message = '';
		} else if (regexp.test(newAddress.trim())) {
			message = null;
			btnDisabled = false;
		} else {
			btnDisabled = true;
			message = 'Invalid address';
		}
	};

	const handleSubmit = async () => {
		if (newAddress.trim().length != 0) {
			if ($AddressStore.findIndex((e) => e.address == newAddress) != -1) {
				return;
			}
			try {
				let balance = await getBalanceByAddressBech32(newAddress)
				AddressStore.update((current) => {
					return [{address:newAddress, balance}, ...current];
				});
			} catch (error) {
				console.log(error);
			}
			newAddress = '';
		}
	};
</script>

<Card>
	<form class="flex justify-between" on:submit|preventDefault={handleSubmit}>
		<input
			class="w-full font-light border-2 border-gray-400 rounded-lg text-lg px-2 rounded-r-none border-r-0"
			bind:value={newAddress}
			type="text"
			on:input={handleInput}
			placeholder="New address"
		/>
		<button
			class="px-4 bg-blue-600 rounded rounded-l-none text-white disabled:bg-gray-400"
			type="submit"
			disabled={btnDisabled}
		>
			Add
		</button>
	</form>
	{#if message}
		<p class="pt-2 text-red-600">{message}</p>
	{/if}
</Card>
