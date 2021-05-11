import React, { ReactElement } from 'react';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import FilteredRestaurants from '../containers/FilteredRestaurants';

function HomePage(): ReactElement {
  return (
    <Layout
      hero={
        <Hero
          header="Restaurants Reviews"
          subheader="Rate and review your favorite places you've visited"
        />
      }
    >
      <PageTitle title="Restaurant reviews" />
      <section className="pt-8 relative">
        <FilteredRestaurants />
      </section>
    </Layout>
  );
}

export default HomePage;
