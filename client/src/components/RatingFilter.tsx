import React, { ReactElement } from 'react';
import { FaStar } from 'react-icons/fa';
import classnames from 'classnames';

interface Props {
  selectedRating: number;
  onSelectRating: React.Dispatch<React.SetStateAction<number>>;
}

function RatingFilter({ selectedRating, onSelectRating }: Props): ReactElement {
  const ratings = [1, 2, 3, 4, 5];
  return (
    <div className="flex space-x-2">
      {ratings.map((rating: number) => (
        <div
          key={rating}
          className={classnames(
            'relative',
            'flex',
            'items-center',
            'justify-center',
            'cursor-pointer',
            rating === selectedRating ? 'text-yellow-400' : 'text-gray-600'
          )}
          onClick={() => onSelectRating(rating === selectedRating ? 0 : rating)}
        >
          <FaStar className="w-10 h-10" />
          <span
            className={classnames(
              'absolute',
              rating === selectedRating ? 'text-black' : 'text-white'
            )}
          >
            {rating}
          </span>
        </div>
      ))}
    </div>
  );
}

export default RatingFilter;
