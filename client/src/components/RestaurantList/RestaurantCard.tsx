import React, { ReactElement } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import Api, { getImagesUrl } from '../../api';
import { queryClient } from '../../queryClient';
import { IRestaurant, IUser } from '../../types';
import { DeleteButton } from '../FormElements';
import RatingStar from '../RatingStar';
interface RestaurantCardProps {
  restaurant: IRestaurant;
  user?: IUser;
}

function RestaurantCard({
  restaurant,
  user,
}: RestaurantCardProps): ReactElement {
  const { mutate } = useMutation(
    (restaurantId: string) => Api.removeRestaurant(restaurantId),
    {
      async onSuccess({ data }, variables) {
        const cachedRestaurant = queryClient.getQueryData<IRestaurant>([
          'restaurant',
        ]);
        // Optimistically update to the new value
        if (!cachedRestaurant) {
          return {};
        }
        console.log(data);
        /*         cachedRestaurant.reviews?.push({
          ...data,
          user: {
            id: user!.id,
            name: user!.name,
          },
        });

        queryClient.setQueryData(['restaurant'], cachedRestaurant); */
        return { cachedRestaurant, data };
      },
    }
  );
  const image = restaurant.image
    ? `${getImagesUrl()}/${restaurant.image}`
    : `/images/0.jpg`;
  const canManage =
    user?.role === 'admin' ||
    (user?.role === 'owner' && user?.id === restaurant.owner);
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete the restaurant?')) {
      if (restaurant.id) mutate(restaurant.id);
    }
  };
  return (
    <div className=" shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8 lg:m-4 space-y-4 overflow-hidden h-full flex flex-col">
      <img
        src={image}
        alt=""
        className="overflow-hidden h-64 w-full object-cover"
      />
      <div className="px-4 flex flex-col justify-start flex-1 ">
        <h3 className="font-medium text-gray-600 text-lg my-2 uppercase flex">
          {restaurant.name}
          <RatingStar value={restaurant.rating || 0} />
        </h3>
        <h4 className="text-gray-600 mb-4">{restaurant.address}</h4>
        <p className="text-justify flex-1">{restaurant.description}</p>
        <div className="mb-4 flex justify-between">
          <Link
            to={`/restaurant/${restaurant.id}`}
            className="hover:bg-green-700 rounded-md py-2 px-3 font-semibold hover:text-white bg-green-400 text-green-100"
          >
            {canManage ? 'Manage' : 'Add Review'}
          </Link>
          {canManage && (
            <DeleteButton onClick={() => handleDelete()}>
              <FaTrash />
            </DeleteButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
