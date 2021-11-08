export type Player = {
    id: number;
    name: string;
};
export type Score = {
    id: number;
    points: number;
};
export type Round = Score[];
export type ScoreHistory = Round[];

export type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };
