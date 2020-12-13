<script context="module">
   import axios from 'axios';
  	export async function preload(page, session) {
      const { CMS_APP_API_URL } = session;
      let image = [];
      try{
         const res = await axios.get(`${CMS_APP_API_URL}/background-pic`);
			image = res.data;
			console.log(image);
      } catch(e) {
         error = e;
      }
		return {
			image,
			CMS_APP_API_URL
		};
   }
</script>
<script>
	export let image, CMS_APP_API_URL;
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import Static from '../components/static-placeholder.svelte'
	let theSource = `${CMS_APP_API_URL + image.pic.url}`;
	import { onMount } from "svelte";
	let win;
	onMount(() => {
		win = window.innerWidth;
	});
</script>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-items: stretch;
		position: relative;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		box-sizing: border-box;
		overflow: hidden;
		margin: 0;
	}
	#c {
		width: 100%;
		height: 100%;
		pointer-events: none;
		position: absolute;
		z-index: -1;
	}
</style>


<Header />
{#if image.pic == null}

	<main>	
		<slot></slot>
		<div id="c">
			<Static/>
		</div>
		<Footer/>
	</main>
	
{:else if win < 600}

	<main style="
	background-image: url({theSource});
	background-position: center;
	background-repeat: no-repeat;
	background-size: 400% 100vh;
	background-attachment: fixed;
	overflow:hidden;
	" >
	<slot></slot>
	<Footer/>
	</main>

{:else}
	<main style="
	background-image: url({theSource});
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	background-attachment: fixed;
	overflow:hidden;
	" >
	<slot></slot>
	<Footer/>
	</main>
{/if}




