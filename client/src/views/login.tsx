import React, { ReactElement, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import { Input, PrimaryButton } from '../components/FormElements';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function LoginPage(): ReactElement {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState('');
  const history = useHistory();
  const handleFormSubmit = async (e: React.FormEvent<LoginFormElement>) => {
    e.preventDefault();

    let email = e.currentTarget.elements.email?.value;
    let password = e.currentTarget.elements.password?.value;
    try {
      await authContext.login({ email, password });
      history.push('/');
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Log in to your account 🔐
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <Input type="email" id="email" placeholder="Your Email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input type="password" id="password" placeholder="Your Password" />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-center items-center mt-4">
            <PrimaryButton>Login</PrimaryButton>
          </div>
          <hr className="border-gray-200  my-4" />
          <div className="flex justify-center items-baseline mt-4">
            <span className="mb-2">Dont have an account?</span>
            <Link
              className="text-blue-500 py-2 px-2 text-sm rounded focus:outline-none focus:border-blue-dark"
              to="/register"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
