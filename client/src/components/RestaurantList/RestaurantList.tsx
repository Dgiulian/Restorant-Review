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
    <div
      className="lg:grid items-center container mx-auto gap-2"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))' }}
    >
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
