<script lang="ts">
    import { players, scores, roundToEdit, initialRoundToEdit } from '../stores';
    import { afterUpdate } from 'svelte';
    import FloatingLabelInput from './FloatingLabelInput.svelte';
	import { slide } from 'svelte/transition';
    import { cubicInOut } from 'svelte/easing';

    let playerList: HTMLElement;
    let highestPlayerId:number;
    let nameFields = {};

    function addPlayer() {
        players.set([...$players, { 
            id: highestPlayerId + 1,
            name: ''
        }]);
        scores.set(
            $scores.map((scoreRound) => {
                return [...scoreRound, {
                    id: highestPlayerId + 1,
                    points: 0
                }]
            })
        );
    }

    function deletePlayer(id: number) {
        players.set(
            $players.filter((player) => player.id !== id)
        );
        scores.set(
            $scores.map((scoreRound) => {
                return scoreRound.filter((score) => score.id !== id);
            })
        );
    }

    function validateForm() {
        let playerWithNoName = $players.find((player) => {
            return player.name === '';
        });

        if (playerWithNoName && nameFields['name-' + playerWithNoName.id]) {
            nameFields['name-' + playerWithNoName.id].hasError = true;
            nameFields['name-' + playerWithNoName.id].errorMsg = 'Player name is required';
            return false;
        } else {
            return true;
        }
    }

    function startGame() {
        if (validateForm()) {
            roundToEdit.set(initialRoundToEdit);

            const resetScores = $players.map((player) => {
                return {
                    id: player.id,
                    points: 0,
                }
            });

            scores.set([resetScores]);
            document.location.hash = 'current-round';
        }
    }

    function continueGame() {
        if (validateForm()) {
            document.location.hash = 'current-round';
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

        highestPlayerId = [...$players].sort((a, b) => b.id - a.id)[0].id;

        for (const field in nameFields) {
            if (nameFields[field] && nameFields[field].value !== '') {
                nameFields[field].hasError = null;
                nameFields[field].errorMsg = null;
            }
        }
    });

</script>

<h1>Who's Playing?</h1>
<ul class="list-unstyled player-list" bind:this={playerList}>
    {#each $players as player, index (player.id)}
        <li transition:slide="{{duration: 500, easing: cubicInOut}}">
            <FloatingLabelInput
                id={'name-' + player.id}
                label={'Player Name'}
                type={'text'}
                required={true}
                hasError={null}
                errorMsg={null}
                bind:this={nameFields['name-' + player.id]}
                bind:value={player.name}
            />
            {#if $players.length > 1 || index > 0}
                <button
                    type="button"
                    class="btn btn-delete"
                    on:click={() => { deletePlayer(player.id)}}
                >
                    <span class="sr-only">Delete Player</span>
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><!-- Font Awesome Free 5.15.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
                </button>
            {/if}
        </li>
    {/each}
</ul>
<button type="button" class="btn btn-block btn-primary" on:click="{addPlayer}">Add Player</button>
{#if $roundToEdit === 1}
<button type="button" class="btn btn-block btn-primary" on:click="{startGame}">Start Game</button>
{:else}
<button type="button" class="btn btn-block btn-primary" on:click="{continueGame}">Continue Game</button>
<button type="button" class="btn btn-block btn-primary" on:click="{startGame}">Start New Game</button>
{/if}


<style>
    .player-list li {
        position: relative;
    }
    .player-list .btn-delete {
        position: absolute;
        top:0.3125rem;
        right: 0.3125rem;
    }
    .btn-delete {
        padding:.6875rem;
        background-color:#24292e;
        border-color: rgba(255,255,255,0.25);
        color:#fff;
        box-shadow: 0 4px 0 0 rgba(0,0,0,0.25);
    }
    .btn-delete:hover {
        background-color: #494d51;
        border-color: #fff;
        color:#fff;
    }
    .btn-delete:focus {
        background-color: #494d51;
        border-color: #fff;
        color:#fff;
        box-shadow: 0 0 0 .1875rem rgba(255,255,255,0.3) !important;
    }
    .btn-delete svg {
        fill: #fff;
        display: block;
        width: 1.5rem;
        height: 1.5rem;
    }
</style>