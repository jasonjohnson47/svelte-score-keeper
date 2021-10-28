<script lang="ts">
	import GameSetup from './components/GameSetup.svelte';
	import CurrentRound from './components/CurrentRound.svelte';
	import History from './components/History.svelte';
	import EditRound from './components/EditRound.svelte';

	let page = document.location.hash;

	window.onpopstate = function() {
        page = document.location.hash;
    };

	// use object w/ IDs in case we want to be able to remove players mid game
	// kind of just seems like a good idea possibly for other reasons
	let players = [
		{
			id: 0,
			name: 'Abby'
		},
		{
			id: 1,
			name: 'Jason'
		}
	];

	let scores = [
		[
			{
				id: 0,
				points: 0
			},
			{
				id: 1,
				points: 0
			},
		],
		[
			{
				id: 0,
				points: 10
			},
			{
				id: 1,
				points: 5
			},
		],
	];
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
		<History players={players} scores={scores} />
	{:else if page === "#edit-round"}
		<EditRound />
	{:else}
		<GameSetup />
	{/if}

</main>