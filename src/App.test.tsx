import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./context/WeatherContext', () => ({
  WeatherProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('./containers/WeatherApp', () => () => <div>Mocked Weather App</div>);

describe('App Component', () => {
  it('renders the WeatherApp component', () => {
    render(<App />);
    
    expect(screen.getByText('Mocked Weather App')).toBeInTheDocument();
  });
});
