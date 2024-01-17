import { render, screen, within } from '@testing-library/react';
import Board from './Board';

test('renders 1x1 board correctly', () => {
    const ROWS: number = 1;
    const COLS: number = 1;
    const handlePlay = jest.fn();

    render(<Board rows={ROWS} cols={COLS} values={[]} onPlay={handlePlay} />);

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    expect(cells).toHaveLength(ROWS * COLS);
});

test('renders 3x3 board correctly', () => {
    const ROWS: number = 3;
    const COLS: number = 3;
    const handlePlay = jest.fn();

    render(<Board rows={ROWS} cols={COLS} values={[]} onPlay={handlePlay} />);

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    expect(cells).toHaveLength(ROWS * COLS);
});

test('renders 5x3 board correctly', () => {
    const ROWS: number = 5;
    const COLS: number = 3;
    const handlePlay = jest.fn();

    render(<Board rows={ROWS} cols={COLS} values={[]} onPlay={handlePlay} />);

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    expect(cells).toHaveLength(ROWS * COLS);
});