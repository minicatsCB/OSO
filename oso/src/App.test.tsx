import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const title: HTMLElement = screen.getByText(/OSO game/i);
  expect(title).toBeInTheDocument();
});

test('renders info panel', () => {
  render(<App />);
  const info: HTMLElement = screen.getByText(/Next player:/i);
  expect(info).toBeInTheDocument();
});

test('renders board', () => {
  render(<App />);
  const clickableCells: Array<HTMLElement> = screen.getAllByRole('button');
  expect(clickableCells.length).toBeGreaterThanOrEqual(1);
});

