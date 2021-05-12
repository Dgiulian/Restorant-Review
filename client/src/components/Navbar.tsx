import React, { ReactElement, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import Dropdown from './Dropdown';

function Navbar(): ReactElement {
  const { isLogged, logout, user } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/');
  };
  const isOwner = user && user.role === 'owner';

  return (
    <nav className="w-full py-4 bg-green-700">
      <div className=" mx-auto flex justify-between items-baseline container">
        <Link to="/" className="text-xl text-white">
          Restaurant Review
        </Link>
        <div className="ml-auto mr-1">
          {/* Add your restaurant</Link> */}

          {isLogged ? (
            <Dropdown title={user?.email || ''}>
              {isOwner && (
                <>
                  <Link
                    to="/manage"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-green-300"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-1"
                  >
                    Manage your restaurants
                  </Link>
                  <Link
                    to="/create"
                    href="/#"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-green-300"
                    role="menuitem"
                    tabIndex={-1}
                    test-id="menu-item-2"
                  >
                    Add your restaurant
                  </Link>
                </>
              )}
              <button
                className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-green-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </Dropdown>
          ) : (
            <>
              <Link className="mx-1 text-white" to="/login">
                Login
              </Link>
              <Link
                className="mx-1 bg-blue-900 text-white  px-2 py-1 rounded w-full "
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
