import React, { ReactElement, useContext, useState } from 'react';
import { FormElements, IAddReviewParams, IRestaurant } from '../../types';
import ReactStars from 'react-rating-stars-component';
import Api from '../../api';
import { useMutation } from 'react-query';
import { queryClient } from '../../queryClient';
import { AuthContext } from '../../auth/AuthProvider';
interface FormControls extends HTMLFormControlsCollection {
  text: HTMLTextAreaElement;
}

type ReviewFormElement = FormElements<FormControls>;

function ReviewForm({ restaurant }: { restaurant: string }): ReactElement {
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);
  const { mutate } = useMutation(
    (review: IAddReviewParams) => Api.addReview(review),
    {
      onMutate(review) {
        const cachedRestaurant = queryClient.getQueryData<IRestaurant>([
          'restaurant',
        ]);
        // Optimistically update to the new value
        if (!cachedRestaurant) {
          return {};
        }
        cachedRestaurant.reviews?.push({
          id: '',
          ...review,
          date: new Date().toISOString(),
          response: null,
          response_date: null,
          user: {
            id: user!.id,
            name: user!.name,
          },
        });
        queryClient.setQueryData(['restaurant'], cachedRestaurant);
        return { cachedRestaurant, review };
      },
    }
  );
  const handleSubmit = async (e: React.FormEvent<ReviewFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.elements.text) {
      return '';
    }
    mutate({
      restaurant,
      rating,
      text: e.currentTarget.elements.text.value,
    });
  };
  return (
    <form className="mt-2" onSubmit={handleSubmit}>
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
        name="text"
        id="text"
      ></textarea>
      <button
        type="submit"
        className="border bg-green-400 py-1 px-2 rounded-md"
      >
        Save review
      </button>
    </form>
  );
}

export default ReviewForm;
