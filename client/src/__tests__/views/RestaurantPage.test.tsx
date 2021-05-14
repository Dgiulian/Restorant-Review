import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { act } from 'react-dom/test-utils';
import RestaurantPage from '../../views/restaurant';
import { withProviders } from '../utils';

test('renders Restaurant Page', async () => {
  const history = createMemoryHistory();
  history.push('/restaurant/6095e3f76e131b0042df6e95');
  render(withProviders(<RestaurantPage />, history));

  await act(async () => {
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  });
  expect(screen.getByText(/Restaurant Name 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Restaurant Address 1/i)).toBeInTheDocument();
  /*  const linkElement = screen.getByText(/Restaurants Reviews/i);
  expect(linkElement).toBeInTheDocument();
   */
});
