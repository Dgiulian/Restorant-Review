import React, { ReactElement, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';

function Navbar(): ReactElement {
  const { isLogged, logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
  const isOwner = user && user.role === 'owner';

  return (
    <nav className="w-full border py-4 bg-green-400">
      <div className=" mx-auto flex justify-between items-baseline container">
        <Link to="/" className="text-xl text-green-900">
          Restaurant Review
        </Link>
        <div className="ml-auto mr-1">
          {isOwner && <Link to="/create">Add your restaurant</Link>}
          {isLogged ? (
            <div>
              <span className="mx-1 ">{user?.email}</span>
              <button
                className="mx-1 bg-blue-300 px-2 py-1 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
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
      </div>
    </nav>
  );
}

export default Navbar;
