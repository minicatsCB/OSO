import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Board from './Board';

test('renders 1x1 board correctly', () => {
    const ROWS: number = 1;
    const COLS: number = 1;
    const onBoardClick = jest.fn();

    render(<Board rows={ROWS} cols={COLS} onClick={onBoardClick} />);

    const clickableCells = screen.getAllByRole('button');
    expect(clickableCells).toHaveLength(ROWS*COLS);
});

test('renders 3x3 board correctly', () => {
    const ROWS: number = 3;
    const COLS: number = 3;
    const onBoardClick = jest.fn();

    render(<Board rows={ROWS} cols={COLS} onClick={onBoardClick} />);

    const clickableCells = screen.getAllByRole('button');
    expect(clickableCells).toHaveLength(ROWS*COLS);
});

test('renders 5x3 board correctly', () => {
    const ROWS: number = 5;
    const COLS: number = 3;
    const onBoardClick = jest.fn();

    render(<Board rows={ROWS} cols={COLS} onClick={onBoardClick} />);

    const clickableCells = screen.getAllByRole('button');
    expect(clickableCells).toHaveLength(ROWS*COLS);
});


test('click one board cell correctly', () => {
    const ROWS: number = 3;
    const COLS: number = 3;
    const onBoardClick = jest.fn();

    render(<Board rows={ROWS} cols={COLS} onClick={onBoardClick} />);

    const clickableCells = screen.getAllByRole('button');
    expect(clickableCells).toHaveLength(ROWS*COLS);

    fireEvent.click(clickableCells[0]);
  
    expect(onBoardClick).toHaveBeenCalledTimes(1);
});

