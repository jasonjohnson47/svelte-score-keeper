import type { Round } from "./types";
import type { ScoreHistory } from "./types";

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
