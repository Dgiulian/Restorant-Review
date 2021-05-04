import React, { ReactElement } from 'react';
import { FormElements } from '../../types';

interface FormControls extends HTMLFormControlsCollection {
  response: HTMLTextAreaElement;
}

type ReviewResponseFormElement = FormElements<FormControls>;

function ReviewResponseForm(): ReactElement {
  const handleSubmit = (e: React.FormEvent<ReviewResponseFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.elements.response) {
      return '';
    }
  };
  return (
    <form className="ml-6 mt-2" onSubmit={handleSubmit}>
      <textarea
        placeholder="Add a response"
        className="border w-full p-2"
      ></textarea>
      <button
        type="submit"
        className="border bg-green-400 py-1 px-2 rounded-md"
      >
        Save
      </button>
    </form>
  );
}

export default ReviewResponseForm;
