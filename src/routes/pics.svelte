<script context="module">
	import axios from 'axios'
  	export async function preload(page, session) {
		let pic = [];
		const { CMS_APP_API_URL } = session;
		const res = await axios.get(`${CMS_APP_API_URL}/pics`);
		pic = res.data;
		return {
			pic,
			CMS_APP_API_URL
		};
	}
</script>
<script>
	export let pic, CMS_APP_API_URL;
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
	.img{
		margin: 0.25em 0.5em;
		max-height: 20rem;
		max-width: 20rem;
		padding: 0.25em;
		align-self: center;
	}
</style>
<svelte:head>
	<title>Pics Page</title>
</svelte:head>
<div class="container"> 
	{#each pic.pics.reverse() as pic}
		<img class="img" src={CMS_APP_API_URL + pic.formats.small.url} alt=''>
	{/each}
</div>