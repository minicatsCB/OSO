import Info from './Info'
import Board from './Board'
import History from './History'
import { useState } from 'react';
import calculateWinner from '../core/algorithm';
import { COLS, FIRST_PLAYER, ROWS, SECOND_PLAYER } from '../core/constants';
import GameContext from '../core/gameContext';

export default function Game() {
    const [history, setHistory] = useState(Array(9).fill([]));
    const [currentMove, setCurrentMove] = useState(0);
    
    const cells: Array<string> = history[currentMove];
    const xIsNext: boolean = currentMove % 2 === 0;
    const nextPlayer: string = xIsNext ? FIRST_PLAYER : SECOND_PLAYER;
    const winner: string = calculateWinner(cells);
    const status: string = winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`;
    const historyLength: number = history.every(record => record.length === 0) ? 0 : history.length;
    
    function isCellFilled(index: number): boolean {
        return !!cells[index];
    }

    function updateHistory(index: number): void {
        const updatedCells: Array<string> = cells.slice();
        updatedCells[index] = nextPlayer;

        const updatedHistory: Array<Array<string>> = history.slice(0, currentMove + 1);
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
                value={cells}
            >
                <h1>OSO game</h1>
                <Info status={status} />
                <Board rows={ROWS} cols={COLS} onPlay={handlePlay} />
                <History length={historyLength} onJump={handleJump} />
            </GameContext.Provider>
        </>
    );
}