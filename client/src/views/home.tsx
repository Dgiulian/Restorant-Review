import React, { ReactElement } from 'react';
import Layout from '../components/Layout';
import RestaurantList from '../components/RestaurantList';

function HomePage(): ReactElement {
  return (
    <Layout>
      <section>
        <RestaurantList />
      </section>
    </Layout>
  );
}

export default HomePage;
