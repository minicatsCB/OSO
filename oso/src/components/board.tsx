import styled from 'styled-components'

const ROWS_NUM :number = 3;
const COLS_NUM :number = 3;

const Grid = styled.div`
    width: 300px;
    height: 300px;
    display: grid;
    grid-template-rows: repeat(${ROWS_NUM}, 1fr);
    grid-template-columns: repeat(${COLS_NUM}, 1fr);
    gridGap: 2;
`;

const StyledCell = styled(Cell)`
    background-color: white;
`;

function generateGrid(rows: number, cols: number) {
    return new Array(rows).fill(0).map(() => new Array(cols).fill(0));
}

function Cell({className, text}: {[key: string]: string}) {
    return (
        <button type="button" className={className}>{text}</button>
    );
}

export default function Board() {
    const grid = generateGrid(ROWS_NUM, COLS_NUM);

    return (
        <Grid className="container">
            {grid.map((row, rowIdx) =>
                row.map((col, colIdx) => (
                    <StyledCell key={`${rowIdx}-${colIdx}`} text={`${rowIdx}-${colIdx}`}></StyledCell>
                ))
            )}
        </Grid>
    );
}