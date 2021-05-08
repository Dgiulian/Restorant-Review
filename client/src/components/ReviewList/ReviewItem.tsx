import { formatDistance, parseISO } from 'date-fns';
import React, { ReactElement } from 'react';
import ReactStars from 'react-rating-stars-component';
import { IReview } from '../../types';
import ReviewResponse from './ReviewResponse';
import ReviewResponseForm from './ReviewResponseForm';

interface Props {
  review: IReview;
  isRestaurantOwner: boolean;
}

function ReviewItem({ review, isRestaurantOwner }: Props): ReactElement {
  return (
    <div className="my-4">
      <div className="text-gray-800 text-lg">{review.user.name}</div>
      <div className="flex align-middle">
        <ReactStars count={5} size={20} value={review.rating} edit={false} />
        <span className="ml-4 pt-1 text-gray-600 text-sm">
          {formatDistance(parseISO(review.date), new Date(), {
            addSuffix: true,
          })}
        </span>
      </div>
      <p className="">{review.text}</p>
      {review.response ? (
        <ReviewResponse date={review.response_date} text={review.response} />
      ) : isRestaurantOwner ? (
        <ReviewResponseForm reviewId={review.id} />
      ) : null}
    </div>
  );
}

export default ReviewItem;
