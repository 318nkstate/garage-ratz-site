<script context="module">
	import axios from 'axios'
  	export async function preload(page, session) {
		let videos = [];
		const { CMS_APP_API_URL } = session;
		const res = await axios.get(`${CMS_APP_API_URL}/videos-page`);
		videos = res.data;
		return {
			videos,
			CMS_APP_API_URL
		};
	}
</script>
<script>
	import VidComponent from "../components/VidComponent.svelte";
	export let videos, CMS_APP_API_URL;
</script>
<style>
	*{
		color: white;
	}
	.container{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		justify-items: center;
		align-items: center;
		height: 100%;
		align-content: center;
	}
</style>
<svelte:head>
	<title>Vids Page</title>
</svelte:head>
<div class="container"> 
	{#each videos.vids.reverse() as vid}
		<VidComponent
			source={CMS_APP_API_URL + vid.url}
			type={vid.mime}
		/>
	{/each}
</div>
