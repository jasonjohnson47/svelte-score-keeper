<script lang="ts">
    import { players } from '../stores';
	import { scores } from '../stores';
    import { roundToEdit } from '../stores';
    import { getPointsById } from '../utils';
    import { getAccumulativeScoreById } from '../utils';

    function editRound(index: number) {
        roundToEdit.set(index);
        document.location.hash = 'edit-round';
    }
</script>

<h1>Scoring History</h1>

{#each $scores as round, index}
<section>
    <h2>Round {index + 1}</h2>
    <button type="button" on:click="{() => { editRound(index) }}">Edit Round {index + 1}</button>
    <table>
        <thead>
            <tr>
                <th scope="col">Player</th>
                <th scope="col">Last</th>
                <th scope="col">Round</th>
                <th scope="col">Total</th>
            </tr>
        </thead>
        <tbody>
            {#each $players as player (player.id)}
            <tr>
                <th scope="row">{player.name}</th>
                <td>{getAccumulativeScoreById($scores, player.id, index - 1)}</td>
                <td>{getPointsById(round, player.id)}</td>
                <td>{getAccumulativeScoreById($scores, player.id, index)}</td>
            </tr>
            {/each}
        </tbody>
    </table>
</section>
{/each}

<div>
    <a href="#current-round">Back to Current Round</a>
    <a href="#game-setup">Start New Game</a>
</div>