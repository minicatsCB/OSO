import { render, screen } from '@testing-library/react';
import Status from './Status';


test('renders status correctly', () => {
    const message: string = "It's Ellie's turn";

    render(
        <Status message={message}></Status>
    );

    const status: HTMLElement = screen.getByText(message);
    expect(status).toBeInTheDocument();
});