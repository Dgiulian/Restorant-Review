import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import HomePage from '../../views/home';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { queryClient } from '../../queryClient';
import { QueryClientProvider } from 'react-query';
import { act } from 'react-dom/test-utils';

test('renders Home Page', async () => {
  const history = createMemoryHistory();
  render(
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <HomePage />
      </Router>
    </QueryClientProvider>
  );
  const linkElement = screen.getByText(/Restaurants Reviews/i);
  expect(linkElement).toBeInTheDocument();
  await act(async () => {
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    const items = screen.getAllByTestId(/restaurant-card/);
    expect(items).toHaveLength(4);
  });
});
