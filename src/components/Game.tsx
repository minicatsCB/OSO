import Scoreboard from './Scoreboard'
import Board from './Board'
import { useCallback, useEffect, useRef, useState } from 'react';
import { compareNumbers, wordIsValid, wordMarker } from '../core/algorithm';
import { COLS, FIRST_PLAYER_NAME, ROWS, SECOND_PLAYER_NAME } from '../core/constants';
import TurnButton from './TurnButton';
import MarkButton from './MarkButton';
import EndGameButton from './EndGameButton';
import { Cell, Mark, GameStatus, Player, Scores, Coordinate } from '../core/models';
import Status from './Status';
import { ArraySet } from '../core/ArraySet';
import './Game.css';

let generator = wordMarker();
generator.next();

export default function Game() {
    const [cells, setCells] = useState<Array<Cell>>([]);
    const [marks, setMarks] = useState<ArraySet<Mark>>(new ArraySet<Mark>());
    const [activePlayer, setActivePlayer] = useState(FIRST_PLAYER_NAME);
    const [status, setStatus] = useState<GameStatus>(GameStatus.TURN);
    const [scores, setScores] = useState<Scores>([{name: FIRST_PLAYER_NAME, points: 0}, {name: SECOND_PLAYER_NAME, points: 0}]);
    const [canMark, setCanMark] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement>({} as HTMLCanvasElement);

    /**
     * Draws the marks on the canvas
     * @returns {void}
     */
    const drawMarks = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.lineWidth = 10;
        ctx.strokeStyle = '#FF00E4';
        ctx.globalAlpha = 0.8;

        marks.values().forEach((mark) => {
            const coordinates: Array<Coordinate> = mark.map((cellIdx: number) => getCoordinates(cellIdx, canvas));
            if (coordinates.length > 1) {
                ctx.beginPath();
                const {x: startX, y: startY}: Coordinate = coordinates[0];
                ctx.moveTo(startX, startY);
                coordinates.slice(1).forEach(({x, y}: Coordinate) => ctx.lineTo(x, y));
                ctx.stroke();
            }
        });
    }, [marks]);

    useEffect(() => {
        setupCanvas();
        clearCanvas();
        drawMarks();
    }, [drawMarks]);

    /**
     * Sets the canvas width and height to match the parent container
     * @returns {void}
     */
    function setupCanvas(): void {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }

    /**
     * Clears the canvas
     * @returns {void}
     */
    function clearCanvas(): void {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    /**
     * Get the coordinates of the center of a cell respect to the canvas
     * @param cellIdx - The index of the cell
     * @param canvas - The canvas element
     * @returns {Coordinate} - The coordinates of the center of the cell respect to the canvas
     */
    function getCoordinates(cellIdx: number, canvas: HTMLCanvasElement): Coordinate {
        const rowIdx = Math.floor(cellIdx / COLS);
        const colIdx = cellIdx % COLS;
        const cellWidth = canvas.width / COLS;
        const cellHeight = canvas.height / ROWS;
        const x = (colIdx * cellWidth) + cellWidth / 2;
        const y = (rowIdx * cellHeight) + cellHeight / 2;
        return { x, y };
    }

    const message: string = getMessage(status);
    
    /**
     * Checks if a cell is already filled
     * @param index - The index of the cell to be checked
     * @returns `true` if the cell is filled, otherwise `false`
     */
    function isCellFilled(index: number): boolean {
        return !!cells[index];
    }

    /**
     * Add a new cell to the list of cells
     * @param cell - The cell to be added
     * @returns {void}
     */
    function updateCells(cell: Cell): void {
        const newCells = [...cells];
        newCells.push(cell);
        setCells(newCells);
    }

    /**
     * Add a new mark to the list of marks
     * @param newMark - An array of cell indices to be added
     * @returns {void}
     */
    function updateMarks(newMark: Mark): void {
        const newMarks: ArraySet<Mark> = new ArraySet();
        for (const mark of marks.values()) {
            newMarks.add(mark.sort(compareNumbers));
        }
        newMarks.add(newMark.sort(compareNumbers));
        setMarks(newMarks);
    }

    /**
     * Checks if any player already marked the given cells as a word
     * 
    * @param {Mark} mark - An array of cell indices to be checked.
    * @returns {boolean} - Returns `true` if the mark already exists, otherwise `false`.
    */
    function markExists(mark: Mark): boolean {
        return marks.has(mark.sort(compareNumbers));
    }

    /**
     * Updates the score of the player with the given name
     * @param playerName - The name of the player
     * @param increment - The amount to increment the score by
     * @returns {void}
     */
    function updatePlayerScoreBy(playerName: string, increment: number): void {
        let updatedScores = [...scores]
        const foundIdx = updatedScores.findIndex(s => s.name === playerName);
        if(foundIdx !== -1) {
            updatedScores[foundIdx].points = updatedScores[foundIdx].points + increment;
        }
        setScores(updatedScores)
    }

    /**
     * Checks if the game is a draw
     * @returns {boolean} - Returns `true` if the game is a draw, otherwise `false`.
     */
    function isADraw(): boolean {
        return scores.every(s => s.points === scores[0].points);
    }

    /**
     * Get the name of the player with the highest score
     * @returns {string} - The name of the player with the highest score
     */
    function getWinner(): string {
       return scores.reduce((a: Player, b: Player) => a.points >= b.points ? a : b ).name;
    }

    /**
     * Get the message to be displayed based on the game status
     * @param type - The game status
     * @returns {string} - The message to be displayed
     */
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

    /**
     * Handles the play event. The brain of the game. It controls when the player can play, mark a word, or end the game
     * @param cell - The cell that was clicked
     */
    function handlePlay(cell: Cell): void {
        if(status === GameStatus.ENDED) {
            return;
        }

        if(canMark) {
            let markedCells = generator.next(cell);
            if (!markedCells.done) {
                // We expect another click. Do nothing.
            } else if (markedCells.value) {
                const markIndices = markedCells.value.map(cell => cell.index);
                console.log({markIndices})
                const check1 = markExists(markIndices);
                const check2 = wordIsValid(markedCells.value);
                const isValid = !check1 && check2;
                if (isValid) {
                    updateMarks(markIndices);
                    updatePlayerScoreBy(activePlayer, 1);
                }
                resetMarker();
            }
        } else {
            if (isCellFilled(cell.index)) {
                return;
            }

            updateCells(cell);
        }
    }

    /**
     * Switches the turn to the next player
     */
    function switchTurn(): void {
        setActivePlayer(activePlayer === FIRST_PLAYER_NAME ? SECOND_PLAYER_NAME : FIRST_PLAYER_NAME);
    }

    /**
     * Toggles the marker on and off. When on, allows a player to mark a word on the board. When off, the player can play normally
     * @returns {void}
     */
    function toggleMarker(): void {
        if(canMark) {
            resetMarker();
        }
        setCanMark(!canMark);
    }

    /**
     * Ends the game
     * @returns {void}
     */
    function endGame(): void {
        setStatus(GameStatus.ENDED);
    }

    /**
     * Resets the marker. Neccesary for the player to mark a new word
     * @returns {void}
     */
    function resetMarker(): void {
        generator = wordMarker();
        generator.next();
    }

    return (
        <>
            <h1 className="title">OSO game</h1>
            <Status message={message}/>
            <Scoreboard scores={scores} />
            <div className="game-container" style={{ position: 'relative' }}>
                <Board rows={ROWS} cols={COLS} isDisabled={status === GameStatus.ENDED} onPlay={handlePlay} />
                <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '300px', height: '300px' }}></canvas>
            </div>
            <div className="commands">
                <TurnButton onClick={switchTurn} isDisabled={canMark && (status !== GameStatus.ENDED)}></TurnButton>
                <MarkButton onClick={toggleMarker} isActive={canMark && (status !== GameStatus.ENDED)}></MarkButton>
                <EndGameButton onClick={endGame}></EndGameButton>
            </div>
        </>
    );
}