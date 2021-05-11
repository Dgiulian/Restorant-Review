import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { getImagesUrl } from '../../api';
import { IRestaurant } from '../../types';
import RatingStar from '../RatingStar';
interface RestaurantCardProps {
  restaurant: IRestaurant;
}

function RestaurantCard({ restaurant }: RestaurantCardProps): ReactElement {
  const image = restaurant.image
    ? `${getImagesUrl()}/${restaurant.image}`
    : `/images/0.jpg`;
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
        <div className="mb-4">
          <Link
            to={`/restaurant/${restaurant.id}`}
            className="hover:bg-green-700 rounded-md py-2 px-3 font-semibold hover:text-white bg-green-400 text-green-100"
          >
            Add Review
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
