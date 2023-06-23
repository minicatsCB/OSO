import styled from 'styled-components'
import Cell from './Cell';

const StyledGrid = styled.div<{ $rowsNum: number; $colsNum: number; }>`
  width: 300px;
  height: 300px;
  display: grid;
  grid-template-rows: repeat(${props => props.$rowsNum}, 1fr);
  grid-template-columns: repeat(${props => props.$colsNum}, 1fr);
  grid-gap: 2px;
`;

function generateGrid(rows: number, cols: number) {
    return new Array(rows).fill(0).map(() => new Array(cols).fill(0));
}

export default function Board({rows, cols, onClick}: any) {
    const grid = generateGrid(rows, cols);

    return (
        <StyledGrid $rowsNum={rows} $colsNum={cols} className="container">
            {grid.map((row: any, rowIdx: number) =>
                row.map((col: any, colIdx: number) => {
                    const cellIdx = (rowIdx * cols) + colIdx;
                    return (
                        <Cell key={`${rowIdx}-${colIdx}`} index={cellIdx} onClick={() => onClick(cellIdx)}></Cell>
                    )
                })
            )}
        </StyledGrid>
    );
}