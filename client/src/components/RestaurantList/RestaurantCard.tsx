import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { IRestaurant } from '../../types';
import RatingStar from '../RatingStar';
interface RestaurantCardProps {
  restaurant: IRestaurant;
}

function RestaurantCard({ restaurant }: RestaurantCardProps): ReactElement {
  return (
    <div className="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8 overflow-hidden ">
      <img src="/images/0.jpg" alt="" className="overflow-hidden" />
      <div className="p-4">
        <h3 className="font-medium text-gray-600 text-lg my-2 uppercase flex">
          {restaurant.name}
          <RatingStar value={restaurant.rating || 0} />
        </h3>
        <h4 className="text-gray-600 mb-4">{restaurant.address}</h4>
        <p className="text-justify">
          The be might what days revellers, which sought to a nor. Land from to
          suits his some. Saw him counsel begun mother though but. Ofttimes
          soils of since mighty pollution.
        </p>
        <div className="mt-5">
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
