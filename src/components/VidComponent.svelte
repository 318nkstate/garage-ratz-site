<script>
   export let source = "";
   export let type = "";
</script>

<style>
   .vid {
      margin: 0.25em 0.5em;
      max-height: 40rem;
      max-width: 40rem;
      padding: 0.25em;
      align-self: center;
      overflow: none;
   }
   @media (max-width: 680px) {
      .vid {
         height: auto;
         width: 90vw;
      }
   }
</style>

<video controls class="vid" preload="metadata">
   <source src={source} type={type} />
   <track kind="captions" />
</video>
