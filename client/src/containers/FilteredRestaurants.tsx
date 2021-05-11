import React, { ReactElement, useState } from 'react';
import RatingFilter from '../components/RatingFilter';
import RestaurantList from '../components/RestaurantList';

function FilteredRestaurants(): ReactElement {
  const [rating, setRating] = useState(0);
  return (
    <div>
      <div className="ml-auto">
        <h2 className="text-lg">Filter by rating</h2>
        <div className="mb-4">
          <RatingFilter selectedRating={rating} onSelectRating={setRating} />
        </div>
      </div>
      <RestaurantList filter={rating} />
    </div>
  );
}

export default FilteredRestaurants;
