<script lang="ts">
    import { players } from '../stores';
	import { scores } from '../stores';
    import { roundToEdit } from '../stores';
    import { getPointsById } from '../utils';
    import type { Round } from '../types';
    import FloatingLabelInput from './FloatingLabelInput.svelte';
    import AddSubtractToggle from './AddSubtractToggle.svelte';

    let playerOperations = $players.reduce((acc, currPlayer) => {
        return {...acc, ['player-' + currPlayer.id]: 'add'};
    }, {});

    const currentRoundScores: Round = $scores[$roundToEdit - 1];

    let updatedRoundPoints = $players.reduce((acc, currPlayer) => {
        return {...acc, ['player-' + currPlayer.id]: getPointsById(currentRoundScores, currPlayer.id)};
    }, {});

    let updatedRoundScores: Round;
    $: updatedRoundScores = $players.map((player) => {

        function calcPoints(operation: string, points: number) {
            let operationValue = operation === 'add' ? 1 : -1;
            return points * operationValue;
        }

        return {
            id: player.id,
            points: calcPoints(playerOperations['player-' + player.id], updatedRoundPoints['player-' + player.id])
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
                    <AddSubtractToggle 
                        id="{player.id.toString()}"
                        name={'player-' + player.id + '-operation'}
                        bind:group={playerOperations['player-' + player.id]}
                    />
                </div>
                <div class="col-auto">
                    <FloatingLabelInput
                        id="score-{player.id}"
                        label="Points"
                        type={'number'}
                        min="0"
                        ariaDescribedby="score-{player.id}-description"
                        bind:value={updatedRoundPoints['player-' + player.id]}
                    />
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