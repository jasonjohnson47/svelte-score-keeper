<script lang="ts">
    import { players } from '../stores';
	import { scores } from '../stores';
    import { roundToEdit } from '../stores';
    import { getPointsById } from '../utils';
    import type { Round } from '../types';

    const currentRoundScores: Round = $scores[$roundToEdit - 1];

    let updatedRoundPoints = $players.reduce((acc, currPlayer) => {
        return {...acc, ['player-' + currPlayer.id]: getPointsById(currentRoundScores, currPlayer.id)};
    }, {});

    let updatedRoundScores: Round;
    $: updatedRoundScores = $players.map((player) => {
        return {
            id: player.id,
            points: updatedRoundPoints['player-' + player.id]
        };
    });

    function updateRound() {
        let newScores = [...$scores];
        newScores[$roundToEdit - 1] = updatedRoundScores;
        scores.set(newScores);
        document.location.hash = 'history'
    }
</script>

<h1>Edit Round {$roundToEdit}</h1>

<form action="">
    <ul>
        {#each $players as player}
            <li>
                <label for="score-{player.id}">{player.name}</label>
                <input
                    type="number"
                    id="score-{player.id}"
                    name="score-{player.id}"
                    bind:value={updatedRoundPoints['player-' + player.id]}
                    aria-describedby="score-{player.id}-description"
                >
                <span id="score-{player.id}-description" class="sr-only">{player.name}'s score in round {$roundToEdit}</span>
            </li>
        {/each}
    </ul>
    <div>
        <button
            type="button"
            on:click="{() => { document.location.hash = 'history'; }}"
        >Cancel</button>
        <button type="button" on:click="{updateRound}">Update Round</button>
    </div>
</form>
