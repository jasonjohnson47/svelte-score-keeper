<script lang="ts">
    import { players } from '../stores';
	import { scores } from '../stores';
    import { roundToEdit } from '../stores';
    import { getTotalScoreById } from '../utils';
    import type { Round } from '../types';

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

        roundToEdit.set($roundToEdit + 1);
    }
</script>

<h1>Round {$roundToEdit}</h1>
<div>
    <a href="#history">View Scoring History</a>
    <a href="#game-setup">Start New Game</a>
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
                    <fieldset>
                        <legend class="sr-only">Add or Subtract</legend>
                        <div>
                            <input
                                type="radio"
                                id="add-{player.id}"
                                name={'player-' + player.id + 'operation'}
                                bind:group={playerOperations['player-' + player.id]}
                                value={'add'}
                            >
                            <label for="add-{player.id}">Add</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="subtract-{player.id}"
                                name={'player-' + player.id + 'operation'}
                                bind:group={playerOperations['player-' + player.id]}
                                value={'subtract'}
                            >
                            <label for="subtract-{player.id}">Subtract</label>
                        </div>
                    </fieldset>
                    <div>
                        <label for="points-{player.id}">Points</label>
                        <input
                            type="number"
                            min="0"
                            id="points-{player.id}"
                            name="points-{player.id}"
                            bind:value={playerPoints['player-' + player.id]}
                        >
                    </div>
                </div>
            </li>
            {/each}
        </ul>
    </section>
    <div>
        <button type="submit" on:click="{submitRound}">Submit Round</button>
    </div>
</form>
