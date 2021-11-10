<script lang="ts">
    import { players } from '../stores';
	import { scores } from '../stores';
    import { roundToEdit } from '../stores';
    import { getTotalScoreById } from '../utils';
    import type { Round } from '../types';

    const currentRoundNumber = $scores.length;

    const thisRoundScores: Round = $players.map((player) => ({
            id: player.id,
            points: 0
    }));

    /* why does this not work?

    We should get this to work so we are finding the points by the 'id' property in the score object rather than index position of the score object within the thisRoundScores array

    in html template below:
    bind:value={getPlayerRoundById(thisRoundScores, player.id).points}

    console.log(thisRoundScores);
    function getPlayerRoundById(round: Round, playerId: number) {
        // get object for the score for the player with the same id
        console.log(round.find((score) => score.id === playerId));
        return round.find((score) => score.id === playerId);
    }
    getPlayerRoundById(thisRoundScores, 1);
    */

    function submitRound() {
        scores.set([...$scores, thisRoundScores]);
        roundToEdit.set(currentRoundNumber);
    }
</script>

<h1>Round { currentRoundNumber }</h1>
<div>
    <a href="#history">View Scoring History</a>
    <a href="#game-setup">Start New Game</a>
</div>
<form action="">
    <section>
        <h2>Score Card</h2>

        <ul>
            {#each $players as player}
            <li>
                <dl>
                    <dt>{player.name} <span class="sr-only">score</span></dt>
                    <dd>{getTotalScoreById($scores, player.id)}</dd>
                </dl>
                <div role="group" aria-label="points this round">
                    <fieldset>
                        <legend class="sr-only">Add or Subtract</legend>
                        <div>
                            <input type="radio" id="add-{player.id}" name="add-{player.id}" value="add">
                            <label for="add-{player.id}">Add</label>
                        </div>
                        <div>
                            <input type="radio" id="subtract-{player.id}" name="subtract-{player.id}" value="subtract">
                            <label for="subtract-{player.id}">Subtract</label>
                        </div>
                    </fieldset>
                    <div>
                        <label for="points-{player.id}">Points</label>
                        <input
                            type="number"
                            id="points-{player.id}"
                            name="points-{player.id}"
                            bind:value={thisRoundScores[player.id].points}
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
