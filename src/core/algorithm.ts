import { O_TOKEN, ROWS, S_TOKEN, WORD_SIZE } from "./constants";
import { Word } from "./models";

export function markIsValid(markedCells: Array<string>): boolean {
    if (markedCells.length !== WORD_SIZE) {
      return false; 
    }
    return (markedCells[0] === O_TOKEN && markedCells[1] === S_TOKEN && markedCells[2] === O_TOKEN);
}

export function wordIsValid(cellSelection: Word): boolean {
// Check if the selection has the correct number of cells
  if (cellSelection.length !== WORD_SIZE) {
    return false; 
  }

  // Check if the tokens are in the correct order
  if (cellSelection[0].token !== O_TOKEN || cellSelection[1].token !== S_TOKEN || cellSelection[2].token !== O_TOKEN) {
    return false;
  }

  // Check if the indices are in the same row and do not wrap to the next line
  const row = Math.floor(cellSelection[0].index / ROWS);
  for (let i = 1; i < cellSelection.length; i++) {
    if (Math.floor(cellSelection[i].index / ROWS) !== row) {
      return false;
    }
  }

  // Check if the indices are consecutive
  for (let i = 1; i < cellSelection.length; i++) {
      if (cellSelection[i].index !== cellSelection[i - 1].index + 1) {
          return false;
      }
  }

  return true;
}

export function* wordMarker(): Generator<number, Array<number>, number> {
  let clickedCells: Array<number> = [];
  for (let i = 0; i < WORD_SIZE; i++) {
        let cellIdx: number = yield i;
        if(!cellIdx && cellIdx !== 0) break;
        clickedCells.push(cellIdx);
  }

  return clickedCells;
}

export function compareNumbers(a: number, b: number): number {
  return a - b;
}