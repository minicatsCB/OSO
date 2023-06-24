import Info from './Info'
import Board from './Board'
import { createContext, useState } from 'react';

export const GameContext = createContext<Array<string>>([]);

const ROWS : number = 3;
const COLS : number = 3;

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [cells, setCells] = useState(Array(ROWS*COLS).fill(null));

    const winnerToken = calculateWinner(cells);
    const status = getStatus(winnerToken);

    function getNextPlayerToken(): string {
        return (xIsNext ? 'X' : 'O');
    }

    function getStatus(winnerToken: string | null): string  {
        if (winnerToken) {
            return 'Winner: ' + winnerToken;
        } else {
            return 'Next player: ' + getNextPlayerToken();
        }
    }

    function isCellFilled(index: number): boolean {
        return !!cells[index];
    }

    function isThereAWinner(): boolean {
        return !!winnerToken ;
    }

    function onBoardClick(index: number): void {
        if (isThereAWinner() || isCellFilled(index)) {
            return;
        }

        const updatedCells = cells.slice();
        updatedCells[index] = xIsNext ? 'X' : 'O';
        setCells(updatedCells);

        setXIsNext(!xIsNext);
    }

    return (
        <>
            <GameContext.Provider
                value={cells}
            >
                <h1>OSO game</h1>
                <Info status={status} />
                <Board rows={ROWS} cols={COLS} onClick={onBoardClick} />
            </GameContext.Provider>
        </>
    );
}

function calculateWinner(cells: Array<string>): string | null {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
    return null;
  }