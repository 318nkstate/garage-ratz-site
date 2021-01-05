<script>
   export let title;
   let open = false;
</script>

<style>
   label{
      width: 100%;

   }
   label:hover, 
   label:hover strong, 
   label:hover svg,
   label:active,
   label:active strong,
   label:active svg{
      cursor:pointer;
      color: rgb(202, 0, 0);
      
   }
   strong{
      font-size: 1.5em;
      padding: 0 1em;
   }
   section{
      width: 100%;
      background: #0f0f0fd3;
   }
   #toggle{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 1em 0;
   }
   #box{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
   }
   input{
      display: none;
   }
   svg{
      padding: 0 1em;
   }
</style>

<section>
   <label id="toggle">
      <strong>{title}</strong>
      <input type="checkbox" bind:checked={open}>
         <svg
            width="38"
            height="38"
            stroke="none"
            fill="currentColor"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            preserveAspectRatio="xMidYMid meet"
            data-attributes-set=",xmlns:xlink,xmlns,viewBox,preserveAspectRatio,xmlns:xlink,xmlns,viewBox,preserveAspectRatio,xmlns:xlink,xmlns,viewBox,preserveAspectRatio"><path
               xmlns="http://www.w3.org/2000/svg"
               fill-rule="evenodd"
               d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
               clip-rule="evenodd" /></svg>

   </label>

   {#if open}
   <div id="box">
      <slot></slot>
   </div>
   {/if}
</section>