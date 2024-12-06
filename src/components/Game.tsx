import Scoreboard from './Scoreboard'
import Board from './Board'
import { useCallback, useEffect, useRef, useState } from 'react';
import { compareNumbers, markIsValid, wordMarker } from '../core/algorithm';
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

    function setupCanvas(): void {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }

    function clearCanvas(): void {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

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
    
    function isCellFilled(index: number): boolean {
        return !!cells[index];
    }

    function updateCells(cell: Cell): void {
        const newCells = [...cells];
        newCells.push(cell);
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

    function handlePlay(cell: Cell): void {
        if(status === GameStatus.ENDED) {
            return;
        }

        if(canMark) {
            let markIndices = generator.next(cell.index);
            if (!markIndices.done) {
                // We expect another click. Do nothing.
            } else if (markIndices.value) {
                const markTokens = markIndices.value.map(cellIdx => cells.filter(c => c.index === cellIdx)[0].token);
                const isValid = !markExists(markIndices.value) && markIsValid(markTokens);
                if (isValid) {
                    updateMarks(markIndices.value);
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