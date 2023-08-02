import { render, screen } from '@testing-library/react';
import History from './History';

test('renders ok when length is 0', () => {
    const handleJump = jest.fn();

    render(<History length={0} onJump={handleJump} currentMove={0}/>);

    const title: HTMLElement = screen.getByText("History");
    expect(title).toBeInTheDocument();

    const movesBtns: Array<HTMLElement> = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(0);
});

test('renders ok when length is 1', () => {
    const handleJump = jest.fn();

    render(<History length={1} onJump={handleJump} currentMove={1}/>);

    const title: HTMLElement = screen.getByText("History");
    expect(title).toBeInTheDocument();

    const movesBtns: Array<HTMLElement> = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(1);
});

test('renders ok when length greater than 1', () => {
    const handleJump = jest.fn();

    render(<History length={7} onJump={handleJump} currentMove={6}/>);

    const title: HTMLElement = screen.getByText("History");
    expect(title).toBeInTheDocument();

    const movesBtns: Array<HTMLElement> = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(7);
});