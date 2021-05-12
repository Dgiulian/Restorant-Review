import React, { ReactElement, useContext } from 'react';
import { Redirect, useHistory } from 'react-router';
import { getRestaurantByOnwer } from '../api';
import { AuthContext } from '../auth/AuthProvider';
import Layout from '../components/Layout';
import RestaurantList from '../components/RestaurantList';

function ManageRestaurantsPage(): ReactElement {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  if (!['owner', 'admin'].includes(user!.role)) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: history.location,
        }}
      />
    );
  }

  return (
    <Layout>
      <h1 className="text-center text-4xl my-8">Manage your restaurants</h1>
      <RestaurantList getRestaurantListFn={() => getRestaurantByOnwer()} />
    </Layout>
  );
}

export default ManageRestaurantsPage;
