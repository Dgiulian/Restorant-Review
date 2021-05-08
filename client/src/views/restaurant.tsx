import React, { ReactElement, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  const hasReview = !!data?.reviews?.find(
    (review) => review.user.id === user?.id
  );
  return (
    <Layout>
      {data ? (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="">
              <img src="/images/1.jpg" alt={data!.name} className="w-full" />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl my-2 mx-auto">{data!.name}</h1>
                <p>{data!.address}</p>
                <p className="mt-2">{data!.description}</p>
              </div>
              <div className="mt-auto">
                <span>Rating</span>
                <ReactStars
                  count={5}
                  size={30}
                  value={data.rating}
                  edit={false}
                />
              </div>
            </div>
          </section>
          <h3 className="text-xl mt-4 mb-2">What our clients are saying</h3>
          <ReviewList
            reviews={data?.reviews}
            isRestaurantOwner={isRestaurantOwner}
          />
          {!data?.reviews?.length && <p>No reviews yet</p>}
          {!user && (
            <p className="text-center mt-4">
              <Link to="/login" className="text-blue-600 mr-1">
                Login
              </Link>{' '}
              to leave a review
            </p>
          )}
          {user && !isRestaurantOwner && !hasReview ? (
            <ReviewForm restaurant={data?.id!} />
          ) : null}
        </>
      ) : (
        <p>Restaurant not found</p>
      )}
    </Layout>
  );
}

export default RestaurantPage;
