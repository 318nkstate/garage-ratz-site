<script>
   import Static from "./static-placeholder.svelte"
   export let poster;
   export let posterSrc;
   export let slugID;
   export let venue;
   export let location;
   export let date;
   export let excerpt;
</script>

<div class="card">
   <div id="img">
      {#if {poster} != null}
         <img src={posterSrc} alt=''>
      {:else}     
         <Static /> 
      {/if}
   </div>

   <h2>{venue}</h2>
      {#if location != null}
         <p>Location: {location}</p>
      {:else}
         <p>Location: Secret</p>
      {/if}
   <i>Date: {date}</i>

   {#if excerpt != null}
   <p>{excerpt}</p>
   {/if}

   <p><a href='/shows/{slugID}'>more info</a></p>
</div>

<style>
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
