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

export type Cell = string;
export type Mark = Array<number>;
export interface Coordinate {
    x: number;
    y: number;
};
