import React, { ReactElement } from 'react';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import FilteredRestaurants from '../containers/FilteredRestaurants';

function HomePage(): ReactElement {
  return (
    <Layout hero={<Hero />}>
      <section className="pt-8 relative">
        <FilteredRestaurants />
      </section>
    </Layout>
  );
}

export default HomePage;
