import React, { ReactElement, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input, PrimaryButton } from '../components/FormElements';
import Api from '../api';
import { AuthContext } from '../auth/AuthProvider';
interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  name: HTMLInputElement;
  owner: HTMLInputElement;
  password: HTMLInputElement;
  password_retype: HTMLInputElement;
}
interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function RegisterPage(): ReactElement {
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const history = useHistory();

  const handleFormSubmit = async (e: React.FormEvent<LoginFormElement>) => {
    e.preventDefault();
    setError('');
    let email = e.currentTarget.elements.email?.value;
    let password = e.currentTarget.elements.password?.value;
    let password_retype = e.currentTarget.elements.password_retype?.value;
    let name = e.currentTarget.elements.name?.value;
    let isOwner = e.currentTarget.elements.owner?.checked;
    if (password !== password_retype) {
      setError('Password does not match retype');
      return;
    }
    try {
      await register({
        email,
        password,
        name,
        role: isOwner ? 'owner' : 'user',
      });
      history.push('/');
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Create an account 🔐
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <Input type="name" id="name" placeholder="Your Name" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input type="email" id="email" placeholder="Your Email" />
          </div>

          <div className="flex justify-between gap-2">
            <div>
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                id="password"
                placeholder="Your Password"
              />
            </div>

            <div className="">
              <label htmlFor="password_retype">Verify Password</label>
              <Input
                type="password"
                id="password_retype"
                placeholder="Retype your Password"
              />
            </div>
          </div>
          <div>
            <input type="checkbox" id="owner" className="mr-1" />
            <label htmlFor="owner">I'm a restaurant owner</label>
          </div>
          {error && <p className="text-red-600 mt-2">{error}</p>}
          <div className="flex justify-center items-center mt-4">
            <PrimaryButton>Create account</PrimaryButton>
          </div>
          <hr className="border-gray-200  my-4" />
          <div className="flex flex-col justify-center items-center mt-4">
            <p className="mb-2">Already have an account?</p>
            <Link
              className="bg-blue-500 py-2 px-4 text-sm text-white rounded border border-blue-500 focus:outline-none focus:border-blue-dark"
              to="/login"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default RegisterPage;
