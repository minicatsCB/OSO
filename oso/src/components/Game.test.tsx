import { act, render, screen } from '@testing-library/react';
import Game from './Game';
import userEvent from '@testing-library/user-event';

// Example of winner context: ['X', 'O', 'X', '', 'X', '', 'O', 'O', 'O']
// Example of draw context: ['X', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O']
// Note: X alwasy starts the game

test('if X player wins info status reflect it and board gets unclickable', () => {
    render(<Game />)

    const clickableCells = screen.getAllByRole('button');

    for (const cellIdx of [0, 1, 4, 8, 6, 3, 2]) {
        act(() => {
            userEvent.click(clickableCells[cellIdx]);
        });
    }

    const infoElement = screen.getByText("Winner: X");
    expect(infoElement).toBeInTheDocument();

    const unusedCellIdx = 7;
    expect(clickableCells[unusedCellIdx]).toContainHTML('');
});

test('if O player wins info status reflect it and board gets unclickable', () => {
    render(<Game />)

    const clickableCells = screen.getAllByRole('button');

    for (const cellIdx of [0, 1, 8, 4, 5, 7]) {
        act(() => {
            userEvent.click(clickableCells[cellIdx]);
        });
    }

    const infoElement = screen.getByText("Winner: O");
    expect(infoElement).toBeInTheDocument();

    const unusedCellIdx = 2;
    expect(clickableCells[unusedCellIdx]).toContainHTML('');
});

test('if X finishes with a draw, info panel shows their turn and board gets unclickable', () => {
    render(<Game />)

    const clickableCells = screen.getAllByRole('button');

    for (const cellIdx of [0, 1, 4, 8, 2, 6, 7, 3, 5]) {
        act(() => {
            userEvent.click(clickableCells[cellIdx]);
        });
    }

    const infoElement = screen.getByText("Next player: O");
    expect(infoElement).toBeInTheDocument();
    expect(clickableCells[5]).toContainHTML('X');
});