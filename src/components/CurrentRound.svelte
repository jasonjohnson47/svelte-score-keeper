<script lang="ts">
    import { afterUpdate } from 'svelte';
    import { players, scores, roundToEdit } from '../stores';
    import { getTotalScoreById, getAccumulativeScoreById } from '../utils';
    import type { Round } from '../types';
    import FloatingLabelInput from './FloatingLabelInput.svelte';
    import AddSubtractToggle from './AddSubtractToggle.svelte';
    import { animateNumber } from '../animateNumber';

    let playerList: HTMLElement;

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

    interface PointsFieldsType {
        [fieldId: string]: FloatingLabelInput
    }

    let pointsFields: PointsFieldsType = {};
    let hasError = false;

    function submitRound() {

        const isClean = Object.values(playerPoints).every((value) => value === null);
        
        if (isClean) {
            hasError = true;
            const firstEmptyPointsField: FloatingLabelInput = Object.values(pointsFields)[0];

            if (firstEmptyPointsField) {
                firstEmptyPointsField.hasError = true;
                firstEmptyPointsField.errorMsg = 'Please enter points';
            }

            return;
        }

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

        // reset any errors
        hasError = false;
        for (const field in pointsFields) {
            pointsFields[field].hasError = null;
            pointsFields[field].errorMsg = null;
        }

    }

    afterUpdate(() => {
        const allInputs = Array.from(playerList.querySelectorAll('input'));
        const firstEmptyInput: HTMLInputElement = allInputs.find((input) => {
            return input.value === '';
        });

        if (document.activeElement.nodeName !== 'INPUT' && firstEmptyInput) {
            firstEmptyInput.focus();
        }
    });
</script>

<h1 aria-live="polite" aria-atomic="true">Round {$roundToEdit}</h1>


<div class="nav-buttons">
    {#if $roundToEdit !== 1}
    <a class="btn btn-secondary" href="#history">View Scoring History</a>
    {/if}
    <a class="btn btn-secondary" href="#game-setup">Manage Players</a>
</div>

<section class="score-card">
    <h2>Score Card</h2>

    {#if hasError}
        <p class="error-message" role="alert">Please enter at least one player's points</p>
    {/if}

    <ul class="container-fluid" bind:this={playerList}>
        {#each $players as player (player.id)}
        <li class="row player-row">
            <dl class="col">
                <div class="row justify-content-between h-100 align-content-center">
                    <dt class="col">{player.name} <span class="sr-only">score</span></dt>
                    {#key getTotalScoreById($scores, player.id)}
                    <dd
                        class="col-auto"
                        in:animateNumber={
                            {
                                startValue: getAccumulativeScoreById($scores, player.id, $roundToEdit - 3),
                                endValue: (getTotalScoreById($scores, player.id))
                            }
                        }
                    >
                        {getTotalScoreById($scores, player.id)}
                    </dd>
                    {/key}
                </div>
            </dl>
            <div class="col-auto" role="group" aria-label="points this round">
                <div class="row">
                    <div class="col-auto pr-0">
                        <AddSubtractToggle 
                            id="{player.id.toString()}"
                            name={'player-' + player.id + '-operation'}
                            bind:group={playerOperations['player-' + player.id]}
                        />
                    </div>
                    <div class="col-auto">
                        <FloatingLabelInput
                            id="points-{player.id}"
                            label="Points"
                            type={'number'}
                            min="0"
                            hasError={null}
                            errorMsg={null}
                            ariaDescribedby="score-{player.id}-description"
                            bind:this={pointsFields['points-' + player.id]}
                            bind:value={playerPoints['player-' + player.id]}
                        />
                        <span id="score-{player.id}-description" class="sr-only">{player.name}'s points this round</span>
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
    :global(.error-message) {
        display: block;
        margin-left: 0.5rem !important;
        position: static !important;
        top: 0 !important;
    }
</style>