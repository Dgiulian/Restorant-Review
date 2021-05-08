import React, { ReactElement } from 'react';
import { FormElements, IRestaurant } from '../../types';
import Api from '../../api';
import { useMutation } from 'react-query';
import { queryClient } from '../../queryClient';

interface FormControls extends HTMLFormControlsCollection {
  response: HTMLTextAreaElement;
}

type ReviewResponseFormElement = FormElements<FormControls>;

interface ReviewResponseProps {
  reviewId: string;
}

function ReviewResponseForm({ reviewId }: ReviewResponseProps): ReactElement {
  const { mutate, isLoading } = useMutation(
    (response: string) => Api.addResponse(reviewId, { text: response }),
    {
      async onMutate(response, ...args) {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(['restaurant']);

        // Snapshot the previous value
        const restaurant = queryClient.getQueryData<IRestaurant>([
          'restaurant',
        ]);

        // Optimistically update to the new value
        if (!restaurant) {
          return {};
        }
        const review = restaurant.reviews?.find((rev) => rev.id === reviewId);
        if (review) {
          review.response = response;
          review.response_date = new Date().toISOString();
        }
        queryClient.setQueryData(['restaurant'], restaurant);

        // Return a context with the previous and new todo
        return { restaurant, review };
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<ReviewResponseFormElement>) => {
    e.preventDefault();
    const response = e.currentTarget.elements.response.value;
    if (!response) {
      return '';
    }
    mutate(response);
  };
  return (
    <form className="ml-6 mt-2" onSubmit={handleSubmit}>
      <textarea
        placeholder="Add a response"
        className="border w-full p-2"
        name="response"
      ></textarea>
      <button
        type="submit"
        className="border bg-green-400 py-1 px-2 rounded-md"
        disabled={isLoading}
      >
        Save
      </button>
    </form>
  );
}

export default ReviewResponseForm;
