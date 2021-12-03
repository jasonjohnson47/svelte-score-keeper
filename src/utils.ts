import type { Round } from "./types";
import type { ScoreHistory } from "./types";
import { players, scores, roundToEdit, initialPlayers, initialScores, initialRoundToEdit } from './stores';

export function getPointsById(round: Round, playerId: number) {
    return round.filter(({ id }) => id === playerId)[0].points;
}

export function getTotalScoreById(scores: ScoreHistory, playerId: number) {
    const totalScore: number = scores.reduce(function (
        acc: number,
        curr: Round
    ) {
        const playerScore = curr.find((score) => score.id === playerId);
        return (acc += playerScore.points);
    },
    0);
    return totalScore;
}

export function getAccumulativeScoreById(
    scores: ScoreHistory,
    playerId: number,
    roundNumber: number
) {
    let scoresUpToRound = scores.slice(0, roundNumber + 1);

    const totalScore: number = scoresUpToRound.reduce(function (
        acc: number,
        curr: Round
    ) {
        const playerScore = curr.find((score) => score.id === playerId);
        return (acc += playerScore.points);
    },
    0);
    return totalScore;
}

export function startNewGame() {
    players.set(initialPlayers);
    scores.set(initialScores);
    roundToEdit.set(initialRoundToEdit);
    document.location.hash = 'game-setup'
}