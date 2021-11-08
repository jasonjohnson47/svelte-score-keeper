<script lang="ts">
    import { players } from '../stores';
    import { scores } from '../stores';

    function addPlayer() {

        /* If we want to use 'update', would need to modify localStore like we have for 'set' such that it saves to localStorage */

        /*players.update((currPlayers) => {
            return [...currPlayers, { 
                id: currPlayers.length,
                name: ''
            }];
        });*/
        /*scores.update((currScores) => {
            let newScores = currScores.map((scoreRound) => {
                return [...scoreRound, { 
                    id: scoreRound.length,
                    points: 0
                }];
            });
            return newScores;
        });*/
        players.set([...$players, { 
            id: $players.length,
            name: ''
        }]);
        scores.set(
            $scores.map((scoreRound) => {
                return [...scoreRound, {
                    id: scoreRound.length,
                    points: 0
                }]
            })
        );
    }

    function startGame() {
        document.location.hash = 'current-round';
    }

</script>

<h1>Who's Playing?</h1>

<ul>
    {#each $players as player}
        <li>
            <label for="name-{player.id}">Player Name</label>
            <input
                type="text"
                id="name-{player.id}"
                bind:value="{player.name}"
            >
        </li>
    {/each}
</ul>

<div>
    <button type="button" on:click="{addPlayer}">Add Player</button>
</div>

<div>
    <button type="button" on:click="{startGame}">Start Game</button>
</div>