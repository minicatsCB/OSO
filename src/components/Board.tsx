import styled from 'styled-components'
import Cell from './Cell';

const StyledGrid = styled.div<{ $rowsNum: number; $colsNum: number; }>`
  position: relative;
  z-index: 1000;
  opacity: 50%;
  width: 300px;
  height: 300px;
  margin-bottom: 32px;
  display: grid;
  grid-template-rows: repeat(${props => props.$rowsNum}, 1fr);
  grid-template-columns: repeat(${props => props.$colsNum}, 1fr);
  grid-gap: 2px;
`;

function generateGrid(rows: number, cols: number): Array<Array<string>> {
    return new Array(rows).fill(0).map(() => new Array(cols).fill(0));
}

export default function Board({rows, cols, isDisabled, onPlay} : any) {
    const grid: Array<Array<string>> = generateGrid(rows, cols);

    return (
        <StyledGrid data-testid="board" $rowsNum={rows} $colsNum={cols} className="container">
            {grid.map((row: Array<string>, rowIdx: number) =>
                row.map((col: string, colIdx: number) => {
                    const cellIdx: number = (rowIdx * cols) + colIdx;
                    return (
                        <Cell
                            key={`${rowIdx}-${colIdx}`}
                            index={cellIdx}
                            onClick={onPlay}
                            isDisabled={isDisabled}>
                        </Cell>
                    )
                })
            )}
        </StyledGrid>
    );
}