export function markIsValid(markedCells: Array<string>): boolean {
    if (markedCells.length !== 3) {
      return false; 
    }
    return (markedCells[0] === 'O' && markedCells[1] === 'S' && markedCells[2] === 'O');
}

export function* wordMarker(): Generator<number, Array<number>, number> {
  const wordSize = 3;
  let clickedCells: Array<number> = [];
  for (let i = 0; i < wordSize; i++) {
        let cellIdx: number = yield i;
        if(!cellIdx && cellIdx !== 0) break;
        clickedCells.push(cellIdx);
  }

  return clickedCells;
}