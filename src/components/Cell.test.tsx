import { render, screen } from '@testing-library/react';
import Cell from './Cell';
import GameContext from '../core/gameContext';

const contextValue: Array<string> = ['O', '', '', '', 'S', '', '', '', ''];

test('shows correct content', () => {
    const onClick = jest.fn();

    render(
        <GameContext.Provider value={contextValue}>
            <Cell key="0-0" index={0} onClick={() => onClick(0, 1)}></Cell>
            <Cell key="0-2" index={2} onClick={() => onClick(2, 0)}></Cell>
            <Cell key="1-1" index={4} onClick={() => onClick(4, 2)}></Cell>
        </GameContext.Provider>
    );

    const cells = screen.getAllByRole('button');
    expect(cells[0]).toHaveTextContent(contextValue[0]);
    expect(cells[1]).toHaveTextContent(contextValue[2]);
    expect(cells[2]).toHaveTextContent(contextValue[4]);
});