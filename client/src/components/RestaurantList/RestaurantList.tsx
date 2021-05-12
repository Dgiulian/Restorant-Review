import React, { ReactElement, useContext } from 'react';
import { useQuery } from 'react-query';
import { getRestaurantList } from '../../api';
import { AuthContext } from '../../auth/AuthProvider';
import { ApiResponse, IRestaurant } from '../../types';
import RestaurantCard from './RestaurantCard';
interface RestaurantListProps {
  filter?: number;
  getRestaurantListFn?: (queryArgs: any) => Promise<any>;
}
type useQueryParams = [string, { filter: number }];

function RestaurantList({
  filter = 0,
  getRestaurantListFn = ({ queryKey }: any) =>
    getRestaurantList(queryKey[1].filter),
}: RestaurantListProps): ReactElement {
  const { isLoading, error, data } = useQuery<
    ApiResponse<IRestaurant[]>,
    any,
    ApiResponse<IRestaurant[]>,
    useQueryParams
  >(['restaurantList', { filter }], getRestaurantListFn);
  const { user } = useContext(AuthContext);
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
        <RestaurantCard key={item.id} restaurant={item} user={user} />
      ))}
      {data!.results.length === 0 && (
        <p className="text-center text-xl mt-4">No restaurants found</p>
      )}
    </div>
  );
}

export default RestaurantList;
