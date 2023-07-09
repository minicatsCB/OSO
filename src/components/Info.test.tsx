import { render, screen } from '@testing-library/react';
import Info from './Info';

test('shows info correctly', () => {
    const activePlayer: string = "Claire";
    const scores = [{player: "Claire", points: 10}, {player: "Danny", points: 6}];
    render(<Info activePlayer={activePlayer} scores={scores} />);

    const turn: HTMLElement = screen.getByText(`It's ${activePlayer}'s turn`);
    expect(turn).toBeInTheDocument();

    const score1: HTMLElement = screen.getByText("Claire: 10");
    expect(score1).toBeInTheDocument();

    const score2: HTMLElement = screen.getByText("Danny: 6");
    expect(score2).toBeInTheDocument();
});