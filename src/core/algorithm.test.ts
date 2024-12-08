import { wordIsValid, wordMarker } from "./algorithm";
import { O_TOKEN, S_TOKEN } from "./constants";
import { Word } from "./models";

test('word is valid', () => {
    const validWords: Array<Word> = [
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 1, row: 0, col: 1, token: 'S' }, { index: 2, row: 0, col: 2, token: 'O' }],
        [{ index: 2, row: 0, col: 2, token: 'O' }, { index: 1, row: 0, col: 1, token: 'S' }, { index: 0, row: 0, col: 0, token: 'O' }],
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 4, row: 1, col: 0, token: 'S' }, { index: 8, row: 2, col: 0, token: 'O' }],
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 5, row: 1, col: 1, token: 'S' }, { index: 10, row: 2, col: 2, token: 'O' }],
        [{ index: 2, row: 0, col: 2, token: 'O' }, { index: 1, row: 0, col: 1, token: 'S' }, { index: 0, row: 0, col: 0, token: 'O' }],
        [{ index: 8, row: 2, col: 0, token: 'O' }, { index: 4, row: 1, col: 0, token: 'S' }, { index: 0, row: 0, col: 0, token: 'O' }],
        [{ index: 10, row: 2, col: 2, token: 'O' }, { index: 5, row: 1, col: 1, token: 'S' }, { index: 0, row: 0, col: 0, token: 'O' }],
        [{ index: 3, row: 0, col: 3, token: 'O' }, { index: 6, row: 1, col: 2, token: 'S' }, { index: 9, row: 2, col: 1, token: 'O' }],
        [{ index: 7, row: 1, col: 3, token: 'O' }, { index: 10, row: 2, col: 2, token: 'S' }, { index: 13, row: 3, col: 1, token: 'O' }],
        [{ index: 13, row: 3, col: 1, token: 'O' }, { index: 10, row: 2, col: 2, token: 'S' }, { index: 7, row: 1, col: 3, token: 'O' }],
    ];

    for (const word of validWords) {
        expect(wordIsValid(word)).toBe(true);   
    }
});

test('word is invalid because of tokens', () => {
    const invalidWords: Array<Word> = [
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 1, row: 0, col: 1, token: 'O' }, { index: 2, row: 0, col: 2, token: 'O' }],
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 1, row: 0, col: 1, token: 'O' }, { index: 2, row: 0, col: 2, token: 'S' }],
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 1, row: 0, col: 1, token: 'S' }, { index: 2, row: 0, col: 2, token: 'S' }],
        [{ index: 0, row: 0, col: 0, token: 'S' }, { index: 1, row: 0, col: 1, token: 'O' }, { index: 2, row: 0, col: 2, token: 'O' }],
        [{ index: 0, row: 0, col: 0, token: 'S' }, { index: 1, row: 0, col: 1, token: 'O' }, { index: 2, row: 0, col: 2, token: 'S' }],
        [{ index: 0, row: 0, col: 0, token: 'S' }, { index: 1, row: 0, col: 1, token: 'S' }, { index: 2, row: 0, col: 2, token: 'O' }],
        [{ index: 0, row: 0, col: 0, token: 'S' }, { index: 1, row: 0, col: 1, token: 'S' }, { index: 2, row: 0, col: 2, token: 'S' }],
    ];
    for (const word of invalidWords) {
        expect(wordIsValid(word)).toBe(false);   
    }
});

test('word is invalid because of indices', () => {
    // TODO: Assume a 4x4 grid. This test will fail if the ROWS constant is changed. Find a way to make this test independent of ROWS or set ROWS to 4 in this test.
    const invalidWords: Array<Word> = [
        // rows (ordinary and reverse order)
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 1, row: 0, col: 1, token: 'S' }, { index: 3, row: 0, col: 3, token: 'O' }],    // skipped indices in the same row
        [{ index: 3, row: 0, col: 3, token: 'O' }, { index: 1, row: 1, col: 0, token: 'S' }, { index: 0, row: 0, col: 0, token: 'O' }],    // skipped indices in the same row in reverse order
        [{ index: 1, row: 0, col: 1, token: 'O' }, { index: 3, row: 0, col: 3, token: 'S' }, { index: 2, row: 0, col: 2, token: 'O' }],    // indices in incorrect order in the same row
        [{ index: 2, row: 0, col: 2, token: 'O' }, { index: 3, row: 0, col: 3, token: 'S' }, { index: 1, row: 0, col: 1, token: 'O' }],    // indices in incorrect order in the same row in reverse order
        [{ index: 2, row: 0, col: 2, token: 'O' }, { index: 3, row: 0, col: 3, token: 'S' }, { index: 0, row: 0, col: 0, token: 'O' }],    // indices that wrap the row
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 3, row: 0, col: 3, token: 'S' }, { index: 2, row: 0, col: 2, token: 'O' }],    // indices that wrap the row in reverse order
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 1, row: 0, col: 1, token: 'S' }, { index: 4, row: 1, col: 0, token: 'O' }],    // indices that jump to the next row
        [{ index: 4, row: 1, col: 0, token: 'O' }, { index: 1, row: 0, col: 1, token: 'S' }, { index: 0, row: 0, col: 0, token: 'O' }],    // indices that jump to the next row in reverse order
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 1, row: 0, col: 1, token: 'S' }, { index: 8, row: 2, col: 0, token: 'O' }],    // indices that jump to another row
        [{ index: 8, row: 2, col: 0, token: 'O' }, { index: 1, row: 0, col: 1, token: 'S' }, { index: 0, row: 0, col: 0, token: 'O' }],    // indices that jump to another row in reverse order
        // cols (ordinary and reverse order)
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 4, row: 1, col: 0, token: 'S' }, { index: 12, row: 3, col: 0, token: 'O' }],   // skipped indices in the same column
        [{ index: 12, row: 3, col: 0, token: 'O' }, { index: 4, row: 1, col: 0, token: 'S' }, { index: 0, row: 0, col: 0, token: 'O' }],   // skipped indices in the same column in reverse order
        [{ index: 4, row: 1, col: 0, token: 'O' }, { index: 12, row: 3, col: 0, token: 'S' }, { index: 8, row: 2, col: 0, token: 'O' }],   // indices in incorrect order in the same column
        [{ index: 8, row: 2, col: 0, token: 'O' }, { index: 12, row: 3, col: 0, token: 'S' }, { index: 4, row: 1, col: 0, token: 'O' }],    // indices in incorrect order in the same column in reverse order
        [{ index: 8, row: 2, col: 0, token: 'O' }, { index: 12, row: 3, col: 0, token: 'S' }, { index: 0, row: 0, col: 0, token: 'O' }],    // indices that wrap the column
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 12, row: 0, col: 3, token: 'S' }, { index: 8, row: 0, col: 2, token: 'O' }],    // indices that wrap the column in reverse order
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 4, row: 1, col: 0, token: 'S' }, { index: 1, row: 0, col: 1, token: 'O' }],    // indices that jump to the next column
        [{ index: 1, row: 0, col: 1, token: 'O' }, { index: 4, row: 1, col: 0, token: 'S' }, { index: 0, row: 0, col: 0, token: 'O' }],    // indices that jump to the next column in reverse order
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 4, row: 1, col: 0, token: 'S' }, { index: 2, row: 0, col: 2, token: 'O' }],    // indices that jump to the next column
        [{ index:21, row: 0, col: 2, token: 'O' }, { index: 4, row: 1, col: 0, token: 'S' }, { index: 0, row: 0, col: 0, token: 'O' }],    // indices that jump to another column in reverse order
        // diagonal top-left to bottom-right (ordinary and reverse order)
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 5, row: 1, col: 1, token: 'S' }, { index: 15, row: 3, col: 3, token: 'O' }],    // skipped indices in the same diagonal
        [{ index: 15, row: 3, col: 3, token: 'O' }, { index: 5, row: 1, col: 1, token: 'S' }, { index: 0, row: 0, col: 0, token: 'O' }],    // skipped indices in the same diagonal in reverse order
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 10, row: 2, col: 2, token: 'S' }, { index: 5, row: 1, col: 1, token: 'O' }],    // indices in incorrect order in the same diagonal
        [{ index: 5, row: 1, col: 1, token: 'O' }, { index: 10, row: 2, col: 2, token: 'S' }, { index: 0, row: 0, col: 0, token: 'O' }],    // indices in incorrect order in the same diagonal in reverse order
        [{ index: 10, row: 2, col: 2, token: 'O' }, { index: 15, row: 3, col: 3, token: 'S' }, { index: 0, row: 0, col: 0, token: 'O' }],    // indices that wrap the diagonal
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 15, row: 3, col: 3, token: 'S' }, { index: 10, row: 2, col: 2, token: 'O' }],    // indices that wrap the diagonal in reverse order
        [{ index: 0, row: 0, col: 0, token: 'O' }, { index: 5, row: 1, col: 1, token: 'S' }, { index: 6, row: 1, col: 2, token: 'O' }],    // indices that jump to another diagonal
        [{ index: 6, row: 1, col: 2, token: 'O' }, { index: 5, row: 1, col: 1, token: 'S' }, { index: 0, row: 0, col: 0, token: 'O' }],    // indices that jump to another diagonal in reverse order
        // diagonal bottom-left to top-right (ordinary and reverse order)
        [{ index: 3, row: 0, col: 3, token: 'O' }, { index: 6, row: 1, col: 2, token: 'S' }, { index: 12, row: 3, col: 0, token: 'O' }],    // skipped indices in the same diagonal
        [{ index: 12, row: 3, col: 0, token: 'O' }, { index: 6, row: 1, col: 2, token: 'S' }, { index: 3, row: 0, col: 3, token: 'O' }],    // skipped indices in the same diagonal in reverse order
        [{ index: 3, row: 0, col: 3, token: 'O' }, { index: 9, row: 2, col: 1, token: 'S' }, { index: 6, row: 1, col: 2, token: 'O' }],    // indices in incorrect order in the same diagonal
        [{ index: 6, row: 1, col: 2, token: 'O' }, { index: 9, row: 2, col: 1, token: 'S' }, { index: 3, row: 0, col: 3, token: 'O' }],    // indices in incorrect order in the same diagonal in reverse order
        [{ index: 9, row: 1, col: 3, token: 'O' }, { index: 12, row: 2, col: 2, token: 'S' }, { index: 3, row: 0, col: 3, token: 'O' }],    // indices that wrap the diagonal
        [{ index: 3, row: 0, col: 3, token: 'O' }, { index: 12, row: 2, col: 2, token: 'S' }, { index: 9, row: 1, col: 3, token: 'O' }],    // indices that wrap the diagonal in reverse order
        [{ index: 3, row: 0, col: 3, token: 'O' }, { index: 6, row: 1, col: 2, token: 'S' }, { index: 5, row: 1, col: 1, token: 'O' }],    // indices that jump to another diagonal
        [{ index: 5, row: 1, col: 1, token: 'O' }, { index: 6, row: 1, col: 2, token: 'S' }, { index: 3, row: 0, col: 3, token: 'O' }],    // indices that jump to another diagonal in reverse order
    ];
    for (const word of invalidWords) {
        expect(wordIsValid(word)).toBe(false);   
    }
});

test('marker generator returns 3 indexes', () => {
    const generator = wordMarker();
    generator.next();
    generator.next({ index: 4, row: 1, col: 0, token: O_TOKEN });
    generator.next({ index: 0, row: 0, col: 0, token: S_TOKEN });
    const { value } = generator.next({ index: 6, row: 1, col: 2, token: O_TOKEN });
    expect((value as Word).length).toBe(3);
});