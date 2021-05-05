import React, { ReactElement, ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './queryClient';
import { AuthProvider } from './auth/AuthProvider';
interface Props {
  children: ReactNode;
}

function Providers({ children }: Props): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}

export default Providers;
