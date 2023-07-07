import calculateWinner from "./algorithm";
import { markIsValid } from "./algorithm";

test('X wins', () => {
    const cells: Array<string> = ['X', 'O', 'X', '', 'X', '', 'X', 'O', 'O'];
    expect(calculateWinner(cells)).toBe('X');
});

test('O wins', () => {
    const cells: Array<string> = ['X', 'O', 'X', '', 'X', '', 'O', 'O', 'O'];
    expect(calculateWinner(cells)).toBe('O');
});

test('Draw', () => {
    const cells: Array<string> = ['X', 'O', 'X', '', 'X', '', 'O', 'X', 'O'];
    expect(calculateWinner(cells)).toBe('');
});

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