<script lang="ts">
	import { DuplicateIcon } from '@krowten/svelte-heroicons';
	import Clipboard from "svelte-clipboard"
	export let text: string;
</script>

<div class="flex">
	<slot />
	<div class="flex pl-4 justify-center items-center">
		<Clipboard
			{text}
			let:copy
			on:copy={() => {
				alert(`copied: ${text}`)
			}}>
			<button on:click={copy}>
				<DuplicateIcon class="text-gray-600 w-6 h-6 hover:text-cyan-500" />
			</button>
		</Clipboard>
		
	</div>
</div>
