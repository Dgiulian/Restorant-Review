import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../../components/Hero';

test('renders Home Page', () => {
  render(<Hero header="hero header" subheader="hero subheader" />);
  const heroHeader = screen.getByText(/hero header/i);
  const heroSubheader = screen.getByText(/hero subheader/i);
  expect(heroHeader).toBeInTheDocument();
  expect(heroSubheader).toBeInTheDocument();
});
