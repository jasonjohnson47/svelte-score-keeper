import type { Round } from './types';

export function getPointsById(round: Round, playerId: number) {
    return round.filter(({id}) => id === playerId)[0].points;
}