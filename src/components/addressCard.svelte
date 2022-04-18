<script lang="ts">
	import { AddressStore } from '../stores/addressStore';
	import WithCopy from './withCopy.svelte';
	import DeleteButton from './deleteButton.svelte';
	import Property from './property.svelte';
	import type { Address } from '../typings/address';
	export let address: Address;

	const handleRemove = () => {
		console.log("remove")
		AddressStore.update((list) => {
			return list.filter((v) => v != address);
		});
	};
</script>

<div class="p-4 border-[1px] justify-between items-center rounded-md md:flex">
	<div class="md:pr-8">
		<Property key="address">
			<WithCopy text={address.address}>
				<a
					class="break-all hover:text-cyan-500 hover:underline"
					href={`/#/address/${address.address}`}>
					{address.address}
				</a>
			</WithCopy>
		</Property>
		<Property key="balance">
			<p>{address.balance / 1000000} Mi</p>
		</Property>
	</div>
	<div class="flex item-end">
		<DeleteButton on:remove-address={handleRemove} />
	</div>
</div>
