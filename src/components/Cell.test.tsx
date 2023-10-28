import { render, screen } from '@testing-library/react';
import Cell from './Cell';
import GameContext from '../core/gameContext';

const contextValue: Array<string> = ['', '', '', '', 'S', '', 'O', '', ''];

test('should be empty if not clicked', async () => {
    const onClick = jest.fn();

    render(
        <GameContext.Provider value={contextValue}>
            <Cell key="0-1" index={1} onClick={onClick}></Cell>
        </GameContext.Provider>
    );

    const cells = screen.getAllByRole('button');
    expect(cells[0]).toHaveTextContent(contextValue[1]);
});

test('should show letter "O" on single click', async () => {
    const onClick = jest.fn();

    render(
        <GameContext.Provider value={contextValue}>
            <Cell key="2-0" index={6} onClick={() => onClick(0, 1)}></Cell>
        </GameContext.Provider>
    );

    const cells = screen.getAllByRole('button');
    expect(cells[0]).toHaveTextContent(contextValue[6]);
});

test('should show letter "S" on double click', async () => {
    const onClick = jest.fn();

    render(
        <GameContext.Provider value={contextValue}>
            <Cell key="1-1" index={4} onClick={() => onClick(0, 1)}></Cell>
        </GameContext.Provider>
    );

    const cells = screen.getAllByRole('button');
    expect(cells[0]).toHaveTextContent(contextValue[4]);
});