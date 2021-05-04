import React, { ReactElement, useState } from 'react';
import { FormElements } from '../../types';
import ReactStars from 'react-rating-stars-component';

interface FormControls extends HTMLFormControlsCollection {
  response: HTMLTextAreaElement;
}

type ReviewFormElement = FormElements<FormControls>;

function ReviewForm(): ReactElement {
  const [rating, setRating] = useState(0);
  const handleSubmit = (e: React.FormEvent<ReviewFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.elements.response) {
      return '';
    }
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
