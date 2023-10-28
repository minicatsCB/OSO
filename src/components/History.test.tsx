import { render, screen } from '@testing-library/react';
import History from './History';

test('is empty if there are no moves yet', () => {
    const handleJump = jest.fn();

    render(<History length={0} onJump={handleJump} currentMove={0}/>);

    const title: HTMLElement = screen.getByText("History");
    expect(title).toBeInTheDocument();

    const movesBtns: Array<HTMLElement> = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(0);
});

test('shows one record if there has been only one move and last is disabled', () => {
    const handleJump = jest.fn();

    render(<History length={1} onJump={handleJump} currentMove={0}/>);

    const title: HTMLElement = screen.getByText("History");
    expect(title).toBeInTheDocument();

    const movesBtns: Array<HTMLElement> = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(1);

    expect(movesBtns[movesBtns.length - 1]).toBeDisabled();
});

test('shows same amount of records as moves and last is disabled', () => {
    const handleJump = jest.fn();

    render(<History length={7} onJump={handleJump} currentMove={6}/>);

    const title: HTMLElement = screen.getByText("History");
    expect(title).toBeInTheDocument();

    const movesBtns: Array<HTMLElement> = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(7);

    expect(movesBtns[movesBtns.length - 1]).toBeDisabled();
});

test('last button should be enabled if some past move has been selected', () => {
    const handleJump = jest.fn();

    render(<History length={7} onJump={handleJump} currentMove={2}/>);

    const title: HTMLElement = screen.getByText("History");
    expect(title).toBeInTheDocument();

    const movesBtns: Array<HTMLElement> = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(7);

    expect(movesBtns[movesBtns.length - 1]).toBeEnabled();
});