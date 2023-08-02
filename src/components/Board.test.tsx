import { render, screen, waitFor, within } from '@testing-library/react';
import Board from './Board';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

test('renders 1x1 board correctly', () => {
    const ROWS: number = 1;
    const COLS: number = 1;
    const handlePlay = jest.fn();

    render(<Board rows={ROWS} cols={COLS} onPlay={handlePlay} />);

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    expect(cells).toHaveLength(ROWS * COLS);
});

test('renders 3x3 board correctly', () => {
    const ROWS: number = 3;
    const COLS: number = 3;
    const handlePlay = jest.fn();

    render(<Board rows={ROWS} cols={COLS} onPlay={handlePlay} />);

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    expect(cells).toHaveLength(ROWS * COLS);
});

test('renders 5x3 board correctly', () => {
    const ROWS: number = 5;
    const COLS: number = 3;
    const handlePlay = jest.fn();

    render(<Board rows={ROWS} cols={COLS} onPlay={handlePlay} />);

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    expect(cells).toHaveLength(ROWS * COLS);
});


test('clicking cell once calls handler correctly', async () => {
    const ROWS: number = 3;
    const COLS: number = 3;
    const handlePlay = jest.fn();

    render(<Board rows={ROWS} cols={COLS} onPlay={handlePlay} />);

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    expect(cells).toHaveLength(ROWS * COLS);

    act(() => userEvent.click(cells[0]))
    await waitFor(() => expect(handlePlay).toHaveBeenCalledWith(0, 1));
});

test('clicking cell twice calls handler correctly', async () => {
    const ROWS: number = 3;
    const COLS: number = 3;
    const handlePlay = jest.fn();

    render(<Board rows={ROWS} cols={COLS} onPlay={handlePlay} />);

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    expect(cells).toHaveLength(ROWS * COLS);

    act(() => userEvent.dblClick(cells[0]))
    await waitFor(() => expect(handlePlay).toHaveBeenCalledWith(0, 2));
});

