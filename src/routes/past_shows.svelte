<script context="module">
   import axios from 'axios'
   import Static from '../components/static-placeholder.svelte';
  	export async function preload(page, session) {
		const { CMS_APP_API_URL } = session;
      let shows = [];
      try {
         const res = await axios.get(`${CMS_APP_API_URL}/shows`);
		   shows = res.data;
		   console.log(shows);
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
   .card{
      border: solid white 0.25em;
      width: 25rem;
      margin: 0.5em;
      padding: 1em;

   }
   img{
      width: 100%;
      align-self: center;
   }
   a{
      font-size: 1.5em;
   }
   @media (max-width: 600px) {
		.card{
         width: 90vw;
      }
      #img{
         height: auto;
         width: 100%;
      }
   }
</style>

<svelte:head>
      <title>Past Shows Page</title>
</svelte:head>

<h1>Past Shows</h1>
<div id="container">
   {#each pastShows as pshow}
      <div class="card">
         <div id="img">
            {#if pshow.poster != null}
               <img src={ CMS_APP_API_URL + pshow.poster.formats.small.url} alt=''>
            {:else}     
               <Static /> 
            {/if}
         </div>

         <h2>{pshow.venue}</h2>
            {#if pshow.location != null}
               <p>Location: {pshow.location}</p>
            {:else}
               <p>Location: Secret</p>
            {/if}
         <i>Date: {pshow.date}</i>

         {#if pshow.excerpt != null}
         <p>{pshow.excerpt}</p>
         {/if}

         <p><a href='/shows/{pshow.id}'>more info</a></p>
      </div>
   {/each}
</div>