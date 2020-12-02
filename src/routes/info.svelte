<script context="module">
   import axios from 'axios';
   import {createMarkdown} from "safe-marked";

   const marked = createMarkdown();
   
  	export async function preload(page, session) {
      const { CMS_APP_API_URL } = session;
      let info = [];
      try{
         const res = await axios.get(`${CMS_APP_API_URL}/about-info`);
		   info = res.data;
      } catch(e) {
         error = e;
      }
		return {
			info
		};
   }
   
</script>
<script>

   export let info;
   
</script>

   <svelte:head>
      <title>Band Info Page</title>
   </svelte:head>
   <div id="container">
      {#if info.Info != null}
      <h1>{info.Title}</h1>
         <div id="info">
            {@html marked(info.Info)}
         </div>
      {:else}
         <h1>Nothing Is Up Yet</h1>
      {/if}
      {#if info.Band_Pic != null} 
         <div id="img">
            <img src="{info.Band_Pic}" alt=""/>
         </div>
      {/if} 
   </div>

   <style>
      *{
         color: white;
      }
   
      h1{
         text-align: center;
         font-size: 2.8em;
         text-transform: uppercase;
         font-weight: 700;
         margin: 0 0 0.5em 0;
         text-shadow: 0 0 2px rgb(255, 254, 245);
      }
      #container{
         display: flex;
         flex-direction: column;
         justify-content: center;
         flex-wrap: wrap;
         overflow: hidden;
         align-items: center;
         text-align: center;
         overflow-x: hidden;
      }
      #info :global(h2){
         font-size: 1.8em;
         
      }
      #info :global(){
         max-width: 40em;
         display: flex;
         flex-direction: column;
         justify-content: center;
         flex-wrap: wrap;
         overflow: hidden;
         align-items: center;
         
         overflow-x: hidden;
         margin: 1em 1em;
      }
      #info :global(ul){
         text-align: left;
         font-size: 1.5em;
      }
      #img{
         width: 30em;
         height: 30em;
      }
      
   </style>   