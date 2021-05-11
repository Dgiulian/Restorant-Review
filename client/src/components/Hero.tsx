import React, { ReactElement } from 'react';
import bgImage from '../assets/background.jpg';

interface Props {}

function Hero({}: Props): ReactElement {
  return (
    <section className="w-full h-96 bg-black flex  flex-col justify-center items-center relative overflow-hidden">
      <img
        src={bgImage}
        alt="hero"
        className="w-full h-full object-cover absolute top-0 bottom-0 left-0 opacity-50 z-0"
      />
      <h1 className="text-4xl text-white z-10">Restaurants Reviews</h1>
      <p className=" z-10 text-gray-50 mt-4">
        Rate and review your favorite places you've visited
      </p>
    </section>
  );
}

export default Hero;
