import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

function Navbar(): ReactElement {
  return (
    <nav className="w-full border py-4 px-2 bg-green-400">
      <Link to="/" className="text-xl text-green-900">
        Restaurant Review
      </Link>
    </nav>
  );
}

export default Navbar;
