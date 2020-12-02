<script>
   import { stores } from '@sapper/app'
   export let segment;
   const { page } = stores();
</script>

<style>
   div {
      width: 100vw;
      height: 100%;
      background-color: white;
      padding: 2em 0;
      margin-bottom: 0;
      align-self: flex-end;
   }
   div p {
      text-align: center;
      color: rgb(22, 22, 22);
      font-size: 1.5em;
   }
   nav {
      color: rgb(22, 22, 22);
      display: flex;
      flex-direction: row;
      list-style: none;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
   }
   nav li {
      margin: 0 1em;
      font-size: 1.5em;
   }
   a{
      text-decoration: none;
   }
   li:hover {
      cursor: pointer;
      border-top: 0.05em solid #020202;
      border-bottom: 0.05em solid #020202;
      transition: 60ms;
   }
   #EML{
      text-decoration: underline;
   }
</style>

<div>
   <nav {segment} {page}>  
      <li><a aria-current="{segment === 'past shows' ? 'page' : undefined}"  rel=prefetch  href="past_shows">Past Shows</a></li>
      <li><a aria-current="{segment === 'pics' ? 'page' : undefined}" rel=prefetch href="pics">Pics</a></li>
      <li><a aria-current="{segment === 'vid' ? 'page' : undefined}" href="vids">Vids</a></li>
      <li><a aria-current="{segment === 'info' ? 'page' : undefined}"  href="info">Band Info</a></li>      
      <li><a aria-current="{segment === 'subscribe' ? 'page' : undefined}" href="subscribe">Subscribe</a></li>
   </nav>
   <p><a href=".">GARAGE RATZ</a> © 2017 - {new Date().getFullYear()}</p>
   <p>Inquiries? Hit us up @ <a id="EML" href = "mailto: garageratz570@gmail.com">this Link</a>
   
</div>
