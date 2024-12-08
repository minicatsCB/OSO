import { act, render, screen } from '@testing-library/react';
import Cell from './Cell';
import { O_TOKEN, S_TOKEN, SECOND_CLICK_WAIT_TIME } from '../core/constants';
import { clickCells } from '../core/test-helpers';

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

test('should render empty correctly', async () => {
  const onClick = jest.fn();

  render(<Cell key="0-1" index={1} row={0} col={1} onClick={onClick}></Cell>);

  const cells = screen.getAllByRole('button');
  expect(cells[0]).toBeEmptyDOMElement();
});

test('should call handler correctly on single click', async () => {
  const onClick = jest.fn();

  render(<Cell key="1-2" index={5} row={1} col={2} onClick={onClick}></Cell>);

  const cells = screen.getAllByRole('button');
  await clickCells([cells[0]]);
  act(() => {jest.advanceTimersByTime(SECOND_CLICK_WAIT_TIME);  });
  expect(onClick).toHaveBeenCalledWith({ index: 5, token: O_TOKEN });
});

test('should call hadnler correctly on double click', async () => {
  const onClick = jest.fn();

  render(<Cell key="1-2" index={5} row={1} col={2}onClick={onClick}></Cell>);

  const cells = screen.getAllByRole('button');
  await clickCells([cells[0]], true);
  expect(onClick).toHaveBeenCalledWith({ index: 5, token: S_TOKEN });
});