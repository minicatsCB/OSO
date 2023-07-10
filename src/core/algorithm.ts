export function markIsValid(markedCells: Array<string>) {
    if (markedCells.length !== 3) return;
    return (markedCells[0] === 'O' && markedCells[1] === 'S' && markedCells[2] === 'O');
}

export function* wordMarker(): Generator<number, Array<number>, number> {
  const wordSize = 3;
  let clickedCells: Array<number> = [];
  for (let i = 0; i <= (wordSize - 1); i++) {
        let cellIdx: number = yield i;
        if(!cellIdx && cellIdx !== 0) break;
        clickedCells.push(cellIdx);
  }

  return clickedCells;
}

export default function calculateWinner(cells: Array<string>): string {
    const winLines: Array<Array<number>> = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i: number = 0; i < winLines.length; i++) {
      const [a, b, c]: Array<number> = winLines[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
    return '';
  }