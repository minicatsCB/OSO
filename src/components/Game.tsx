import Scoreboard from './Scoreboard'
import Board from './Board'
import { useState } from 'react';
import { compareNumbers, markIsValid, wordMarker } from '../core/algorithm';
import { COLS, FIRST_PLAYER_NAME, O_TOKEN, ROWS, SECOND_PLAYER_NAME, S_TOKEN } from '../core/constants';
import TurnButton from './TurnButton';
import MarkButton from './MarkButton';
import EndGameButton from './EndGameButton';
import { Cell, Mark, GameStatus, Player, Scores } from '../core/models';
import Status from './Status';
import { ArraySet } from '../core/ArraySet';

let generator = wordMarker();
generator.next();

export default function Game() {
    const [cells, setCells] = useState<Array<Cell>>(Array(ROWS * COLS).fill(null));
    const [marks, setMarks] = useState<ArraySet<Mark>>(new ArraySet<Mark>());
    const [activePlayer, setActivePlayer] = useState(FIRST_PLAYER_NAME);
    const [status, setStatus] = useState<GameStatus>(GameStatus.TURN);
    const [scores, setScores] = useState<Scores>([{name: FIRST_PLAYER_NAME, points: 0}, {name: SECOND_PLAYER_NAME, points: 0}]);
    const [canMark, setCanMark] = useState<boolean>(false);
    
    const message: string = getMessage(status);
    
    function isCellFilled(index: number): boolean {
        return !!cells[index];
    }

    function updateCells(index: number, token: string): void {
        const newCells = [...cells];
        newCells[index] = token;
        setCells(newCells);
    }

    function updateMarks(newMark: Mark): void {
        const newMarks: ArraySet<Mark> = new ArraySet();
        for (const mark of marks.values()) {
            newMarks.add(mark.sort(compareNumbers));
        }
        newMarks.add(newMark.sort(compareNumbers));
        setMarks(newMarks);
    }

    function markExists(mark: Mark): boolean {
        return marks.has(mark.sort(compareNumbers));
    }

    function updatePlayerScoreBy(playerName: string, increment: number): void {
        let updatedScores = [...scores]
        const foundIdx = updatedScores.findIndex(s => s.name === playerName);
        if(foundIdx !== -1) {
            updatedScores[foundIdx].points = updatedScores[foundIdx].points + increment;
        }
        setScores(updatedScores)
    }

    function isADraw(): boolean {
        return scores.every(s => s.points === scores[0].points);
    }

    function getWinner(): string {
       return scores.reduce((a: Player, b: Player) => a.points >= b.points ? a : b ).name;
    }

    function getMessage(type: GameStatus): string {
        let message: string = "";
        switch (type) {
            case GameStatus.TURN:
                message = `It's ${activePlayer}'s turn`;
                break;
            case GameStatus.ENDED:
                if(isADraw()) {
                    message = "It's a draw!";
                } else {
                    message = `Winner is ${getWinner()}!`;
                }
                break;
        }

        return message;
    }

    function handlePlay(index: number, timesClicked: number): void {
        if(status === GameStatus.ENDED) {
            return;
        }

        if(canMark) {
            let markIndices = generator.next(index);
            if (!markIndices.done) {
                // We expect another click. Do nothing.
            } else if (markIndices.value) {
                const markTokens = markIndices.value.map(cellIdx => cells[cellIdx]);
                const isValid = !markExists(markIndices.value) && markIsValid(markTokens);
                if (isValid) {
                    updateMarks(markIndices.value);
                    updatePlayerScoreBy(activePlayer, 1);
                }
                resetMarker();
            }
        } else {
            if (isCellFilled(index)) {
                return;
            }

            const token = timesClicked > 1 ? S_TOKEN : O_TOKEN;
            updateCells(index, token);
        }
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
        setStatus(GameStatus.ENDED);
    }

    function resetMarker(): void {
        generator = wordMarker();
        generator.next();
    }

    return (
        <>
            <h1>OSO game</h1>
            <div className="commands">
                <TurnButton onClick={switchTurn} isDisabled={canMark}></TurnButton>
                <MarkButton onClick={toggleMarker}></MarkButton>
                <EndGameButton onClick={endGame}></EndGameButton>
            </div>
            <Status message={message}/>
            <Scoreboard scores={scores} />
            <Board rows={ROWS} cols={COLS} values={cells} isDisabled={status === GameStatus.ENDED} onPlay={handlePlay} />
        </>
    );
}