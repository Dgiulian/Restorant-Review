import React, { ReactElement, ReactNode } from 'react';
import Navbar from './Navbar';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props): ReactElement {
  return (
    <main>
      <Navbar />
      <div className="container mx-auto">{children}</div>
    </main>
  );
}

export default Layout;
