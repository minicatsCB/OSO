import { render, screen } from '@testing-library/react';
import Cell from './Cell';
import { O_TOKEN, SECOND_CLICK_WAIT_TIME } from '../core/constants';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

test('should render empty correctly', async () => {
  const onClick = jest.fn();

  render(<Cell key="0-1" index={1} value={''} onClick={onClick}></Cell>);

  const cells = screen.getAllByRole('button');
  expect(cells[0]).toBeEmptyDOMElement();
});

test('should render value correctly', async () => {
  const onClick = jest.fn();

  render(<Cell key="2-0" index={6} value={O_TOKEN} onClick={() => onClick(0, 1)}></Cell>);

  const cells = screen.getAllByRole('button');
  expect(cells[0]).toHaveTextContent(O_TOKEN);
});

test('should call hadler correctly on single click', async () => {
  const onClick = jest.fn();

  render(<Cell key="1-2" index={5} value={''} onClick={onClick}></Cell>);

  const cells = screen.getAllByRole('button');
  userEvent.click(cells[0]);
  jest.advanceTimersByTime(SECOND_CLICK_WAIT_TIME);
  expect(onClick).toHaveBeenCalledWith(5, 1);
});

test('should call hadler correctly on double click', async () => {
  const onClick = jest.fn();

  render(<Cell key="1-2" index={5} value={''} onClick={onClick}></Cell>);

  const cells = screen.getAllByRole('button');
  userEvent.dblClick(cells[0]);
  expect(onClick).toHaveBeenCalledWith(5, 2);
});