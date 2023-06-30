import { render, screen } from '@testing-library/react';
import Info from './Info';

test('shows status correctly', () => {
    const status = "Sample status";
    render(<Info status={status} />);

    const titleElement = screen.getByText(status);
    expect(titleElement).toBeInTheDocument();
});