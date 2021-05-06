import React, { ReactElement } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input, PrimaryButton } from '../components/FormElements';
import Layout from '../components/Layout';
import Api from '../api';

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  address: HTMLInputElement;
  description: HTMLTextAreaElement;
}
interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function CreateRestaurantPage(): ReactElement {
  const history = useHistory();
  const handleSubmit = async (e: React.FormEvent<LoginFormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.elements.name.value;
    const address = e.currentTarget.elements.address.value;
    const description = e.currentTarget.elements.description.value;
    const response = await Api.createRestaurant({ name, address, description });
    history.push(`/restaurant/${response.data.id}`);
  };
  return (
    <Layout>
      <form className="mt-16" onSubmit={handleSubmit}>
        <h1 className="text-2xl mb-4">Create a new restaurant</h1>
        <div className="max-w-md">
          <label htmlFor="name">Restaurant name</label>
          <Input type="text" name="name" id="name" />
        </div>
        <div className="max-w-md">
          <label htmlFor="address">Restaurant address</label>
          <Input type="text" name="address" id="address" />
        </div>
        <div className="max-w-md">
          <label htmlFor="description" className="block">
            Restaurant description
          </label>
          <textarea
            className="border rounded-md w-full h-24 p-1"
            name="description"
            id="description"
          ></textarea>
        </div>
        <div className="mt-4">
          <PrimaryButton>Save</PrimaryButton>
          <Link to="/" className="mx-2">
            Cancel
          </Link>
        </div>
      </form>
    </Layout>
  );
}

export default CreateRestaurantPage;
