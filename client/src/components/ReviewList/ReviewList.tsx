import React, { ReactElement } from 'react';
import ReviewItem from './ReviewItem';
import { IReview } from '../../types';
interface ReviewListProps {
  reviews?: IReview[];
  isRestaurantOwner: boolean;
}
function ReviewList({
  reviews,
  isRestaurantOwner,
}: ReviewListProps): ReactElement {
  return (
    <div>
      {reviews &&
        reviews.map((item: IReview) => (
          <ReviewItem
            key={item.id}
            review={item}
            isRestaurantOwner={isRestaurantOwner}
          />
        ))}
    </div>
  );
}

export default ReviewList;
