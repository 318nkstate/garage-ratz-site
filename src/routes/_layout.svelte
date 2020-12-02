<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import Static from '../components/static-placeholder.svelte'
</script>

<style>
	main {
		display: flex;
		flex-direction: column;
		position: relative;
		min-height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		box-sizing: border-box;
		overflow: hidden;
		
	}
	#c {
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		position: absolute;
		pointer-events: none;
		z-index: -1;
	}
</style>

<Header />
<main>
	<slot></slot>
	<div id="c">
		<Static/>
	</div>
	<Footer/>
</main>
