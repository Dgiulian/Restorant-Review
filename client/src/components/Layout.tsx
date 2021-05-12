import React, { ReactElement, ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface Props {
  children: ReactNode;
  hero?: ReactNode;
}

function Layout({ children, hero }: Props): ReactElement {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        {hero}
        <div className="container mx-auto">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
