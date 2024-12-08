import { O_TOKEN, S_TOKEN, WORD_SIZE } from "./constants";
import { Cell, Word } from "./models";

/**
 * Checks if the given word is valid based on the following criteria:
 * - The word must have the correct number of cells (WORD_SIZE).
 * - The tokens must be in the correct order ('O', 'S', 'O').
 * - The cells must be aligned in the same row, column, or diagonal.
 * 
 * @param {Word} word - An array of Cell objects representing the word.
 * @returns {boolean} - Returns `true` if the word is valid, otherwise `false`.
 */
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

/**
 * A generator function that yields the current state of the word being formed.
 * 
 * Keeps track of the cells that have been clicked in order to form a word.
 * It yields the current state of the word each time a new cell is added.
 * 
 * @yields {Word} - The current state of the word being formed.
 */
export function* wordMarker(): Generator<number, Word, Cell> {
  let clickedCells: Word = [];
  for (let i = 0; i < WORD_SIZE; i++) {
        let cell: Cell = yield i;
        if(!cell.index && cell.index !== 0) break;
        clickedCells.push(cell);
  }

  return clickedCells;
}

/**
 * Compares two numbers and returns a value indicating their relative order.
 * 
 * This function is used as a comparator for sorting numbers in ascending order.
 * 
 * @param {number} a - The first number to compare.
 * @param {number} b - The second number to compare.
 * @returns {number} - Returns a negative value if `a` is less than `b`, zero if they are equal, and a positive value if `a` is greater than `b`.
 */
export function compareNumbers(a: number, b: number): number {
  return a - b;
}