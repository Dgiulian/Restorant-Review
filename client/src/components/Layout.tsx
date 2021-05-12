import React, { ReactElement, ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface Props {
  children: ReactNode;
  hero?: ReactNode;
}

function Layout({ children, hero }: Props): ReactElement {
  return (
    <main className="flex flex-col justify-between min-h-screen">
      <header>
        <Navbar />
      </header>
      <section className="flex-1">
        {hero}
        <div className="container mx-auto">{children}</div>
      </section>
      <Footer />
    </main>
  );
}

export default Layout;
