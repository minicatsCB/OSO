import { render, screen } from '@testing-library/react';
import MarkButton from './MarkButton';
import userEvent from '@testing-library/user-event';

test('is clickable', () => {
    const onClick = jest.fn();

    render(<MarkButton onClick={onClick}></MarkButton>);
    const markButton: HTMLElement = screen.getByTestId('mark-btn');
    userEvent.click(markButton);
    expect(onClick).toHaveBeenCalledTimes(1);
});

test('is active', () => {
    render(<MarkButton isActive={true}></MarkButton>);
    const markButton: HTMLElement = screen.getByTestId('mark-btn');
    expect(markButton).toHaveClass('active');
});