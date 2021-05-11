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
    <nav className="w-full py-4 bg-green-700">
      <div className=" mx-auto flex justify-between items-baseline container">
        <Link to="/" className="text-xl text-white">
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
              <Link className="mx-1 text-white" to="/login">
                Login
              </Link>
              <Link
                className="mx-1 bg-blue-900 text-white  px-2 py-1 rounded"
                to="/register"
              >
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
