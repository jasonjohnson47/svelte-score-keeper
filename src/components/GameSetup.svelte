<script lang="ts">
    import { players } from '../stores';
    import { scores } from '../stores';
    import { afterUpdate } from 'svelte';

    let playerList: HTMLElement;
    let highestPlayerId:number;

    function addPlayer() {
        players.set([...$players, { 
            id: highestPlayerId + 1,
            name: ''
        }]);
        scores.set(
            $scores.map((scoreRound) => {
                return [...scoreRound, {
                    id: highestPlayerId + 1,
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
        const lastInput: HTMLInputElement = playerList.querySelector('li:last-child input');
        lastInput.focus();
        highestPlayerId = [...$players].sort((a, b) => b.id - a.id)[0].id;
    });

</script>

<h1>Who's Playing?</h1>

<ul bind:this={playerList}>
    {#each $players as player, index (player.id)}
        <li>
            <label for="name-{player.id}">Player Name</label>
            <input
                type="text"
                id="name-{player.id}"
                bind:value="{player.name}"
            >
            {#if $players.length !== index + 1}
                <button type="button" on:click={() => { deletePlayer(player.id)}}>Delete Player</button>
            {/if}
        </li>
    {/each}
</ul>

<div>
    <button type="button" on:click="{addPlayer}">Add Player</button>
</div>

<div>
    <button type="button" on:click="{startGame}">Start Game</button>
</div>