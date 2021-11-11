<script lang="ts">
    import { players } from '../stores';
    import { scores } from '../stores';
    import { afterUpdate } from 'svelte';

    let thisInput;

    function addPlayer() {
        players.set([...$players, { 
            id: $players.length,
            name: ''
        }]);
        scores.set(
            $scores.map((scoreRound) => {
                return [...scoreRound, {
                    id: scoreRound.length,
                    points: 0
                }]
            })
        );
    }

    function deletePlayer(id: number) {
        players.set(
            $players.filter((player) => player.id !== id)
        );
        scores.set(
            $scores.map((scoreRound) => {
                return scoreRound.filter((score) => score.id !== id);
            })
        );
    }

    function startGame() {
        document.location.hash = 'current-round';
    }

    afterUpdate(() => {
        thisInput.focus();
    });

</script>

<h1>Who's Playing?</h1>

<ul>
    {#each $players as player}
        <li>
            <label for="name-{player.id}">Player Name</label>
            <input
                type="text"
                id="name-{player.id}"
                bind:value="{player.name}"
                bind:this={thisInput}
            >
            <button type="button" on:click={() => { deletePlayer(player.id)}}>Delete Player</button>
        </li>
    {/each}
</ul>

<div>
    <button type="button" on:click="{addPlayer}">Add Player</button>
</div>

<div>
    <button type="button" on:click="{startGame}">Start Game</button>
</div>