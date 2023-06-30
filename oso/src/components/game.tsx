import Info from './Info'
import Board from './Board'
import History from './History'
import { createContext, useState } from 'react';

export const GameContext = createContext<Array<string>>([]);

const ROWS : number = 3;
const COLS : number = 3;

const  FIRST_PLAYER : string = 'X';
const  SECOND_PLAYER : string = 'O';

export default function Game() {
    const [history, setHistory] = useState(Array(9).fill([]));
    const [currentMove, setCurrentMove] = useState(0);
    
    const currentCells = history[currentMove];
    const xIsNext = currentMove % 2 === 0;
    const winner = calculateWinner(currentCells);
    const status = getStatus(winner);

    function getNextPlayerToken(): string {
        return (xIsNext ? FIRST_PLAYER : SECOND_PLAYER);
    }

    function getStatus(winner: string): string  {
        if (winner) {
            return `Winner: ${winner}`;
        } else {
            return `Next player: ${getNextPlayerToken()}`;
        }
    }

    function isCellFilled(index: number): boolean {
        return !!currentCells[index];
    }

    function updateHistory(index: number) {
        const updatedCells = currentCells.slice();
        updatedCells[index] = getNextPlayerToken();

        const updatedHistory = history.slice(0, currentMove + 1);
        updatedHistory.push(updatedCells);

        setHistory(updatedHistory);
        setCurrentMove(updatedHistory.length - 1);
    }

    function handlePlay(index: number): void {
        if (winner || isCellFilled(index)) {
            return;
        }
        updateHistory(index);
    }

    function handleJump(move: number): void {
        setCurrentMove(move);
    }

    return (
        <>
            <GameContext.Provider
                value={currentCells}
            >
                <h1>OSO game</h1>
                <Info status={status} />
                <Board rows={ROWS} cols={COLS} onPlay={handlePlay} />
                <History history={history} onJump={handleJump} />
            </GameContext.Provider>
        </>
    );
}

function calculateWinner(cells: Array<string>): string {
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
    return '';
  }