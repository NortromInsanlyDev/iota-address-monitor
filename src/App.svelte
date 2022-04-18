<script lang="ts">
	import Router from "svelte-spa-router";
	import routes from "./routes"
	import Header from "./components/header.svelte";
</script>

<svelte:head>
	<title>Address monitor</title>
</svelte:head>
<Header />
<div class="max-w-6xl mx-8 xl:mx-auto">
	<Router {routes}/>
</div>

