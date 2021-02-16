<script context="module">
   import axios from 'axios'
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
   import Static from '../components/static-placeholder.svelte';
   export let shows, CMS_APP_API_URL;
   let pastShows = [];
   function today() {
      const date = new Date();
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1 < 10) ?
         "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
      month.toString();
      const day = (date.getDate() + 1 < 10) ?
         ('0' + date.getDate()) : (date.getDate());
      day.toString();
      return (`${year}-${month}-${day}`)
   };

   const dateSorterAsc = (s1, s2) => ((s1.date > s2.date) ? -1 : (s1.date < s2.date) ? 1 : 0);
   
   function init(){
		for (let i = 0; i < shows.length; i++){
			if(shows[i].date < today()){
            pastShows.push(shows[i]);
            pastShows = pastShows.sort(dateSorterAsc);	
			} 
      }
	};
	init();
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
	   border: solid rgba(255, 255, 255, 0.8) 0.1em;
	   width: 25rem;
	   margin: 0.5em;
	   padding: 1em;
	   background-color: rgb(10, 10, 10, 0.8);
	}
	.card:hover{
	   transition: 200ms;
	   border-color:rgb(202, 0, 0);
	   box-shadow: 0 0 3px rgb(202, 35, 35);
	}
	img{
	   width: 100%;
	   align-self: center;
	}
	a{
	   font-size: 1.5em;
	}
	a:hover{
	   transition: 200ms;
	   color:rgb(202, 0, 0);
	   text-shadow: 0 0 3px rgb(202, 35, 35);
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
	      {#if pshow.poster = (null || undefined)}
		 <Static /> 
	      {:else}
		   <img src={CMS_APP_API_URL + pshow.poster.formats.small.url} alt=''>
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
