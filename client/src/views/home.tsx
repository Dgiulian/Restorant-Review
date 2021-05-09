import React, { ReactElement, useState } from 'react';
import Layout from '../components/Layout';
import RatingFilter from '../components/RatingFilter';
import RestaurantList from '../components/RestaurantList';

function HomePage(): ReactElement {
  const [rating, setRating] = useState(0);

  return (
    <Layout>
      <section className="pt-8 relative">
        <div className="ml-auto">
          <h2 className="text-lg">Filter by rating</h2>
          <RatingFilter selectedRating={rating} onSelectRating={setRating} />
        </div>
        <RestaurantList filter={rating} />
      </section>
    </Layout>
  );
}

export default HomePage;
