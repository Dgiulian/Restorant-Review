import React, { ReactElement, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';

function Navbar(): ReactElement {
  const { isLogged, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="w-full border py-4 bg-green-400">
      <div className=" mx-auto flex justify-between items-baseline container">
        <Link to="/" className="text-xl text-green-900">
          Restaurant Review
        </Link>
        {isLogged ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link className="mx-1 bg-blue-300 px-2 py-1 rounded" to="/login">
              Login
            </Link>
            <Link className="mx-1 text-green-900" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
