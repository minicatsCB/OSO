import { O_TOKEN, ROWS, S_TOKEN, WORD_SIZE } from "./constants";
import { Cell, Word } from "./models";

export function wordIsValid(word: Word): boolean {
// Check if the selection has the correct number of cells
  if (word.length !== WORD_SIZE) {
    return false; 
  }

  // Check if the tokens are in the correct order
  if (word[0].token !== O_TOKEN || word[1].token !== S_TOKEN || word[2].token !== O_TOKEN) {
    return false;
  }

  // Check if the cells are in the same row, column, or diagonal  
  const row = word[0].row;
  const col = word[0].col;

  let sameRow = true;
  let sameCol = true;
  let sameDiagonal1 = true; // Top-left to bottom-right
  let sameDiagonal2 = true; // Top-right to bottom-left

  for (let i = 1; i < word.length; i++) {
    if (word[i].row !== row) {
      sameRow = false;
    }
    if (word[i].col !== col) {
      sameCol = false;
    }
    if (word[i].row - word[i].col !== (row - col)) {
      sameDiagonal1 = false;
    }
    if ((word[i].row + word[i].col) !== (row + col)) {
      sameDiagonal2 = false;
    }
    if (!sameRow && !sameCol && !sameDiagonal1 && !sameDiagonal2) {
      return false;
    }
  }

// Check if the indices are consecutive in the same row, column, or diagonal
for (let i = 1; i < word.length; i++) {
  const currCell = word[i];
  const prevCell = word[i - 1];

  // Check if consecutive in the same row (both ascending and descending)
  if (currCell.col === prevCell.col + 1 || currCell.col === prevCell.col - 1) {
      continue;
  }

  // Check if consecutive in the same column (both ascending and descending)
  if (currCell.row === prevCell.row + 1 || currCell.row === prevCell.row - 1) {
      continue;
  }

  // Check if consecutive in the same diagonal (top-left to bottom-right, both ascending and descending)
  if (currCell.col === prevCell.col + 1 && currCell.row === prevCell.row + 1) {
      continue;
  }

  // Check if consecutive in the same diagonal (top-right to bottom-left, both ascending and descending)
  if (currCell.col === prevCell.col - 1 && currCell.row === prevCell.row - 1) {
      continue;
  }

  // If none of the conditions are met, return false
  return false;
}


  return true;
}

export function* wordMarker(): Generator<number, Word, Cell> {
  let clickedCells: Word = [];
  for (let i = 0; i < WORD_SIZE; i++) {
        let cell: Cell = yield i;
        if(!cell.index && cell.index !== 0) break;
        clickedCells.push(cell);
  }

  return clickedCells;
}

export function compareNumbers(a: number, b: number): number {
  return a - b;
}