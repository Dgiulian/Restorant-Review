import React, { ReactElement, ChangeEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input, PrimaryButton } from '../components/FormElements';
import Layout from '../components/Layout';
import Api from '../api';
import { useForm } from 'react-hook-form';
import FormValidationError from '../components/FormElements/FormValidationError';

interface IFormData {
  name: string;
  image: FileList;
  address: string;
  description: string;
}

function CreateRestaurantPage(): ReactElement {
  const history = useHistory();
  const [previewImage, setPreviewImage] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    mode: 'onChange',
  });
  const onSubmit = async (data: IFormData) => {
    const response = await Api.createRestaurant(data);
    history.push(`/restaurant/${response.data.id}`);
  };
  return (
    <Layout>
      <form className="mt-16" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl mb-4">Create a new restaurant</h1>
        <div className="max-w-md">
          <div className="max-w-md">
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              id="name"
              {...register('name', { required: true })}
            />
          </div>
          <div className="max-w-md">
            <label htmlFor="address">Address</label>
            <Input type="text" id="address" {...register('address')} />
            <FormValidationError value={errors.name} />
          </div>
          <div className="max-w-md">
            <label htmlFor="description" className="block">
              Restaurant description
            </label>
            <textarea
              className="border rounded-md w-full h-24 p-1"
              id="description"
              {...register('description', { required: false })}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="image"
              className="p-4 border-dashed border-4 max-w-md border-gray-600 block cursor-pointer"
            >
              Click to add image (16:9)
            </label>
            <Input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              {...register('image', {})}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event?.target?.files?.[0]) {
                  const file = event.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <FormValidationError value={errors.name} />
          </div>
          <div>
            {previewImage ? (
              <img
                src={previewImage}
                alt="Restaurant preview"
                className="mt-4 object-cover "
                style={{ width: '576px', height: `${(9 / 16) * 576}px` }}
              />
            ) : null}
          </div>
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
