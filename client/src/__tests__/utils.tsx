import { createMemoryHistory } from 'history';
import React, { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { Router } from 'react-router-dom';
import { queryClient } from '../queryClient';

export function withProviders(
  component: ReactNode,
  history = createMemoryHistory()
) {
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>{component}</Router>
    </QueryClientProvider>
  );
}

test.skip('skip', () => {});
