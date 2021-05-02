import React, { ReactElement, ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './queryClient';

interface Props {
  children: ReactNode;
}

function Providers({ children }: Props): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default Providers;
