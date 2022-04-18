<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { TrashIcon } from '@krowten/svelte-heroicons';
	const dispatch = createEventDispatcher();
	const onClick = () => {
		dispatch('remove-address');
	};
</script>

<button
	class="text-white rounded p-2 bg-red-500 items-center justify-center flex hover:shadow-md hover:shadow-red-300"
	on:click={onClick}
>
	<TrashIcon class="w-6 h-6" />
</button>
