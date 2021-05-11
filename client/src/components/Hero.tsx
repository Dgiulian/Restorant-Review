import React, { ReactElement } from 'react';
import bgImage from '../assets/background.jpg';

interface Props {
  header: string;
  subheader: string;
}

function Hero({ header = '', subheader = '' }: Props): ReactElement {
  return (
    <section className="w-full h-96 bg-black flex  flex-col justify-center items-center relative overflow-hidden">
      <img
        src={bgImage}
        alt="hero"
        className="w-full h-full object-cover absolute top-0 bottom-0 left-0 opacity-50 z-0"
      />
      <h1 className="text-4xl text-white z-10">{header}</h1>
      <p className=" z-10 text-gray-50 mt-4">{subheader}</p>
    </section>
  );
}

export default Hero;
