import { render, screen } from '@testing-library/react';
import History from './History';

test('renders ok when length is 0', () => {
    const handleJump = jest.fn();

    render(<History length={0} onJump={handleJump}/>);

    const title: HTMLElement = screen.getByText("History");
    expect(title).toBeInTheDocument();

    const goToGameStartBtn: HTMLElement | null = screen.queryByText("Go to game start");
    expect(goToGameStartBtn).not.toBeInTheDocument();

    const movesBtns: Array<HTMLElement> = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(0);
});

test('renders ok when length is 1', () => {
    const handleJump = jest.fn();

    render(<History length={1} onJump={handleJump}/>);

    const title: HTMLElement = screen.getByText("History");
    expect(title).toBeInTheDocument();

    const goToGameStartBtn: HTMLElement | null = screen.queryByText("Go to game start");
    expect(goToGameStartBtn).toBeInTheDocument();

    const movesBtns: Array<HTMLElement> = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(0);
});

test('renders ok when length greater than 1', () => {
    const handleJump = jest.fn();

    render(<History length={7} onJump={handleJump}/>);

    const title: HTMLElement = screen.getByText("History");
    expect(title).toBeInTheDocument();

    const goToGameStartBtn: HTMLElement | null = screen.queryByText("Go to game start");
    expect(goToGameStartBtn).toBeInTheDocument();

    const movesBtns: Array<HTMLElement> = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(6);
});