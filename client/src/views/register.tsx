import React, { ReactElement, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import { Input, PrimaryButton } from '../components/FormElements';
import FormValidationError from '../components/FormElements/FormValidationError';
import PageTitle from '../components/PageTitle';

interface FormValues {
  email: string;
  name: string;
  owner: boolean;
  password: string;
  password_retype: string;
}

function RegisterPage(): ReactElement {
  const [error, setError] = useState('');
  const { register: apiRegister } = useContext(AuthContext);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>();
  const repeatVal = (password_retype: string) =>
    password_retype === getValues().password || 'Passwords do not match';
  const validateRepeat = () => {
    if (isSubmitted) {
      // adjust this accordingly to differen validation modes. I assume "onSubmit" and "onChange" for revalidation here.
      trigger('password_retype');
    }
  };
  const handleFormSubmit = async (data: FormValues) => {
    const { email, password, name, password_retype, owner } = data;
    setError('');
    if (password !== password_retype) {
      setError('Password does not match retype');
      return;
    }
    try {
      await apiRegister({
        email,
        password,
        name,
        role: owner ? 'owner' : 'user',
      });
      history.push('/');
    } catch (e) {
      setError(e.message);
    }
  };
  const passwordValidationOptions = {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long',
    },
    validate: (value: string) =>
      !value.match(/\d/) || !value.match(/[a-zA-Z]/)
        ? 'Password must contain at least 1 letter and 1 number'
        : undefined,
  };
  return (
    <div className="h-screen flex bg-gray-bg1">
      <PageTitle title="Register" />
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Create an account 🔐
        </h1>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <label htmlFor="name">Name</label>
            <Input
              type="name"
              id="name"
              placeholder="Your Name"
              {...register('name', { required: 'Name is required' })}
            />
            <FormValidationError value={errors.name} />
          </div>
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

          <div className="flex justify-between gap-2">
            <div>
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                id="password"
                placeholder="Your Password"
                {...register('password', passwordValidationOptions)}
                onChange={validateRepeat}
              />
              <FormValidationError value={errors.password} />
            </div>

            <div className="">
              <label htmlFor="password_retype">Verify Password</label>
              <Input
                type="password"
                id="password_retype"
                placeholder="Retype your Password"
                {...register('password_retype', {
                  ...passwordValidationOptions,
                  validate: repeatVal,
                })}
              />
              <FormValidationError value={errors.password_retype} />
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              id="owner"
              className="mr-1"
              {...register('owner')}
            />
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
