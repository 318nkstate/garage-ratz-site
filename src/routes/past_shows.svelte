<script context="module">
   import axios from 'axios'
   import Static from '../components/static-placeholder.svelte';
  	export async function preload(page, session) {
		const { CMS_APP_API_URL } = session;
      let shows = [];
      try {
         const res = await axios.get(`${CMS_APP_API_URL}/shows`);
		   shows = res.data;
      } catch(e){
         error = e;
      }
		return {
         shows,
         CMS_APP_API_URL
		};
	}
</script>

<script>
   import { onMount } from 'svelte';
   import PastShowsCard from '../components/pastShowsCard.svelte';
   export let shows, CMS_APP_API_URL;
   let pastShows = [];
	const thisYear = new Date().getFullYear();
	const thisMonth = new Date().getMonth();
	const thisDate = new Date().getDate();
   let today = `${thisYear}-${thisMonth + 1}-${thisDate}`;
   const dateSorterAsc = (s1, s2) => ((s1.date > s2.date) ? -1 : (s1.date < s2.date) ? 1 : 0);
   
   onMount(async () => {
		for (let i = 0; i < shows.length; i++){
			if(shows[i].date < today){
            pastShows.push(shows[i]);
            pastShows = pastShows.sort(dateSorterAsc);	
			} 
      }
	});
</script>

<style>
   *{
		color: white;
   }
   #container{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: auto;
      justify-content: space-evenly;
   }
   h1 {
		text-align: center;
		font-size: 2.6em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0.5em 0 0.5em 0;
	}  
</style>

<svelte:head>
      <title>Past Shows Page</title>
</svelte:head>

<h1>Past Shows</h1>
<div id="container">
   {#each pastShows as pshow}
      <PastShowsCard 
         poster={pshow.poster}
         posterSrc={CMS_APP_API_URL + pshow.poster.formats.small.url}
         slugID={pshow.id}
         venue={pshow.venue}
         location={pshow.location}
         date={pshow.date}
         excerpt={pshow.excerpt}
      />
   {/each}
</div>
