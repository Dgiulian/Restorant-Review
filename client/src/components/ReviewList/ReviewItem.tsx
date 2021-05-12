import { formatDistance, parseISO } from 'date-fns';
import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';
import ReactStars from 'react-rating-stars-component';
import { IRestaurant, IReview, IUser } from '../../types';
import ReviewResponse from './ReviewResponse';
import ReviewResponseForm from './ReviewResponseForm';
import Api from '../../api';
import { queryClient } from '../../queryClient';
import Pill from '../Pill';

interface Props {
  review: IReview;
  isRestaurantOwner: boolean;
  user: IUser | undefined;
  best?: boolean;
  worst?: boolean;
}

function ReviewItem({
  review,
  isRestaurantOwner,
  user,
  best = false,
  worst = false,
}: Props): ReactElement {
  const { mutate } = useMutation(
    (reviewId: string) => Api.removeReview(reviewId),
    {
      async onMutate(reviewId: string) {
        const cachedRestaurant = queryClient.getQueryData<IRestaurant>([
          'restaurant',
        ]);
        // Optimistically update to the new value
        if (!cachedRestaurant) {
          return {};
        }
        cachedRestaurant.reviews = cachedRestaurant.reviews!.filter(
          (review) => review.id === reviewId
        );
        queryClient.setQueryData(['restaurant'], cachedRestaurant);
        return { cachedRestaurant, review };
      },
    }
  );
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete the review?')) {
      mutate(review.id);
    }
  };
  return (
    <div className="my-4">
      <div className="text-gray-800 text-lg">
        {review.user.name}
        {best && !worst ? <Pill text="Top" variant="best" /> : null}
        {worst && !best ? <Pill text="Worst" variant="worst" /> : null}
        {user && review.user?.id === user?.id && (
          <button className="ml-4 text-red-500" onClick={handleDelete}>
            remove
          </button>
        )}
      </div>
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
