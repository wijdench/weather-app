import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders the correct text', () => {
    render(<Footer />);

    expect(screen.getByText(/Weather app by Wijden/i)).toBeInTheDocument();
  });

  it('renders the Umbrella icon', () => {
    render(<Footer />);
    const umbrellaIcon = screen.getByTestId('UmbrellaIcon');

    expect(umbrellaIcon).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    const { container } = render(<Footer />);
    
    expect(container).toBeTruthy();
  });
});
