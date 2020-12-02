<script context="module">
   import Static from '../../components/static-placeholder.svelte';
   import axios from 'axios';
   import {createMarkdown} from "safe-marked";

   const marked = createMarkdown();

   export async function preload(page, session) {
      let show = [];
      const { id } = page.params;
      const { CMS_APP_API_URL } = session;
      const res = await axios.get(`${CMS_APP_API_URL}/shows/${id}`);
      show = res.data;
      return { 
         show,
         CMS_APP_API_URL 
      };
   }
</script>
<script>
   export let show, CMS_APP_API_URL;

</script>


<svelte:head>
   <title>{show.venue}</title>
</svelte:head>

<div id="container">
   <div id="image">
      {#if show.poster != null} 
      <img src={CMS_APP_API_URL + show.poster.formats.medium.url} alt=""/>
      {:else}
      <Static/>         
      {/if}
   </div>
   <div id="info">
      <h1>{show.venue}</h1>
      <div id="time">
         <p>YMD: {show.date} @ {show.time}</p>
      </div>
   {#if show.excerpt || show.after_show_post != null}
      <p>{show.excerpt}</p>
      <section>{@html marked(show.after_show_post)}</section>
   {/if}
   </div>
</div>

<style>
   *{
		color: white;
	}

	h1 {
		text-align: center;
		font-size: 2.4em;
		text-transform: uppercase;
		font-weight: 700;
	}

	p {
      text-align: center;
		margin: 1em auto;
	}
   
   #info {
      display: flex;
      flex-direction: column;
      text-align: center;
      align-content: center;
      margin: 1em 1em;
      margin-top: 5%;
   }
   #container{
      display:flex;
      flex-direction: column;
      flex-wrap:wrap;
      height: auto;
      align-content: stretch;
      justify-content: center;
      align-items: center;
      margin: auto;
   }
   #time{
      display: flex;
      flex-direction: row;
      text-align:center;
      justify-content: center;
      flex-wrap:wrap;
      margin: 0;
   }
   #time p{
      margin: 1.5em 0;
      padding: 0 1.5em;

   }
   #image{
      width: 25em;
      margin: 2em 0 0 0;
   }
   img{
      width: 25em;
   }
	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
   @media (max-width: 600px) {
		img{
         width: 100%;
      }
	}
</style>
