<script lang="ts">
	export let key: string;
</script>

<div class="xl:flex">
	<p class="font-bold uppercase text-gray-500 mr-4">{key}</p>
	<slot />
</div>
