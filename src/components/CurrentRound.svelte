<script lang="ts">
    import { players } from '../stores';
	import { scores } from '../stores';
    import { roundToEdit } from '../stores';
    import { getPointsById } from '../utils';
    import type { Round } from '../types';

    const currentRoundNumber = $scores.length;
    const currentRoundScores: Round = $scores[currentRoundNumber - 1];

    /*const thisRoundScores: Round = [
        {
            id: 0,
            points: -10
        },
        {
            id: 1,
            points: 20
        }
    ];*/

    const thisRoundScores: Round = $players.map((player) => ({
            id: player.id,
            points: 0
    }));

    /*function getPlayerRoundById(playerId: number) {
        // broken
        // get object for the score for the player with the same id
        return thisRoundScores.filter(({id}) => id === playerId);
    }*/

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
                    <dd>{getPointsById(currentRoundScores, player.id)}</dd>
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
                        <!-- bind:value={getPlayerRoundById(player.id).points} -->
                        <input
                            type="text"
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
