import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { getRestaurantList } from '../../api';
import { ApiResponse, IRestaurant } from '../../types';
import RestaurantCard from './RestaurantCard';
interface RestaurantListProps {
  filter: number;
}
type useQueryParams = [string, { filter: number }];

function RestaurantList({ filter }: RestaurantListProps): ReactElement {
  const { isLoading, error, data } = useQuery<
    ApiResponse<IRestaurant[]>,
    any,
    ApiResponse<IRestaurant[]>,
    useQueryParams
  >(['restaurantList', { filter }], ({ queryKey }) =>
    getRestaurantList(queryKey[1].filter)
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
      {data!.results.length === 0 && (
        <p className="text-center text-xl mt-4">No restaurants found</p>
      )}
    </div>
  );
}

export default RestaurantList;
