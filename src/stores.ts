import { localStore } from "./localStore";
import type { Player } from "./types";
import type { ScoreHistory } from "./types";

export const initialPlayers: Player[] = [
    {
        id: 0,
        name: "",
    },
];

export const initialScores: ScoreHistory = [
    [
        {
            id: 0,
            points: 0,
        },
    ],
];

export const initialRoundToEdit: number = 1;

export const players = localStore("score-keeper-players", initialPlayers);

export const scores = localStore("score-keeper-scores", initialScores);

export const roundToEdit = localStore(
    "score-keeper-roundToEdit",
    initialRoundToEdit
);
