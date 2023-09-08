export interface Score {
    name: string;
    points: number;
};
export type Scores = Array<Score>;

export enum GameStatus {
    INIT,
    TURN,
    ENDED
};