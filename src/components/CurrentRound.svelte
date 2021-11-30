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


<div class="nav-buttons">
    <a class="btn btn-secondary" href="#history">View Scoring History</a>
    <a class="btn btn-secondary" href="#game-setup">Start New Game</a>
</div>
<form action="">
    <section class="score-card">
        <h2>Score Card</h2>

        <ul class="container-fluid">
            {#each $players as player (player.id)}
            <li class="row player-row">
                <dl class="col">
                    <div class="row justify-content-between h-100 align-content-center">
                        <dt class="col">{player.name} <span class="sr-only">score</span></dt>
                        <dd class="col-auto">{getTotalScoreById($scores, player.id)}</dd>
                    </div>
                </dl>
                <div class="col-auto" role="group" aria-label="points this round">
                    <div class="row">
                        <fieldset class="col-auto add-sub-btn">
                            <legend class="sr-only">Add or Subtract</legend>
                            <div>
                                <input
                                    type="radio"
                                    id="add-{player.id}"
                                    name={'player-' + player.id + 'operation'}
                                    bind:group={playerOperations['player-' + player.id]}
                                    value={'add'}
                                >
                                <label for="add-{player.id}" class="btn btn-primary"><span aria-label="currently adding, click to subtract">-</span></label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="subtract-{player.id}"
                                    name={'player-' + player.id + 'operation'}
                                    bind:group={playerOperations['player-' + player.id]}
                                    value={'subtract'}
                                >
                                <label for="subtract-{player.id}" class="btn btn-primary"><span aria-label="currently subtracting, click to add">+</span></label>
                            </div>
                        </fieldset>
                        <div class="col-auto">
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
                        </div><!-- ./col -->
                    </div><!-- ./row -->
                </div><!-- ./col -->
            </li><!-- ./row -->
            {/each}
        </ul>
    </section>
    <div>
        <button type="button" class="btn btn-block btn-primary" on:click="{submitRound}">Submit Round</button>
    </div>
</form>
<style>
    .player-row {
        font-size: 1.25rem;
        border-bottom: 1px solid rgba(255,255,255,0.2);
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
    }
    .player-row dl {
        margin: 0;
    }
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
        border-radius: 1.8125rem / 50%;
    }
    .add-sub-btn label span {
        display: inline-block;
        min-width: 1.5rem;
        font-size: 1.625rem;
        line-height: 2.125rem;
        margin-left:5px;
        margin-right:5px;
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

    .nav-buttons {
        margin-bottom: 1rem;
    }
    .nav-buttons .btn {
        display: block;
        width:100%;
        margin-bottom: 0.5rem;
    }
    @media (min-width: 576px) {
        .nav-buttons .btn {
            display: inline-block;
            width:auto;
        }
    }
    

    :global(.player-row .floating-label input) {
        margin-bottom:0 !important;
        width: 8.125rem !important;
    }
</style>