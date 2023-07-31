import { render, screen } from '@testing-library/react';
import ScorePanel from './ScorePanel';

test('shows info correctly', () => {
    const scores = {"Claire": 10, "Danny": 6};
    render(<ScorePanel scores={scores} />);

    const score1: HTMLElement = screen.getByText("Claire: 10");
    expect(score1).toBeInTheDocument();

    const score2: HTMLElement = screen.getByText("Danny: 6");
    expect(score2).toBeInTheDocument();
});