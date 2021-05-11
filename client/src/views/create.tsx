import React, { ChangeEvent, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaImage } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import Api from '../api';
import { Input, PrimaryButton } from '../components/FormElements';
import FormValidationError from '../components/FormElements/FormValidationError';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';

interface IFormData {
  name: string;
  image: FileList;
  address: string;
  description: string;
}

function CreateRestaurantPage(): ReactElement {
  const history = useHistory();
  const [previewImage, setPreviewImage] = useState<string>('');
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>({
    mode: 'onChange',
  });
  const onSubmit = async (data: IFormData) => {
    const response = await Api.createRestaurant(data);
    history.push(`/restaurant/${response.data.id}`);
  };
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0]) {
      const file = event.target.files[0];
      handleImagePreview(file);
    }
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDraggedOver(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDraggedOver(false);
    const files = Array.from(e.dataTransfer.files).filter((file: any) =>
      file.type.startsWith('image/')
    );
    if (files.length) {
      setValue('image', e.dataTransfer.files, { shouldValidate: true });
      handleImagePreview(files[0] as Blob);
    }
  };

  const handleImagePreview = (file: Blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };
  return (
    <Layout>
      <PageTitle title="Add your restaurant" />
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
              className={`mt-2 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                isDraggedOver
                  ? 'border-blue-300 text-blue-300'
                  : 'border-gray-300 text-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              data-testid="drop-files"
            >
              <FaImage
                className={`mx-auto h-12 w-12 ${
                  isDraggedOver ? 'text-blue-300' : 'text-gray-300'
                }`}
              />
              Click to add image (16:9)
            </label>
            <Input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              {...register('image', {})}
              onChange={handleFileSelect}
            />
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
