<script lang="ts">
    import { players } from '../stores';
	import { scores } from '../stores';
    import { roundToEdit } from '../stores';
    import { getPointsById } from '../utils';
    import { getAccumulativeScoreById } from '../utils';

    function editRound(index: number) {
        roundToEdit.set(index + 1);
        document.location.hash = 'edit-round';
    }

    function goToCurrentRound() {
        roundToEdit.set($scores.length + 1);
        document.location.hash = 'current-round';
    }
</script>

<h1>Scoring History</h1>

<div class="nav-buttons">
    <button
        type="button"
        class="btn btn-secondary"
        on:click="{goToCurrentRound}"
    >Back to Current Round</button>
    <a href="#game-setup" class="btn btn-secondary">Start New Game</a>
</div>

{#each $scores as round, index}
<section class="container-fluid">
    <div class="row round-heading">
        <div class="col">
            <h2>Round {index + 1}</h2>
        </div>
        <div class="col-auto">
            <button
                type="button"
                class="btn btn-sm btn-primary"
                on:click="{() => { editRound(index) }}"
            >Edit <span class="sr-only">Round {index + 1}</span></button>
        </div>
    </div>
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

<div class="nav-buttons">
    <button
        type="button"
        class="btn btn-primary"
        on:click="{goToCurrentRound}"
    >Back to Current Round</button>
</div>

<style>
    .round-heading {
        padding: 0.5rem;
    }
    .round-heading h2 {
        margin: 0;
        color: #bacc4c;
    }
    table {
        width:100%;
        border-collapse: collapse;
        margin-bottom: 1.5rem;
    }
    th,
    td {
        border-top:1px solid rgba(255,255,255,0.1);
        padding: 0.75rem;
        text-align: right;
    }
    th:first-child,
    td:first-child {
        text-align: left;
    }
    th {
        background-color: #1f2428;
        color: #fff;
    }
    th[scope="row"] {
        background-color: transparent;
        font-weight:400;
        color: #d4d9de;
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
</style>