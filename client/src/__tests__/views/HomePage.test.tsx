import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import HomePage from '../../views/home';
import { withProviders } from '../utils';

test('renders Home Page', async () => {
  render(withProviders(<HomePage />));
  const linkElement = screen.getByText(/Restaurants Reviews/i);
  expect(linkElement).toBeInTheDocument();
  await act(async () => {
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    const items = screen.getAllByTestId(/restaurant-card/);
    expect(items).toHaveLength(4);
  });
});
