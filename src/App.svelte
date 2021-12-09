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