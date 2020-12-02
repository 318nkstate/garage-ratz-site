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
	.vid{
		margin: 0.25em 0.5em;
		max-height: 40rem;
		max-width: 40rem;
		padding: 0.25em;
		align-self: center;
	}
</style>
<svelte:head>
	<title>Vids Page</title>
</svelte:head>
<div class="container"> 
	{#each videos.vids.reverse() as vid}
		<video controls class="vid">
         <source src={CMS_APP_API_URL + vid.url} type={vid.mime} >
      </video>
	{/each}
</div>