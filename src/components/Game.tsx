import Info from './Info'
import Board from './Board'
import History from './History'
import { useState } from 'react';
import calculateWinner from '../core/algorithm';
import { COLS, FIRST_PLAYER_NAME, O_TOKEN, ROWS, SECOND_PLAYER_NAME, S_TOKEN } from '../core/constants';
import GameContext from '../core/gameContext';
import TurnButton from './TurnButton';
import MarkButton from './MarkButton';
import EndGameButton from './EndGameButton';

export default function Game() {
    const [history, setHistory] = useState(Array(9).fill([]));
    const [currentMove, setCurrentMove] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    
    const cells: Array<string> = history[currentMove];
    const winner: string = calculateWinner(cells);
    const nextPlayerName: string = xIsNext ? FIRST_PLAYER_NAME : SECOND_PLAYER_NAME;
    const status: string = winner ? `Winner: ${winner}` : `Next player: ${nextPlayerName}`;
    const historyLength: number = history.every(record => record.length === 0) ? 0 : history.length;
    
    function isCellFilled(index: number): boolean {
        return !!cells[index];
    }

    function updateHistory(index: number, token: string): void {
        const updatedCells: Array<string> = cells.slice();
        updatedCells[index] = token;

        const updatedHistory: Array<Array<string>> = history.slice(0, currentMove + 1);
        updatedHistory.push(updatedCells);

        setHistory(updatedHistory);
        setCurrentMove(updatedHistory.length - 1);   
    }

    function handlePlay(index: number, timesClicked: number): void {
        if (winner || isCellFilled(index)) {
            return;
        }

        const token = timesClicked > 1 ? S_TOKEN : O_TOKEN;
        updateHistory(index, token);
    }

    function handleJump(move: number): void {
        setCurrentMove(move);
    }

    function switchTurn(): void {
        setXIsNext(!xIsNext);
    }

    function markWord(): void {
        throw Error("method not implemented");
    }

    function endGame(): void {
        throw Error("method not implemented");
    }

    return (
        <>
            <GameContext.Provider
                value={cells}
            >
                <h1>OSO game</h1>
                <TurnButton onClick={switchTurn}></TurnButton>
                <MarkButton onClick={markWord}></MarkButton>
                <EndGameButton onClick={endGame}></EndGameButton>
                <Info status={status} />
                <Board rows={ROWS} cols={COLS} onPlay={handlePlay} />
                <History length={historyLength} onJump={handleJump} />
            </GameContext.Provider>
        </>
    );
}