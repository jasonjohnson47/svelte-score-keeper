import { writable } from "svelte/store";
import { localStore } from "./localStore";
import type { Player } from "./types";
import type { ScoreHistory } from "./types";

export const roundToEdit = writable(0);

const initialPlayers: Player[] = [
    {
        id: 0,
        name: "",
    },
];

const initialScores: ScoreHistory = [
    [
        {
            id: 0,
            points: 0,
        },
    ],
];

export const players = localStore("score-keeper-players", initialPlayers);
export const scores = localStore("score-keeper-scores", initialScores);
