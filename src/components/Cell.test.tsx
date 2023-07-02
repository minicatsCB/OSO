import { render, screen } from '@testing-library/react';
import Cell from './Cell';
import { GameContext } from './Game';

const contextValue: Array<string> = ['X', 'O', 'X', '', 'X', '', 'O', '', 'O'];

test('shows empty cell if it has not been clicked yet', () => {
    const onClick = jest.fn();
    const cellIdx: number = 3;

    render(
        <GameContext.Provider value={contextValue}>
            <Cell key="1-0" index={cellIdx} onClick={() => onClick(cellIdx)}></Cell>
        </GameContext.Provider>
    );

    const clickableCell = screen.getByRole('button');
    expect(clickableCell).toHaveTextContent(contextValue[cellIdx]);
});

test('shows correct token for player X', () => {
    const onClick = jest.fn();
    const cellIdx: number = 2;

    render(
        <GameContext.Provider value={contextValue}>
            <Cell key="0-2" index={cellIdx} onClick={() => onClick(cellIdx)}></Cell>
        </GameContext.Provider>
    );

    const clickableCell = screen.getByRole('button');
    expect(clickableCell).toHaveTextContent(contextValue[cellIdx]);
});

test('shows correct token for player O', () => {
    const onClick = jest.fn();
    const cellIdx: number = 6;
    
    render(
        <GameContext.Provider value={contextValue}>
            <Cell key="2-0" index={cellIdx} onClick={() => onClick(cellIdx)}></Cell>
        </GameContext.Provider>
    );

    const clickableCell = screen.getByRole('button');
    expect(clickableCell).toHaveTextContent(contextValue[cellIdx]);
});