export interface Player {
    name: string;
    points: number;
};
export type Scores = Array<Player>;

export enum GameStatus {
    INIT,
    TURN,
    ENDED
};