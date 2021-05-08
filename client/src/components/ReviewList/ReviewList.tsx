import React, { ReactElement, useContext } from 'react';
import ReviewItem from './ReviewItem';
import { IReview } from '../../types';
import { AuthContext } from '../../auth/AuthProvider';
interface ReviewListProps {
  reviews?: IReview[];
  isRestaurantOwner: boolean;
}
function ReviewList({
  reviews,
  isRestaurantOwner,
}: ReviewListProps): ReactElement {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {reviews &&
        reviews.map((item: IReview) => (
          <ReviewItem
            key={item.id}
            review={item}
            isRestaurantOwner={isRestaurantOwner}
            user={user}
          />
        ))}
    </div>
  );
}

export default ReviewList;
