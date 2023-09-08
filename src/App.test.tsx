import { render, screen, within } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);

  const title: HTMLElement = screen.getByText(/OSO game/i);
  expect(title).toBeInTheDocument();
});

test('renders action buttons', () => {
  render(<App />);

  const turnBtn: HTMLElement = screen.getByTestId('turn-btn');
  const markBtn: HTMLElement = screen.getByTestId('mark-btn');
  const endGameBtn: HTMLElement = screen.getByTestId('end-game-btn');

  expect(turnBtn).toBeInTheDocument();
  expect(markBtn).toBeInTheDocument();
  expect(endGameBtn).toBeInTheDocument();
});

test('renders status', () => {
  render(<App />);

  const info: HTMLElement = screen.getByText(`It's Alice's turn`);
  expect(info).toBeInTheDocument();
});

test('renders score panel', () => {
  render(<App />);

  const score1: HTMLElement = screen.getByText("Alice: 0");
  expect(score1).toBeInTheDocument();

  const score2: HTMLElement = screen.getByText("Bob: 0");
  expect(score2).toBeInTheDocument();
});

test('renders board', () => {
  render(<App />);
  const board: HTMLElement = screen.getByTestId('board');
  const cells: Array<HTMLElement> = within(board).getAllByRole('button');
  expect(cells.length).toBeGreaterThanOrEqual(1);
});

