import styles from './Board.module.css';

function getBoardStyle(numRows: number, numCols: number) {
    return {
        width: '300px',
        height: '300px',
        display: 'grid',
        gridTemplateRows: `repeat(${numRows}, 1fr)`,
        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        gridGap: 2
    };
}

function generateGrid(rows: number, cols: number) {
    return new Array(rows).fill(0).map(() => new Array(cols).fill(0));
}

function Cell({text}: {[key: string]: string}) {
    return (
        <button type="button" className={styles.cell}>{text}</button>
    );
}

const ROWS_NUM :number = 3;
const COLS_NUM :number = 3;

export default function Board() {
    const grid = generateGrid(ROWS_NUM, COLS_NUM);
    const gridStyles = getBoardStyle(ROWS_NUM, COLS_NUM);

    return (
        <div className="container" style={gridStyles}>
            {grid.map((row, rowIdx) =>
                row.map((col, colIdx) => (
                    <Cell key={`${rowIdx}-${colIdx}`} text={`${rowIdx}-${colIdx}`} />
                ))
            )}
        </div>
    );
}