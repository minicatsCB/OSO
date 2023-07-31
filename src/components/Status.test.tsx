import { render, screen } from '@testing-library/react';
import Status from './Status';


test('renders status correctly', () => {
    const activePlayer: string = "Claire";

    render(
        <Status activePlayer={activePlayer}></Status>
    );

    const status: HTMLElement = screen.getByText(`It's ${activePlayer}'s turn`);
    expect(status).toBeInTheDocument();
});