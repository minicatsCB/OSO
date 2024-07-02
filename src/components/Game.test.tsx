import { render, screen, waitFor, within } from '@testing-library/react';
import Game from './Game';
import { O_TOKEN, S_TOKEN } from '../core/constants';
import { clickCells, checkScore } from '../core/test-helpers';

test('if turn button is clicked, status shows correct player turn', async () => {
    render(<Game />)

    const turnBtn: HTMLElement = screen.getByTestId('turn-btn');

    await screen.findByText(`It's Alice's turn`);
    await clickCells([turnBtn]);
    await screen.findByText(`It's Bob's turn`);
})

test('same OSO word can not be marked twice', async () => {
    render(<Game />)

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    const turnBtn: HTMLElement = screen.getByTestId('turn-btn');
    const markBtn: HTMLElement = screen.getByTestId('mark-btn');

    await clickCells([cells[0]]);
    await waitFor(() => expect(cells[0]).toHaveTextContent(O_TOKEN));
    await clickCells([turnBtn]);

    await clickCells([cells[1]], true);
    await waitFor(() => expect(cells[1]).toHaveTextContent(S_TOKEN));
    await clickCells([turnBtn]);

    await clickCells([cells[2]]);
    await waitFor(() => expect(cells[2]).toHaveTextContent(O_TOKEN));
    await clickCells([markBtn]);
    await clickCells([cells[0], cells[1], cells[2]]);
    await checkScore('Alice', 1);
    await clickCells([cells[0], cells[1], cells[2]]);
    await checkScore('Alice', 1);
    await clickCells([cells[2], cells[1], cells[0]]);
    await checkScore('Alice', 1);
});

test('if mark button is enabled, turn button is disabled', async () => {
    render(<Game />)

    const turnBtn: HTMLElement = screen.getByTestId('turn-btn');
    const markBtn: HTMLElement = screen.getByTestId('mark-btn');

    await clickCells([markBtn]);
    expect(markBtn).toBeEnabled();
    expect(turnBtn).not.toBeEnabled();

    await clickCells([markBtn]);
    expect(markBtn).toBeEnabled();
    expect(turnBtn).toBeEnabled();
});

test('if user single clicks on an empty cell, it gets marked with "O" token', async () => {
    render(<Game />)

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');

    await clickCells([cells[0]]);
    await waitFor(() => expect(cells[0]).toHaveTextContent(O_TOKEN));
});

test('if user double clicks on an empty cell, it gets marked with "S" token', async () => {
    render(<Game />)

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');

    await clickCells([cells[0]], true);
    await waitFor(() => expect(cells[0]).toHaveTextContent(S_TOKEN));
});

test('if game ends, the board becomes unclickable', async () => {
    render(<Game />)

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLButtonElement> = within(board).getAllByRole('button');
    const endGameBtn: HTMLElement = screen.getByTestId('end-game-btn');

    await clickCells([endGameBtn]);
    expect(cells.every(cell => !cell.disabled)).toBe(false);
});

test('if no one makes a move and the game ends, the status should reflect a draw', async () => {
    render(<Game />)

    const endGameBtn: HTMLElement = screen.getByTestId('end-game-btn');

    await screen.findByText(`It's Alice's turn`);
    await clickCells([endGameBtn]);
    await screen.findByText(`It's a draw!`);
});

test('if a player wins, the status should reflect the winner', async () => {
    render(<Game />)

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    const turnBtn: HTMLElement = screen.getByTestId('turn-btn');
    const markBtn: HTMLElement = screen.getByTestId('mark-btn');
    const endGameBtn: HTMLElement = screen.getByTestId('end-game-btn');

    await clickCells([cells[0]]);
    await waitFor(() => expect(cells[0]).toHaveTextContent(O_TOKEN));
    await clickCells([turnBtn]);

    await clickCells([cells[1]], true);
    await waitFor(() => expect(cells[1]).toHaveTextContent(S_TOKEN));
    await clickCells([turnBtn]);

    await clickCells([cells[2]]);
    await waitFor(() => expect(cells[2]).toHaveTextContent(O_TOKEN));
    await clickCells([markBtn]);
    await clickCells([cells[0], cells[1], cells[2]]);
    await checkScore('Alice', 1);
    await clickCells([markBtn]);

    await clickCells([cells[5]], true);
    await waitFor(() => expect(cells[5]).toHaveTextContent(S_TOKEN));
    await clickCells([turnBtn]);

    await clickCells([cells[10]]);
    await waitFor(() => expect(cells[10]).toHaveTextContent(O_TOKEN));
    await clickCells([markBtn]);
    await clickCells([cells[0], cells[5], cells[10]]);
    await checkScore('Bob', 1);
    await clickCells([markBtn]);

    await clickCells([cells[6]], true);
    await waitFor(() => expect(cells[6]).toHaveTextContent(S_TOKEN));
    await clickCells([markBtn]);
    await clickCells([cells[2], cells[6], cells[10]]);
    await checkScore('Bob', 2);
    await clickCells([markBtn]);

    await clickCells([endGameBtn]);
    await screen.findByText(`Winner is Bob!`);
});

test('if a user makes a score, score should be updated', async () => {
    render(<Game />)

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    const turnBtn: HTMLElement = screen.getByTestId('turn-btn');
    const markBtn: HTMLElement = screen.getByTestId('mark-btn');

    await checkScore('Alice', 0);
    await clickCells([cells[0]]);
    await waitFor(() => expect(cells[0]).toHaveTextContent(O_TOKEN));
    await clickCells([turnBtn]);

    await clickCells([cells[1]], true);
    await waitFor(() => expect(cells[1]).toHaveTextContent(S_TOKEN));
    await clickCells([turnBtn]);

    await clickCells([cells[2]]);
    await waitFor(() => expect(cells[2]).toHaveTextContent(O_TOKEN));
    await clickCells([markBtn]);
    await clickCells([cells[0], cells[1], cells[2]]);
    await checkScore('Alice', 1);
});

// TODO: test if a user marks a word, it should be highlighted drawing a line through it. Use visual testing.