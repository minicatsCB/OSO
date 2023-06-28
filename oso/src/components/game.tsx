import Info from './Info'
import Board from './Board'
import History from './History'
import { createContext, useState } from 'react';

export const GameContext = createContext<Array<string>>([]);

const ROWS : number = 3;
const COLS : number = 3;

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState(Array().fill(null));
    const [currentMove, setCurrentMove] = useState(0);

    const currentCells = history[currentMove] || [];
    const winnerToken = calculateWinner(currentCells);
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
        return !!currentCells[index];
    }

    function isThereAWinner(): boolean {
        return !!winnerToken ;
    }

    function updateHistory(updatedCells: Array<string>) {
        const updatedHistory = history.slice(0, currentMove + 1);
        updatedHistory.push(updatedCells);
        setCurrentMove(updatedHistory.length - 1);
        setHistory(updatedHistory);
    }

    function onBoardClick(index: number): void {
        if (isThereAWinner() || isCellFilled(index)) {
            return;
        }

        const updatedCells = currentCells.slice();
        updatedCells[index] = xIsNext ? 'X' : 'O';
        updateHistory(updatedCells);
        setXIsNext(!xIsNext);
    }

    function jumpTo(move: number): void {
        setCurrentMove(move);
        setXIsNext(move % 2 === 0);
    }

    return (
        <>
            <GameContext.Provider
                value={currentCells}
            >
                <h1>OSO game</h1>
                <Info status={status} />
                <Board rows={ROWS} cols={COLS} onClick={onBoardClick} />
                <History history={history} jumpTo={jumpTo} />
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