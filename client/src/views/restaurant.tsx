import React, { ReactElement, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getRestaurantById } from '../api';
import { IRestaurant } from '../types';
import ReactStars from 'react-rating-stars-component';
import Layout from '../components/Layout';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewList/ReviewForm';
import { AuthContext } from '../auth/AuthProvider';

function RestaurantPage(): ReactElement {
  const params = useParams<{ restaurantId: string }>();
  const { user } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery<IRestaurant>('restaurant', () =>
    getRestaurantById(params.restaurantId)
  );
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>An error has occured</p>;
  }
  const isRestaurantOwner = user?.id === data?.owner;
  return (
    <Layout>
      <section className="grid grid-cols-2 gap-4 ">
        <div className="">
          <img src="/images/1.jpg" alt={data!.name} className="w-full" />
        </div>
        <div>
          <h1 className="text-4xl my-2 mx-auto">{data!.name}</h1>
          <p>{data!.address}</p>
          <div>
            <span>Rating</span>
            <ReactStars count={5} size={30} value={4} edit={false} />
          </div>
        </div>
      </section>
      {!isRestaurantOwner ? <ReviewForm /> : null}
      <ReviewList
        reviews={data?.reviews}
        isRestaurantOwner={isRestaurantOwner}
      />
    </Layout>
  );
}

export default RestaurantPage;
