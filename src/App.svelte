<script lang="ts">
	import GameSetup from './components/GameSetup.svelte';
	import CurrentRound from './components/CurrentRound.svelte';
	import History from './components/History.svelte';
	import EditRound from './components/EditRound.svelte';

	let page = document.location.hash;

	window.onpopstate = function() {
        page = document.location.hash;
    };
</script>

<main>

	<nav>
		<a href="#game-setup">Game Setup</a> |
		<a href="#current-round">Current Round</a> |
		<a href="#history">History</a> |
		<a href="#edit-round">Edit Round</a>
	</nav>

	{#if page==="#game-setup"}
		<GameSetup />
	{:else if page === "#current-round"}
		<CurrentRound />
	{:else if page === "#history"}
		<History />
	{:else if page === "#edit-round"}
		<EditRound />
	{:else}
		<GameSetup />
	{/if}

</main>

<style>
	main {
		line-height: 1.5;
	}
</style>