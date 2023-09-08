import { render, screen } from '@testing-library/react';
import Scoreboard from './Scoreboard';
import { Scores } from '../core/models';

test('shows info correctly', () => {
    const scores: Scores = [ { name: 'pepe', points: 10 }, { name: 'maría', points: 5 } ];
    render(<Scoreboard scores={scores} />);

    const score1: HTMLElement = screen.getByText("Claire: 10");
    expect(score1).toBeInTheDocument();

    const score2: HTMLElement = screen.getByText("Danny: 6");
    expect(score2).toBeInTheDocument();
});