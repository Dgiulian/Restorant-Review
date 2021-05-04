import { formatDistance } from 'date-fns';
import React, { ReactElement } from 'react';
import ReactStars from 'react-rating-stars-component';
import { IReview } from '../../types';
import ReviewResponse from './ReviewResponse';
import ReviewResponseForm from './ReviewResponseForm';

interface Props {
  review: IReview;
}

function ReviewItem({ review }: Props): ReactElement {
  return (
    <div className="my-4 p-2 p">
      <span className="font-bold text-md">{review.name}</span>
      <div className="flex align-middle">
        <ReactStars count={5} size={20} value={review.rating} edit={false} />
        <span className="ml-4 pt-1 text-gray-600">
          {formatDistance(review.date, new Date(), {
            addSuffix: true,
          })}
        </span>
      </div>
      <p>{review.review}</p>
      {review.response ? (
        <ReviewResponse date={review.response_date} text={review.response} />
      ) : (
        <ReviewResponseForm />
      )}
    </div>
  );
}

export default ReviewItem;
