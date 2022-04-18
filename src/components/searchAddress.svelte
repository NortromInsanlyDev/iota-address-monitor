<script lang="ts">
	import { KeywordStore } from '../stores/keywordStore';
	import Card from './card.svelte';
	let keyword: string = null;

	const onChange = () => {
		KeywordStore.update(() => {
			return keyword;
		});
	};
</script>

<Card>
	<form class="" on:submit|preventDefault={onChange}>
		<input
			class="w-full border-2 border-gray-400 rounded-lg px-2 text-lg focus:border-black"
			type="text"
			bind:value={keyword}
			placeholder="Search..."
			on:input={onChange}
		/>
	</form>
</Card>
