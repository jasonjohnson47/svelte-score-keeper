import { localStore } from "./localStore";
import type { Player } from "./types";
import type { ScoreHistory } from "./types";

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

const initialRoundToEdit: number = 1;

export const players = localStore("score-keeper-players", initialPlayers);

export const scores = localStore("score-keeper-scores", initialScores);

export const roundToEdit = localStore(
    "score-keeper-roundToEdit",
    initialRoundToEdit
);
