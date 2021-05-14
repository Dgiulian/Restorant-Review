import React, { ReactElement, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import ReactStars from 'react-rating-stars-component';
import Api from '../../api';
import { AuthContext } from '../../auth/AuthProvider';
import { queryClient } from '../../queryClient';
import { IAddReviewParams, IRestaurant } from '../../types';
interface FormValues {
  text: string;
}

function ReviewForm({ restaurant }: { restaurant: string }): ReactElement {
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, formState } = useForm<FormValues>({
    mode: 'onChange',
  });
  const { errors, isValid, isDirty } = formState;

  const { mutate } = useMutation(
    (review: IAddReviewParams) => Api.addReview(review),
    {
      async onSuccess({ data }, variables) {
        const cachedRestaurant = queryClient.getQueryData<IRestaurant>([
          'restaurant',
          restaurant,
        ]);
        // Optimistically update to the new value
        if (!cachedRestaurant) {
          return {};
        }
        cachedRestaurant.reviews?.push({
          ...data,
          user: {
            id: user!.id,
            name: user!.name,
          },
        });

        queryClient.setQueryData(['restaurant', restaurant], cachedRestaurant);
        return { cachedRestaurant, data };
      },
    }
  );
  const onSubmit = async (data: FormValues) => {
    mutate({
      restaurant,
      rating,
      text: data.text,
    });
  };

  return (
    <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
      <span className="text-xl">Add your review</span>
      <ReactStars
        count={5}
        size={25}
        value={rating}
        onChange={setRating}
        edit={true}
      />
      <textarea
        placeholder="Add a review"
        className="border w-full p-2"
        id="text"
        {...register('text', { required: true })}
      ></textarea>
      {errors.text && <p>errors.text</p>}
      <button
        type="submit"
        className="border bg-green-400 py-1 px-2 rounded-md disabled:opacity-50"
        disabled={!isDirty || !isValid || rating === 0}
      >
        Save review
      </button>
    </form>
  );
}

export default ReviewForm;
