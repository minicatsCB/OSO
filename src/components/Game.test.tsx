import { act, render, screen, waitFor, within } from '@testing-library/react';
import Game from './Game';
import userEvent from '@testing-library/user-event';
import { O_TOKEN, S_TOKEN } from '../core/constants';

beforeEach(() => {
    jest.useFakeTimers()
})

afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
})

test('clicking cell once shows letter "O"', async () => {
    render(<Game />)

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    act(() => userEvent.click(cells[0]));

    await waitFor(() => expect(cells[0]).toHaveTextContent(O_TOKEN));   // For now, default timeout is ok (1000ms)
});

test('clicking cell twice shows letter "S"', async () => {
    render(<Game />)

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    act(() => userEvent.dblClick(cells[0]));
    await waitFor(() => expect(cells[0]).toHaveTextContent(S_TOKEN));
});

test('if game ends with victory, status reflects the winner and board gets unclickable', async () => {
    render(<Game />)

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    const turnBtn: HTMLElement = screen.getByTestId('turn-btn');
    const markBtn: HTMLElement = screen.getByTestId('mark-btn');
    const endGameBtn: HTMLElement = screen.getByTestId('end-game-btn');
    
    act(() => userEvent.click(cells[0]));
    await waitFor(() => expect(cells[0]).toHaveTextContent(O_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Bob's turn`);

    act(() => userEvent.dblClick(cells[1]));
    await waitFor(() => expect(cells[1]).toHaveTextContent(S_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Alice's turn`);
    
    act(() => userEvent.click(cells[2]));
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

    // TODO: Bob clicks end game button
    // TODO: status should say "Winner: Bob"
    // TODO: board should be unclickable
});


test('if game ends with draw, status reflect it and board gets unclickable', async () => {
    render(<Game />)

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    const turnBtn: HTMLElement = screen.getByTestId('turn-btn');
    const markBtn: HTMLElement = screen.getByTestId('mark-btn');
    const endGameBtn: HTMLElement = screen.getByTestId('end-game-btn');

    act(() => userEvent.click(cells[0]));
    await waitFor(() => expect(cells[0]).toHaveTextContent(O_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Bob's turn`);

    act(() => userEvent.dblClick(cells[1]));
    await waitFor(() => expect(cells[1]).toHaveTextContent(S_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Alice's turn`);
    
    act(() => userEvent.click(cells[2]));
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
    await waitFor(() => expect(cells[10]).toHaveTextContent(O_TOKEN));
    act(() => userEvent.click(markBtn));
    act(() => userEvent.click(cells[0]));
    act(() => userEvent.click(cells[5]));
    act(() => userEvent.click(cells[10]));
    await screen.findByText('Bob: 1')
    act(() => userEvent.click(markBtn));

    // TODO: Bob clicks end game button
    // TODO: status should say "It's a draw!"
    // TODO: board should be unclickable
});

test('if no body makes a move and game ends, status should reflect a draw and board gets unclickable', async () => {
    render(<Game />)

    const board: HTMLElement = screen.getByTestId('board');
    const endGameBtn: HTMLElement = screen.getByTestId('end-game-btn');

    // TODO: Alice clicks end game button
    // TODO: status should say "It's a draw!"
    // TODO: board should be unclickable
});

test('renders history according to game state', async () => {
    render(<Game />)

    let goToGameStartBtn: HTMLElement | null = screen.queryByText("Go to game start");
    expect(goToGameStartBtn).not.toBeInTheDocument();

    let movesBtns: Array<HTMLElement> = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(0);

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    const turnBtn: HTMLElement = screen.getByTestId('turn-btn');

    act(() => userEvent.click(cells[0]));
    await waitFor(() => expect(cells[0]).toHaveTextContent(O_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Bob's turn`);

    act(() => userEvent.dblClick(cells[1]));
    await waitFor(() => expect(cells[1]).toHaveTextContent(S_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Alice's turn`);

    act(() => userEvent.click(cells[5]));
    await waitFor(() => expect(cells[5]).toHaveTextContent(O_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Bob's turn`);

    goToGameStartBtn = screen.queryByText("Go to game start");
    expect(goToGameStartBtn).toBeInTheDocument();

    movesBtns = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(3);
});

test('shows correct cells if a history record is selected', async () => {
    render(<Game />)

    const board: HTMLElement = screen.getByTestId('board');
    const cells: Array<HTMLElement> = within(board).getAllByRole('button');
    const turnBtn: HTMLElement = screen.getByTestId('turn-btn');

    act(() => userEvent.click(cells[0]));
    await waitFor(() => expect(cells[0]).toHaveTextContent(O_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Bob's turn`);

    act(() => userEvent.dblClick(cells[1]));
    await waitFor(() => expect(cells[1]).toHaveTextContent(S_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Alice's turn`);

    act(() => userEvent.click(cells[5]));
    await waitFor(() => expect(cells[5]).toHaveTextContent(O_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Bob's turn`);

    act(() => userEvent.click(cells[3]));
    await waitFor(() => expect(cells[3]).toHaveTextContent(O_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Alice's turn`);

    const movesBtns: Array<HTMLElement> = screen.queryAllByText("Go to move", { exact: false });
    act(() => userEvent.click(movesBtns[1]));
    expect(movesBtns).toHaveLength(4);

    const selectedRecord: Array<string> = ['O', 'S', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    for (let i = 0; i < cells.length; i++) {
        expect(cells[i]).toHaveTextContent(selectedRecord[i]);
    }

    act(() => userEvent.click(movesBtns[movesBtns.length - 1])); // Return to the last move before making any change to history

    const lastRecord: Array<string> = ['O', 'S', '', 'O', '', 'O', '', '', '', '', '', '', '', '', '', ''];
    for (let i = 0; i < cells.length; i++) {
        expect(cells[i]).toHaveTextContent(lastRecord[i]);
    }
});

test('history can not be edited', async () => {
    render(<Game />)

    const board: HTMLElement = screen.getByTestId('board');
    let cells: Array<HTMLElement> = within(board).getAllByRole('button');
    const turnBtn: HTMLElement = screen.getByTestId('turn-btn');
    const markBtn: HTMLElement = screen.getByTestId('mark-btn');

    // Unnecessary long game
    act(() => userEvent.click(cells[0]));
    await waitFor(() => expect(cells[0]).toHaveTextContent(O_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Bob's turn`);

    act(() => userEvent.dblClick(cells[1]));
    await waitFor(() => expect(cells[1]).toHaveTextContent(S_TOKEN));
    act(() => userEvent.click(turnBtn));
    await screen.findByText(`It's Alice's turn`);
    
    act(() => userEvent.click(cells[2]));
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

    const movesBtns: Array<HTMLElement> = screen.queryAllByText("Go to move", { exact: false });
    expect(movesBtns).toHaveLength(4);
    const currentRecord: Array<string> = ['O', 'S', 'O', '', '', 'S', '', '', '', '', '', '', '', '', '', ''];
    for (let i = 0; i < cells.length; i++) {
        expect(cells[i]).toHaveTextContent(currentRecord[i]);
    }

    act(() => userEvent.click(movesBtns[1]));
    expect(movesBtns).toHaveLength(4);

    cells = within(board).getAllByRole('button');
    const selectedRecord: Array<string> = ['O', 'S', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    for (let i = 0; i < cells.length; i++) {
        expect(cells[i]).toHaveTextContent(selectedRecord[i]);
    }

    const score1: HTMLElement = screen.getByText("Alice: 1");
    expect(score1).toBeInTheDocument();

    const score2: HTMLElement = screen.getByText("Bob: 0");
    expect(score2).toBeInTheDocument();

    /* TODO: prepare game logic for this. Then, uncomment this code
    act(() => userEvent.dblClick(cells[10]));
    await waitFor(() => expect(cells[10]).toHaveTextContent(""));
    */
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