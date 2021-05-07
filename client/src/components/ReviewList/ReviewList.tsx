import React, { ReactElement } from 'react';
import ReviewItem from './ReviewItem';
import { IReview } from '../../types';
interface ReviewListProps {
  reviews?: IReview[];
}
function ReviewList({ reviews }: ReviewListProps): ReactElement {
  return (
    <div>
      {reviews &&
        reviews.map((item: IReview) => (
          <ReviewItem key={item.id} review={item} />
        ))}
    </div>
  );
}

export default ReviewList;
