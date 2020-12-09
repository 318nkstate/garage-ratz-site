<script>
   import logo from 'images/garage-ratz-logo.png';
   export let segment;
</script>

<style>
   header {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      background-color: #2e2828;
      padding: 2em;
      align-items: center;
   }
   figure{
      height: 15em;
      width: 15em;
   }
   img{
      height: 100%;
      width: 100%;
   }
   nav {
      display: flex;
      list-style: none;
      color: rgba(235, 235, 235, 0.4);
      justify-content: space-between;
   }
   li {
      margin: 0 0.5em;
   }
   li:hover {
      cursor: pointer;
      border-top: 0.15em solid #fdfdfd;
      border-bottom: 0.15em solid #fdfdfd;
      transition: 60ms;
   }
   li:active {
      cursor: pointer;
      border-top: 0.15em solid #fdfdfd;
      border-bottom: 0.15em solid #fdfdfd;
      transition: 60ms;
   }
</style>
<svelte:head>
   <script>
      (function (s, e, n, d, er) {
        s['Sender'] = er;
        s[er] = s[er] || function () {
          (s[er].q = s[er].q || []).push(arguments)
        }, s[er].l = 1 * new Date();
        var a = e.createElement(n),
            m = e.getElementsByTagName(n)[0];
        a.async = 1;
        a.src = d;
        m.parentNode.insertBefore(a, m)
      })(window, document, 'script', 'https://cdn.sender.net/accounts_resources/universal.js', 'sender');
      sender('8da33a189e8344');
    </script>
</svelte:head>

<header>
<figure>
   <a aria-current="{segment === '' ? 'page' : undefined}" href="/">
      <img alt="Garage Ratz Logo" src="{logo}" />
   </a>
</figure>
<nav>
   <li>
      <a href="https://open.spotify.com/artist/2zgm3HAAxeAVQlTxSetOTi">
         <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-brand-spotify"
            width="66"
            height="66"
            viewBox="0 0 24 24"
            stroke-width="1.2"
            stroke="#fcfcfc"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="9" />
            <path d="M8 11.973c2.5-1.473 5.5-.973 7.5.527" />
            <path d="M9 15c1.5-1 4-1 5 .5" />
            <path d="M7 9c2-1 6-2 10 .5" />
         </svg>
      </a>
   </li>
   <li>
      <a href="https://soundcloud.com/garageratz">
         <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-brand-soundcloud"
            width="66"
            height="66"
            viewBox="0 0 24 24"
            stroke-width="1.2"
            stroke="#fcfcfc"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
               d="M17 11h1c1.38 0 3 1.274 3 3c0 1.657 -1.5 3 -3 3l-6 0v-10c3 0 4.5 1.5 5 4z" />
            <line x1="9" y1="8" x2="9" y2="17" />
            <line x1="6" y1="17" x2="6" y2="10" />
            <line x1="3" y1="16" x2="3" y2="14" />
         </svg>
      </a>
   </li>
   <li>
      <a href="https://www.youtube.com/channel/UC-gkJTBx24Cew1pSHO-Z34Q">
         <svg xmlns="http://www.w3.org/2000/svg" 
            class="icon icon-tabler icon-tabler-brand-youtube"
            width="66"
            height="66"
            viewBox="0 0 24 24"
            stroke-width="1.2" 
            stroke="#fcfcfc" 
            fill="none" 
            stroke-linecap="round" 
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <rect x="3" y="5" width="18" height="14" rx="4" />
            <path d="M10 9l5 3l-5 3z" />
          </svg>
      </a>
   </li>
   <li>
      <a href="https://instagram.com/thegarageratz">
         <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-brand-instagram"
            width="66"
            height="66"
            viewBox="0 0 24 24"
            stroke-width="1.2"
            stroke="#fcfcfc"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <rect x="4" y="4" width="16" height="16" rx="4" />
            <circle cx="12" cy="12" r="3" />
            <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
         </svg>
      </a>
   </li>
   <li>
      <a href="https://www.facebook.com/thegarageratz/">
         <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-brand-facebook"
            width="66"
            height="66"
            viewBox="0 0 24 24"
            stroke-width="1.2"
            stroke="#fcfcfc"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
               d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
         </svg>
      </a>
   </li>

</nav>
</header>
