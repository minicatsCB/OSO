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
    const winnerToken = calculateWinner(currentCells);
    const status = getStatus(winnerToken);

    function getNextPlayerToken(): string {
        return (xIsNext ? FIRST_PLAYER : SECOND_PLAYER);
    }

    function getStatus(winnerToken: string): string  {
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
        setHistory(updatedHistory);
        setCurrentMove(updatedHistory.length - 1);
    }

    function onBoardClick(index: number): void {
        if (isThereAWinner() || isCellFilled(index)) {
            return;
        }

        const updatedCells = currentCells.slice();
        updatedCells[index] = xIsNext ? FIRST_PLAYER : SECOND_PLAYER;
        updateHistory(updatedCells);
    }

    function jumpTo(move: number): void {
        setCurrentMove(move);
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