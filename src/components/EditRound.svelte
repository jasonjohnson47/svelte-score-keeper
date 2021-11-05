<script lang="ts">
    import { players } from '../stores';
	import { scores } from '../stores';
    import { roundToEdit } from '../stores';
    import { getPointsById } from '../utils';
    import type { Round } from '../types';

    const currentRoundScores: Round = $scores[$roundToEdit];
</script>

<h1>Edit Round {$roundToEdit + 1}</h1>

<form action="">
    <ul>
        {#each $players as player}
            <li>
                <label for="score-{player.id}">{player.name}</label>
                <input type="text" id="score-{player.id}" name="score-{player.id}" value="{getPointsById(currentRoundScores, player.id)}" aria-describedby="score-{player.id}-description">
                <span id="score-{player.id}-description" class="sr-only">{player.name}'s score in round {$roundToEdit + 1}</span>
            </li>
        {/each}
    </ul>
    <div>
        <button
            type="submit"
            on:click="{() => { document.location.hash = 'history'; }}"
        >Cancel</button>
        <button type="submit">Update Round</button>
    </div>
</form>
