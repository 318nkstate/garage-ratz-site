<script>
   import { onMount, onDestroy } from "svelte";

   let theNoise,
      ctx = [],
      time = 0;
   function makeNoise(width, height){
      width = theNoise.width;
      height = theNoise.height
      let img = ctx.createImageData(theNoise.width, theNoise.height);
      let pix = new Uint8ClampedArray(img.data.buffer);

      for (let i = 0, n = pix.length; i < n; i += 4) {
         let c =
            7 + Math.tan(i / 5000 + time * 0.06) / Math.sin(i / 100 + time * 0.5);
         pix[i] = pix[i + 1] = pix[i + 2] = 40 * Math.random() * c;
         pix[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      time = (time + 1) % theNoise.height;

   };

   function setup(){
      return ctx = theNoise.getContext("2d");
   };
  
   onMount(() => {
      setup();

      (function loop(){
         makeNoise(0, 0);
         requestAnimationFrame(loop);
      })();
   });

</script>

<style>
   canvas {
      width: 100%;
      height: 100%;
   }
</style>

<canvas bind:this={theNoise} height="100%" width="100%" />
