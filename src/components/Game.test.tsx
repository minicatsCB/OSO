import { act, render, screen } from '@testing-library/react';
import Game from './Game';
import userEvent from '@testing-library/user-event';

// Example of winner context: ['X', 'O', 'X', '', 'X', '', 'O', 'O', 'O']
// Example of draw context: ['X', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O']
// Note: X always starts the game

test('if X player wins info status reflects it and board gets unclickable', () => {
    render(<Game />)

    const clickableCells: Array<HTMLElement> = screen.getAllByRole('button');

    for (const cellIdx of [0, 1, 4, 8, 6, 3, 2]) {  // X clicks cell 0, O clicks cell 1, X clicks cell 4 .. X clicks cell 2
        act(() => {
            userEvent.click(clickableCells[cellIdx]);
        });
    }

    const info: HTMLElement = screen.getByText("Winner: X");
    expect(info).toBeInTheDocument();

    expect(clickableCells[7]).toHaveTextContent('');
});

test('if O player wins info status reflects it and board gets unclickable', () => {
    render(<Game />)

    const clickableCells: Array<HTMLElement> = screen.getAllByRole('button');

    for (const cellIdx of [0, 1, 8, 4, 5, 7]) {
        act(() => {
            userEvent.click(clickableCells[cellIdx]);
        });
    }

    const info: HTMLElement = screen.getByText("Winner: O");
    expect(info).toBeInTheDocument();

    expect(clickableCells[2]).toHaveTextContent('');
});

test('if X finishes with a draw, info panel shows correct turn and board gets unclickable', () => {
    render(<Game />)

    const clickableCells: Array<HTMLElement> = screen.getAllByRole('button');

    for (const cellIdx of [0, 1, 4, 8, 2, 6, 7, 3, 5]) {
        act(() => {
            userEvent.click(clickableCells[cellIdx]);
        });
    }

    const info: HTMLElement = screen.getByText("Next player: O");
    expect(info).toBeInTheDocument();

    expect(clickableCells[5]).toHaveTextContent('X');
});

test('renders history according to game state', () => {
    render(<Game />)

    let goToGameStartBtn: HTMLElement | null = screen.queryByText("Go to game start");
    expect(goToGameStartBtn).not.toBeInTheDocument();

    let movesBtns: Array<HTMLElement> = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(0);

    const clickableCells: Array<HTMLElement> = screen.getAllByRole('button');

    for (const cellIdx of [0, 1, 4, 8, 6, 3, 2]) {
        act(() => {
            userEvent.click(clickableCells[cellIdx]);
        });
    }

    goToGameStartBtn = screen.queryByText("Go to game start");
    expect(goToGameStartBtn).toBeInTheDocument();

    movesBtns = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(7);
});

test('shows correct cells if a history record is selected', () => {
    render(<Game />)

    const clickableCells: Array<HTMLElement> = screen.getAllByRole('button');

    for (const cellIdx of [0, 1, 4, 8, 6, 3, 2]) {
        act(() => {
            userEvent.click(clickableCells[cellIdx]);
        });
    }

    const movesBtns: Array<HTMLElement> = screen.queryAllByText("Go to move", { exact: false });
    act(() => {
        userEvent.click(movesBtns[2]);
    });

    const moveContext: Array<string> = ['X', 'O', '', '', 'X', '', '', '', ''];
    for (let cellIdx = 0; cellIdx < clickableCells.length; cellIdx++) {
        expect(clickableCells[cellIdx]).toHaveTextContent(moveContext[cellIdx]);
    }

    act(() => {
        userEvent.click(movesBtns[movesBtns.length - 1]);   // Return to the last move
    });

    const lastContext: Array<string> = ['X', 'O', 'X', 'O', 'X', '', 'X', '', 'O'];
    for (let cellIdx = 0; cellIdx < clickableCells.length; cellIdx++) {
        expect(clickableCells[cellIdx]).toHaveTextContent(lastContext[cellIdx]);
    }
});

test('shows correct history if player goes back and win in less moves', () => {
    render(<Game />)

    const clickableCells: Array<HTMLElement> = screen.getAllByRole('button');

    for (const cellIdx of [0, 3, 8, 5, 7, 6, 1, 2, 4]) {    // Unnecessary long game
        act(() => {
            userEvent.click(clickableCells[cellIdx]);
        });
    }

    let movesBtns: Array<HTMLElement> = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(9);
    
    act(() => {
        userEvent.click(movesBtns[3]);  // Go back in time
    });

    act(() => {
        userEvent.click(clickableCells[4]); // Win faster
    });

    movesBtns = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(5);
});