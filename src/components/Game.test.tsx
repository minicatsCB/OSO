import { act, render, screen, waitFor, within } from '@testing-library/react';
import Game from './Game';
import userEvent from '@testing-library/user-event';
import { O_TOKEN, SECOND_CLICK_WAIT_TIME, S_TOKEN } from '../core/constants';

beforeEach(() => {
    jest.useFakeTimers()
})

afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
})

test('if game ends with victory, status reflects the winner and board gets unclickable', async () => {
    render(<Game />)

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    const turnBtn: HTMLElement = screen.getByTestId('turn-btn');
    const markBtn: HTMLElement = screen.getByTestId('mark-btn');
    const endGameBtn: HTMLElement = screen.getByTestId('end-game-btn');

    act(() => userEvent.click(cells[0]));
    jest.advanceTimersByTime(SECOND_CLICK_WAIT_TIME);
    await waitFor(() => expect(cells[0]).toHaveTextContent(O_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Bob's turn`);

    act(() => userEvent.dblClick(cells[1]));
    await waitFor(() => expect(cells[1]).toHaveTextContent(S_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Alice's turn`);

    act(() => userEvent.click(cells[2]));
    jest.advanceTimersByTime(SECOND_CLICK_WAIT_TIME);
    await waitFor(() => expect(cells[2]).toHaveTextContent(O_TOKEN));
    act(() => userEvent.click(markBtn));
    expect(turnBtn).not.toBeEnabled();
    expect(markBtn).toBeEnabled();
    act(() => userEvent.click(cells[0]));
    act(() => userEvent.click(cells[1]));
    act(() => userEvent.click(cells[2]));
    await screen.findByText('Alice: 1');
    act(() => userEvent.click(markBtn));
    expect(turnBtn).toBeEnabled();
    expect(markBtn).toBeEnabled();

    act(() => userEvent.dblClick(cells[5]));
    await waitFor(() => expect(cells[5]).toHaveTextContent(S_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText("It's Bob's turn")

    act(() => userEvent.click(cells[10]));
    jest.advanceTimersByTime(SECOND_CLICK_WAIT_TIME);
    await waitFor(() => expect(cells[10]).toHaveTextContent(O_TOKEN));
    act(() => userEvent.click(markBtn));
    act(() => userEvent.click(cells[0]));
    act(() => userEvent.click(cells[5]));
    act(() => userEvent.click(cells[10]));
    await screen.findByText('Bob: 1')
    act(() => userEvent.click(markBtn));

    act(() => userEvent.dblClick(cells[6]));
    await waitFor(() => expect(cells[6]).toHaveTextContent(S_TOKEN));
    act(() => userEvent.click(markBtn));
    act(() => userEvent.click(cells[2]));
    act(() => userEvent.click(cells[6]));
    act(() => userEvent.click(cells[10]));
    await screen.findByText('Bob: 2')
    act(() => userEvent.click(markBtn));

    act(() => userEvent.click(endGameBtn));
    await screen.findByText("Winner is Bob!");

    act(() => userEvent.dblClick(cells[3]));
    await waitFor(() => expect(cells[3]).toHaveTextContent(""));
});


test('if game ends with draw, status reflect it and board gets unclickable', async () => {
    render(<Game />)

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    const turnBtn: HTMLElement = screen.getByTestId('turn-btn');
    const markBtn: HTMLElement = screen.getByTestId('mark-btn');
    const endGameBtn: HTMLElement = screen.getByTestId('end-game-btn');

    act(() => userEvent.click(cells[0]));
    jest.advanceTimersByTime(SECOND_CLICK_WAIT_TIME);
    await waitFor(() => expect(cells[0]).toHaveTextContent(O_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Bob's turn`);

    act(() => userEvent.dblClick(cells[1]));
    await waitFor(() => expect(cells[1]).toHaveTextContent(S_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Alice's turn`);

    act(() => userEvent.click(cells[2]));
    jest.advanceTimersByTime(SECOND_CLICK_WAIT_TIME);
    await waitFor(() => expect(cells[2]).toHaveTextContent(O_TOKEN));
    act(() => userEvent.click(markBtn));
    act(() => userEvent.click(cells[0]));
    act(() => userEvent.click(cells[1]));
    act(() => userEvent.click(cells[2]));
    await screen.findByText('Alice: 1');
    act(() => userEvent.click(markBtn));

    act(() => userEvent.dblClick(cells[5]));
    await waitFor(() => expect(cells[5]).toHaveTextContent(S_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText("It's Bob's turn")

    act(() => userEvent.click(cells[10]));
    jest.advanceTimersByTime(SECOND_CLICK_WAIT_TIME);
    await waitFor(() => expect(cells[10]).toHaveTextContent(O_TOKEN));
    act(() => userEvent.click(markBtn));
    act(() => userEvent.click(cells[0]));
    act(() => userEvent.click(cells[5]));
    act(() => userEvent.click(cells[10]));
    await screen.findByText('Bob: 1')
    act(() => userEvent.click(markBtn));

    act(() => userEvent.click(endGameBtn));
    await screen.findByText("It's a draw!");

    act(() => userEvent.dblClick(cells[3]));
    await waitFor(() => expect(cells[3]).toHaveTextContent(""));
});

test('if no body makes a move and game ends, status should reflect a draw and board gets unclickable', async () => {
    render(<Game />)

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    const endGameBtn: HTMLElement = screen.getByTestId('end-game-btn');

    await screen.findByText("It's Alice's turn");

    act(() => userEvent.click(endGameBtn));
    await screen.findByText("It's a draw!");

    act(() => userEvent.dblClick(cells[1]));
    await waitFor(() => expect(cells[1]).toHaveTextContent(""));
});

test('if turn button is clicked, status shows correct player turn', async () => {
    render(<Game />)

    const turnBtn: HTMLElement = screen.getByTestId('turn-btn');

    await screen.findByText(`It's Alice's turn`);
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Bob's turn`);
})

test('if mark button is pressed, turn button does not work', async () => {
    render(<Game />)

    const turnBtn: HTMLElement = screen.getByTestId('turn-btn');
    const markBtn: HTMLElement = screen.getByTestId('mark-btn');

    act(() => userEvent.click(markBtn));
    await screen.findByText(`It's Alice's turn`);
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Alice's turn`);

    act(() => userEvent.click(markBtn));    // Unpress mark
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Bob's turn`);
})