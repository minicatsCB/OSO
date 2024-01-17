import { render, screen } from '@testing-library/react';
import EndGameButton from './EndGameButton';
import userEvent from '@testing-library/user-event';

test('is clickable', () => {
    const onClick = jest.fn();

    render(<EndGameButton onClick={onClick}></EndGameButton>);
    const endGameButton: HTMLElement = screen.getByTestId('end-game-btn');
    userEvent.click(endGameButton);
    expect(onClick).toHaveBeenCalledTimes(1);
});