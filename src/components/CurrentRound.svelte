<script lang="ts">
    import { players } from '../stores';
	import { scores } from '../stores';
    import { roundToEdit } from '../stores';
    import { getTotalScoreById } from '../utils';
    import type { Round } from '../types';
    import FloatingLabelInput from './FloatingLabelInput.svelte';

    let playerOperations = $players.reduce((acc, currPlayer) => {
        return {...acc, ['player-' + currPlayer.id]: 'add'};
    }, {});

    let playerPoints = $players.reduce((acc, currPlayer) => {
        return {...acc, ['player-' + currPlayer.id]: null};
    }, {});

    let thisRoundScores: Round;
    $: thisRoundScores = $players.map((player) => {

        function calcPoints(operation: string, points: number) {
            let operationValue = operation === 'add' ? 1 : -1;
            return points * operationValue;
        }

        return {
            id: player.id,
            points: calcPoints(playerOperations['player-' + player.id], playerPoints['player-' + player.id])
        };
            
    });

    function submitRound() {

        if ($roundToEdit === 1) {
            // round 1
            scores.set([thisRoundScores]);
        } else {
            // round 2+
            scores.set([...$scores, thisRoundScores]);
        }

        for (const property in playerOperations) {
            playerOperations[property] = 'add';
        }

        for (const property in playerPoints) {
            playerPoints[property] = null;
        }

        roundToEdit.set($roundToEdit + 1);
    }
</script>

<h1>Round {$roundToEdit}</h1>
<div>
    <a class="btn btn-primary" href="#history">View Scoring History</a>
    <a class="btn btn-primary" href="#game-setup">Start New Game</a>
</div>
<form action="">
    <section>
        <h2>Score Card</h2>

        <ul>
            {#each $players as player (player.id)}
            <li>
                <dl>
                    <dt>{player.name} <span class="sr-only">score</span></dt>
                    <dd>{getTotalScoreById($scores, player.id)}</dd>
                </dl>
                <div role="group" aria-label="points this round">
                    <fieldset class="add-sub-btn">
                        <legend class="sr-only">Add or Subtract</legend>
                        <div>
                            <input
                                type="radio"
                                id="add-{player.id}"
                                name={'player-' + player.id + 'operation'}
                                bind:group={playerOperations['player-' + player.id]}
                                value={'add'}
                            >
                            <label for="add-{player.id}" class="btn btn-primary"><span aria-label="add">-</span></label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="subtract-{player.id}"
                                name={'player-' + player.id + 'operation'}
                                bind:group={playerOperations['player-' + player.id]}
                                value={'subtract'}
                            >
                            <label for="subtract-{player.id}" class="btn btn-primary"><span aria-label="subtract">+</span></label>
                        </div>
                    </fieldset>
                    <div>
                        <FloatingLabelInput
                            id="points-{player.id}"
                            label="Points"
                            type={'number'}
                            min="0"
                            bind:value={playerPoints['player-' + player.id]}
                        />
                        <!--<label for="points-{player.id}">Points</label>
                        <input
                            type="number"
                            min="0"
                            id="points-{player.id}"
                            name="points-{player.id}"
                            bind:value={playerPoints['player-' + player.id]}
                        >-->
                    </div>
                </div>
            </li>
            {/each}
        </ul>
    </section>
    <div>
        <button type="button" class="btn btn-block btn-primary" on:click="{submitRound}">Submit Round</button>
    </div>
</form>
<style>
    .add-sub-btn {
        padding: 0;
        border: 0 none;
        margin: 0;
    }
    .add-sub-btn input {
        position: absolute;
        clip: rect(0, 0, 0, 0);
        pointer-events: none;
    }
    .add-sub-btn label {
        /* undo sr-only */
        position: static;
        width: auto;
        min-width: 1.375rem;
        height: auto;
        padding: 0.6875rem;
        margin: 0;
        overflow: visible;
        clip: auto;
        white-space: nowrap;
        border: 1px solid rgba(255, 255, 255, 0.5);
    }
    .add-sub-btn label span {
        display: inline-block;
        min-width: 1.5rem;
    }
    .add-sub-btn :checked + label {
        /* sr-only */
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    .add-sub-btn:focus-within label {
        background-color: #dce5a5;
        border-color: #fff;
        color: #212529;
        box-shadow: 0 0 0 0.1875rem rgba(186, 204, 76, 0.5) !important;
    }
</style>