import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const titleElement = screen.getByText(/OSO game/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders info panel', () => {
  render(<App />);
  const infoElement = screen.getByText(/Next player:/i);
  expect(infoElement).toBeInTheDocument();
});

test('renders board', () => {
  render(<App />);
  const clickableCells = screen.getAllByRole('button');
  expect(clickableCells).toHaveLength(9); // Assume board dimensions are 3x3
});

