import React, { ReactElement, useContext } from 'react';
import ReviewItem from './ReviewItem';
import { IReview } from '../../types';
import { AuthContext } from '../../auth/AuthProvider';
import { minBy, maxBy } from 'lodash';
interface ReviewListProps {
  reviews?: IReview[];
  isRestaurantOwner: boolean;
}

function ReviewList({
  reviews,
  isRestaurantOwner,
}: ReviewListProps): ReactElement {
  const { user } = useContext(AuthContext);
  const topReview = maxBy<IReview>(reviews, (r) => r.rating);
  const worstReview = minBy<IReview>(reviews, (r) => r.rating);

  return (
    <div>
      {reviews &&
        reviews.map((item: IReview) => (
          <ReviewItem
            key={item.id}
            review={item}
            isRestaurantOwner={isRestaurantOwner}
            user={user}
            best={topReview?.id === item.id}
            worst={worstReview?.id === item.id}
          />
        ))}
    </div>
  );
}

export default ReviewList;
