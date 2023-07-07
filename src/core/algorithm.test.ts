import calculateWinner from "./algorithm";

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