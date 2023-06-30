import { act, render, screen } from '@testing-library/react';
import Game from './Game';
import userEvent from '@testing-library/user-event';

// Example of winner context: ['X', 'O', 'X', '', 'X', '', 'O', 'O', 'O']
// Example of draw context: ['X', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O']
// Note: X alwasy starts the game

test('if X player wins info status reflect it and board gets unclickable', () => {
    render(<Game />)

    const clickableCells = screen.getAllByRole('button');

    for (const cellIdx of [0, 1, 4, 8, 6, 3, 2]) {  // X clicks cell 0, O clicks cell 1, X clicks cell 4 .. X clicks cell 2
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

test('renders history according to game state', () => {
    render(<Game />)

    let goToGameStartBtn = screen.queryByText("Go to game start");
    expect(goToGameStartBtn).not.toBeInTheDocument();

    let movesBtns = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(0);

    const clickableCells = screen.getAllByRole('button');

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

    let clickableCells = screen.getAllByRole('button');

    for (const cellIdx of [0, 1, 4, 8, 6, 3, 2]) {
        act(() => {
            userEvent.click(clickableCells[cellIdx]);
        });
    }

    const movesBtns = screen.queryAllByText("Go to move", { exact: false });
    const lastCells = clickableCells.map(cellEl => cellEl.innerHTML);
    act(() => {
        userEvent.click(movesBtns[2]);
    });

    expect(clickableCells[0]).toContainHTML('X');
    expect(clickableCells[1]).toContainHTML('O');
    expect(clickableCells[2]).toContainHTML('');
    expect(clickableCells[3]).toContainHTML('');
    expect(clickableCells[4]).toContainHTML('X');
    expect(clickableCells[5]).toContainHTML('');
    expect(clickableCells[6]).toContainHTML('');
    expect(clickableCells[7]).toContainHTML('');
    expect(clickableCells[8]).toContainHTML('');

    act(() => {
        userEvent.click(movesBtns[movesBtns.length - 1]);   // Return to the last move
    });

    expect(clickableCells[0]).toContainHTML('X');
    expect(clickableCells[1]).toContainHTML('O');
    expect(clickableCells[2]).toContainHTML('X');
    expect(clickableCells[3]).toContainHTML('O');
    expect(clickableCells[4]).toContainHTML('X');
    expect(clickableCells[5]).toContainHTML('');
    expect(clickableCells[6]).toContainHTML('X');
    expect(clickableCells[7]).toContainHTML('');
    expect(clickableCells[8]).toContainHTML('O');
});