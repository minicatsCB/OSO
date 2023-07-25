import Info from './Info'
import Board from './Board'
import History from './History'
import { useState } from 'react';
import { markIsValid, wordMarker } from '../core/algorithm';
import { COLS, FIRST_PLAYER_NAME, O_TOKEN, ROWS, SECOND_PLAYER_NAME, S_TOKEN } from '../core/constants';
import GameContext from '../core/gameContext';
import TurnButton from './TurnButton';
import MarkButton from './MarkButton';
import EndGameButton from './EndGameButton';
import { Scores } from '../core/models';

  let generator = wordMarker();
  generator.next();

export default function Game() {
    const [history, setHistory] = useState(Array(9).fill([]));
    const [currentMove, setCurrentMove] = useState(0);
    const [activePlayer, setActivePlayer] = useState(FIRST_PLAYER_NAME);
    const [scores, setScores] = useState<Scores>({[FIRST_PLAYER_NAME]: 0, [SECOND_PLAYER_NAME]: 0});
    const [canMark, setCanMark] = useState<boolean>(false);
    
    const cells: Array<string> = history[currentMove];
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

    function updatePlayerScoreBy(playerName: string, increment: number): void {
        let updatedScores = {...scores}
        updatedScores[playerName] = updatedScores[playerName] + increment;
        setScores(updatedScores)
    }

    function handlePlay(index: number, timesClicked: number): void {
        if(canMark) {
            let clickedCells = generator.next(index);
            if (!clickedCells.done) {
                // We expect another click. Do nothing.
            } else if (clickedCells.value) {
                const cellsContent = clickedCells.value.map(cellIdx => cells[cellIdx]);
                const isValid = markIsValid(cellsContent);
                if (isValid) {
                    updatePlayerScoreBy(activePlayer, 1);
                }
                resetMarker();
            }
        } else {
            if (isCellFilled(index)) {
                return;
            }

            const token = timesClicked > 1 ? S_TOKEN : O_TOKEN;
            updateHistory(index, token);
        }
    }

    function handleJump(move: number): void {
        setCurrentMove(move);
    }

    function switchTurn(): void {
        setActivePlayer(activePlayer === FIRST_PLAYER_NAME ? SECOND_PLAYER_NAME : FIRST_PLAYER_NAME);
    }

    function toggleMarker(): void {
        if(canMark) {
            resetMarker();
        }
        setCanMark(!canMark);
    }

    function endGame(): void {
        // prevent board from being clicked
        // calculate winner
        // show winner
        throw Error("method not implemented");
    }

    function resetMarker(): void {
        generator = wordMarker();
        generator.next();
    }

    return (
        <>
            <GameContext.Provider
                value={cells}
            >
                <h1>OSO game</h1>
                <div className="commands">
                    <TurnButton onClick={switchTurn} isDisabled={canMark}></TurnButton>
                    <MarkButton onClick={toggleMarker}></MarkButton>
                    <EndGameButton onClick={endGame}></EndGameButton>
                </div>
                <Info activePlayer={activePlayer} scores={scores} />
                <Board rows={ROWS} cols={COLS} onPlay={handlePlay} />
                <History length={historyLength} onJump={handleJump} />
            </GameContext.Provider>
        </>
    );
}