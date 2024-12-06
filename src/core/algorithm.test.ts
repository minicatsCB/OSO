import { wordIsValid, markIsValid, wordMarker } from "./algorithm";
import { Word } from "./models";

test('marked word is valid', () => {
    const mark: Array<string> = ['O', 'S', 'O'];
    expect(markIsValid(mark)).toBe(true);
});

test('marked word is invalid', () => {
    const invalidMarks: Array<Array<string>> = [
        ['O', 'O', 'O'],
        ['O', 'O', 'S'],
        ['O', 'S', 'S'],
        ['S', 'S', 'S'],
        ['S', 'S', 'O'],
        ['S', 'O', 'O'],
        ['S', 'O', 'S']
    ];
    for (const mark of invalidMarks) {
        expect(markIsValid(mark)).toBe(false);   
    }
});

test('word is invalid because of tokens', () => {
    const invalidWords: Array<Word> = [
        [{ index: 0, token: 'O' }, { index: 1, token: 'O' }, { index: 2, token: 'O' }],
        [{ index: 0, token: 'O' }, { index: 1, token: 'O' }, { index: 2, token: 'S' }],
        [{ index: 0, token: 'O' }, { index: 1, token: 'S' }, { index: 2, token: 'S' }],
        [{ index: 0, token: 'S' }, { index: 1, token: 'S' }, { index: 2, token: 'S' }],
        [{ index: 0, token: 'S' }, { index: 1, token: 'S' }, { index: 2, token: 'O' }],
        [{ index: 0, token: 'S' }, { index: 1, token: 'O' }, { index: 2, token: 'O' }],
        [{ index: 0, token: 'S' }, { index: 1, token: 'O' }, { index: 2, token: 'S' }]
    ];
    for (const word of invalidWords) {
        expect(wordIsValid(word)).toBe(false);   
    }
});

test('word is invalid because of indices', () => {
    // TODO: Assume a 4x4 grid. This test will fail if the ROWS constant is changed. Find a way to make this test independent of ROWS or set ROWS to 4 in this test.
    const invalidWords: Array<Word> = [
        // rows
        [{ index: 0, token: 'O' }, { index: 1, token: 'S' }, { index: 3, token: 'O' }],    // skipped indices in the same row
        [{ index: 3, token: 'O' }, { index: 1, token: 'S' }, { index: 0, token: 'O' }],    // skipped indices in the same row in reverse order
        [{ index: 1, token: 'O' }, { index: 3, token: 'S' }, { index: 2, token: 'O' }],    // indices in incorrect order in the same row
        [{ index: 2, token: 'O' }, { index: 3, token: 'S' }, { index: 1, token: 'O' }],    // indices in incorrect order in the same row in reverse order
        [{ index: 2, token: 'O' }, { index: 3, token: 'S' }, { index: 0, token: 'O' }],    // indices that wrap the row
        [{ index: 0, token: 'O' }, { index: 3, token: 'S' }, { index: 2, token: 'O' }],    // indices that wrap the row in reverse order
        [{ index: 0, token: 'O' }, { index: 1, token: 'S' }, { index: 4, token: 'O' }],    // indices that jump to the next row
        [{ index: 4, token: 'O' }, { index: 1, token: 'S' }, { index: 0, token: 'O' }],    // indices that jump to the next row in reverse order
        [{ index: 0, token: 'O' }, { index: 1, token: 'S' }, { index: 8, token: 'O' }],    // indices that jump to another row
        [{ index: 8, token: 'O' }, { index: 1, token: 'S' }, { index: 0, token: 'O' }],    // indices that jump to another row in reverse order
        // cols
        [{ index: 0, token: 'O' }, { index: 4, token: 'S' }, { index: 12, token: 'O' }],   // skipped indices in the same column
        [{ index: 12, token: 'O' }, { index: 4, token: 'S' }, { index: 0, token: 'O' }],   // skipped indices in the same column in reverse order
        [{ index: 4, token: 'O' }, { index: 12, token: 'S' }, { index: 8, token: 'O' }],   // indices in incorrect order in the same column
    ];
    for (const word of invalidWords) {
        expect(wordIsValid(word)).toBe(false);   
    }
});

test('marker generator returns 3 indexes', () => {
    const generator = wordMarker();
    generator.next();
    generator.next(4);
    generator.next(0);
    const { value } = generator.next(6);
    expect((value as Array<number>).length).toBe(3);
});