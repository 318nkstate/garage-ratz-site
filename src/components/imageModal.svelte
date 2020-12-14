<script>
   export let largerImage;
   export let smallerImage;

   let showModal = false;

</script>


<section id="regular">
   <img id="reg" src={smallerImage} alt="" on:click={()=> showModal = true}/>
</section>

{#if showModal}
   <div id="modal-background" on:click={() => showModal = false } />
   <section id="modal">
      <img src={largerImage} alt="" on:click={() => showModal = false}>
      <p>Tap anywhere to close</p>
   </section>
{/if}

<style>
   img {
      cursor: pointer;
      width: 100%; 
      height: auto;
   }
   #reg{
      margin: 0.25em 0.5em;
		max-height: 20rem;
		max-width: 20rem;
		padding: 0.25em;
		align-self: center;
   }

   #modal{
      display: flex;
      z-index: 1;
      max-width: 100%;
      height: auto;
      flex-direction: column;
      justify-content: center;
   }
   #modal p{
      text-align: right;
   }
   #modal-background {
      cursor: pointer;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.9);
	}
</style>
