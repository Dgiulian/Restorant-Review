import React, { ReactElement, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import { Input, PrimaryButton } from '../components/FormElements';
import { useForm } from 'react-hook-form';
import FormValidationError from '../components/FormElements/FormValidationError';

type FormValues = {
  email: string;
  password: string;
};
function LoginPage(): ReactElement {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(null);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      await authContext.login(data);
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              placeholder="Your Email"
              {...register('email', { required: 'Email fileld is required' })}
            />
            <FormValidationError value={errors.email} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              placeholder="Your Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
                validate: (value) =>
                  !value.match(/\d/) || !value.match(/[a-zA-Z]/)
                    ? 'Password must contain at least 1 letter and 1 number'
                    : undefined,
              })}
            />
            <FormValidationError value={errors.password} />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-center items-center mt-4">
            <PrimaryButton type="submit">Login</PrimaryButton>
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
