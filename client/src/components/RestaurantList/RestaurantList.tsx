import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { getRestaurantList } from '../../api';
import { ApiResponse, IRestaurant } from '../../types';
import RestaurantCard from './RestaurantCard';

function RestaurantList(): ReactElement {
  const { isLoading, error, data } = useQuery<ApiResponse<IRestaurant>>(
    'restaurantList',
    getRestaurantList
  );
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>An error has occured</p>;
  }

  return (
    <div className="lg:flex items-center container mx-auto my-auto">
      {data!.results.map((item: IRestaurant) => (
        <RestaurantCard key={item.id} restaurant={item} />
      ))}
    </div>
  );
}

export default RestaurantList;
