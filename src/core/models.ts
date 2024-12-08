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

export type Mark = Array<number>;
export interface Coordinate {
    x: number;
    y: number;
};

export type Word = Array<Cell>;

export interface Cell {
    id?: number;
    index: number;
    row: number;
    col: number;
    token: string;
}
