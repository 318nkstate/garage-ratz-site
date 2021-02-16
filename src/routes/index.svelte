<script context="module">
	import axios from 'axios'
  	export async function preload(page, session) {
		let shows = [];
		let headliner = [];
		const { CMS_APP_API_URL } = session;
		const res = await axios.get(`${CMS_APP_API_URL}/shows`);
		const res2 = await axios.get(`${CMS_APP_API_URL}/front-page-headliner`);
		shows = res.data;
		headliner = res2.data;
		return {
			shows,
			headliner,
			CMS_APP_API_URL
		};
	}
</script>

<script>

import Static from '../components/static-placeholder.svelte';

	export let shows, headliner, CMS_APP_API_URL;
	let upcomingShowsAll = [];
	let upcomingShows = [];
	let pastShows = [];
	let nextShow = [];
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

	const dateSorterAsc = (s1, s2) => ((s1.date > s2.date) ? '-1' : (s1.date < s2.date) ? '1' : '0');
	const dateSorterDesc = (s1, s2) => ((s1.date < s2.date) ? '-1' : (s1.date > s2.date) ? '1' : '0');

	function init(){
		for (let i = 0; i < shows.length; i++){
			if(shows[i].date >= today()){
				upcomingShowsAll.push(shows[i]);	
				upcomingShowsAll = upcomingShowsAll.sort(dateSorterDesc);	
			} else {
				pastShows.push(shows[i]);
			}
		}
		for(let i = 1; i < upcomingShowsAll.length; i++){
			upcomingShows.push(upcomingShowsAll[i]);
		}
		nextShow = upcomingShowsAll[0];
		upcomingShows = upcomingShows.sort(dateSorterDesc);
		pastShows = pastShows.sort(dateSorterAsc);
	};
	init();
</script>


<style>
	*{
		color: white;
		display: flex;
		flex-direction: column;

	}

	h1 {
		text-align: center;
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
		text-shadow: 0 0 2px rgb(255, 254, 245);
   }
	h2 {
		text-align: center;
		font-size: 2.5em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0.8em 0 0.1em 0;
		text-shadow: 0 0 3px rgb(255, 254, 245);
	}

	h3 {
		font-size: 1.8em;
		text-transform: uppercase;
		font-weight: 500;
		text-shadow: 0 0 3px rgb(255, 254, 245);
	}
	a{
		text-shadow: 0 0 9px rgb(255, 254, 245);
		cursor: pointer;
		transition: 0.25s ease-in-out;
	}
	a:hover{
		color: #ededed;
		text-shadow: 0 0 21px rgb(255, 254, 245);
		cursor: pointer;
		transition: 0.25s ease-in-out;
	}
	strong{
		text-shadow: 0 0 2px rgb(255, 254, 245);
		margin: 1em;
	}
	img{
		height: auto;
		width:100%;
		background-color: white;

	}
	.divider{
		border-top:4px solid  white;
		width: 3em;
	}

	.container {
		display: flex;
		align-content: center;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		justify-items: middle;
		align-items: center;
		margin: 0 2em;
	}

	.upcomingShow{
		display: flex;
		flex-direction: row;
		align-items:center;
		justify-items: center;
		justify-content:center;
		border:2px solid  white;
		margin: 0.5em 0;
		overflow: hidden;
	}
	.upcomingShow > h3, strong{
		margin: 1em;
	}
	.posterThisWeek{
		margin-top: 2em;
		width:100%;
	}
	#placeholder{
		min-width: 30em;
		min-height: 30em;
	}
	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
		.container{
			margin: 0;
			padding: 0;
		}
	}

</style>

<svelte:head>
	<title>The Garage Ratz Website</title>
</svelte:head>

<div class="container">
	<h1>{headliner.Site_Headliner}</h1>
	<div class="divider"/>

	<div class='posterThisWeek'>
		{#if nextShow.poster != null || undefined}
		<img src={CMS_APP_API_URL + nextShow.poster.formats.medium.url} alt='Garage Ratz Next Show Poster'/>
		{/if}
		
		{if nextShow.date != null || undefined}
		<h2>Next Show: <br> <a href="shows/{nextShow.id}">{nextShow.venue}</a></h2>
			<strong>DATE: {nextShow.date} </strong>
		{:else}
		<h2>There's Nothing Lined Up</h2>
		<div id="placeholder"><span /></div>
		{/if}

		{#if nextShow.poster = null || undefined }
			<h2>Next Show: <br> <a href="shows/{nextShow.id}">{nextShow.venue}</a></h2>
			<strong>DATE: {nextShow.date} </strong>
		{/if}

		{#if nextShow && nextShow.location != null || undefined }
			<strong>LOCATION: {nextShow.location}</strong>
		{/if}
	</div>
	<div class="divider"/>
	<div id="upcomingShowContainer">
		{#if upcomingShows.date != null}
		<h2>Upcoming Shows</h2>
			{#each upcomingShows.slice(0, 7) as ushow}
				<div class="upcomingShow">
						<h3><a href="shows/{ushow.id}">{ushow.venue}</a></h3>
						<strong>DATE: {ushow.date} @ {ushow.time}</strong>
				</div>
			{/each}
		{/if}
	</div>	
</div>
