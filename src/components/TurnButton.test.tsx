import { render, screen } from '@testing-library/react';
import TurnButton from './TurnButton';
import userEvent from '@testing-library/user-event';


test('button is clickable when it is not disabled', () => {
    const onClick = jest.fn();

    render(<TurnButton onClick={onClick} isDisabled={false}></TurnButton>);
    const turnButton: HTMLElement = screen.getByTestId('turn-btn');
    userEvent.click(turnButton);
    expect(onClick).toHaveBeenCalledTimes(1);
});

test('button is not clickable when it is disabled', () => {
    const onClick = jest.fn();

    render(<TurnButton onClick={onClick} isDisabled={true}></TurnButton>);
    const turnButton: HTMLElement = screen.getByTestId('turn-btn');
    userEvent.click(turnButton);
    expect(onClick).not.toHaveBeenCalled();
});