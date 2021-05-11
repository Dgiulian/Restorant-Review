import React, { ReactElement, ReactNode } from 'react';
import Navbar from './Navbar';

interface Props {
  children: ReactNode;
  hero?: ReactNode;
}

function Layout({ children, hero }: Props): ReactElement {
  return (
    <main>
      <Navbar />
      {hero}
      <div className="container mx-auto">{children}</div>
    </main>
  );
}

export default Layout;
