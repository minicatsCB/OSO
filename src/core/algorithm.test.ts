import calculateWinner from "./algorithm";
import { markIsValid } from "./algorithm";

// Deprecated: this function stills works under tic-tac-toe rules
// TODO: modify it to follo OSO rules
test('X wins', () => {
    const cells: Array<string> = ['X', 'O', 'X', '', 'X', '', 'X', 'O', 'O'];
    expect(calculateWinner(cells)).toBe('X');
});

// Deprecated: this function stills works under tic-tac-toe rules
// TODO: modify it to follo OSO rules
test('O wins', () => {
    const cells: Array<string> = ['X', 'O', 'X', '', 'X', '', 'O', 'O', 'O'];
    expect(calculateWinner(cells)).toBe('O');
});

// Deprecated: this function stills works under tic-tac-toe rules
// TODO: modify it to follo OSO rules
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