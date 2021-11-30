<script lang="ts">
    import { players } from '../stores';
	import { scores } from '../stores';
    import { roundToEdit } from '../stores';
    import { getPointsById } from '../utils';
    import type { Round } from '../types';
    import FloatingLabelInput from './FloatingLabelInput.svelte';

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

<div class="container-fluid">
    <ul>
        {#each $players as player}
            <li class="row player-row align-items-center">
                <div class="col">{player.name}</div>
                <div class="col-auto">
                    <FloatingLabelInput
                        id="score-{player.id}"
                        label="Points"
                        type={'number'}
                        min="0"
                        ariaDescribedby="score-{player.id}-description"
                        bind:value={updatedRoundPoints['player-' + player.id]}
                    />
                    <!--<label for="score-{player.id}">{player.name}</label>
                    <input
                        type="number"
                        id="score-{player.id}"
                        name="score-{player.id}"
                        bind:value={updatedRoundPoints['player-' + player.id]}
                        aria-describedby="score-{player.id}-description"
                    >-->
                    <span id="score-{player.id}-description" class="sr-only">Points {player.name} earned in round {$roundToEdit}</span>
                </div>
            </li>
        {/each}
    </ul>
    <div>
        <button
            type="button"
            class="btn btn-secondary"
            on:click="{() => { document.location.hash = 'history'; }}"
        >Cancel</button>
        <button
            type="button"
            class="btn btn-primary"
            on:click="{updateRound}"
        >Update Round</button>
    </div>
</div>

<style>
    ul {
        padding-left: 0;
        list-style: none;
    }
    .player-row {
        font-size: 1.25rem;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
    }
    :global(.player-row .floating-label input) {
        margin-bottom:0 !important;
        width: 8.125rem !important;
    }
</style>