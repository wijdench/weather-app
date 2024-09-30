import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';
import { WeatherData } from '../../api/apiService/Weather/weatherApiDefinitions';

const mockWeatherData: WeatherData = {
  name: 'Toronto',
  main: { temp: 20, temp_min: 15, temp_max: 25, humidity: 60 },
  weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
  wind: { speed: 5 },
};

process.env.REACT_APP_WEATHER_API_ICON_URL = 'https://openweathermap.org/img/wn/';

describe('WeatherCard Component', () => {
  it('renders weather data correctly', () => {
    render(<WeatherCard weatherData={mockWeatherData} />);

    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getByText('clear sky')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText(/Wind 5 m\/s/i)).toBeInTheDocument();
  });

  it('renders the weather icon with the correct src', () => {
    render(<WeatherCard weatherData={mockWeatherData} />);

    const icon = screen.getByAltText('clear sky');
    expect(icon).toHaveAttribute('src', 'https://openweathermap.org/img/wn/01d@4x.png');
  });

  it('handles missing weather data gracefully', () => {
    const incompleteWeatherData: WeatherData = {
      name: 'Toronto',
      main: { temp: 0, temp_min: 0, temp_max: 0, humidity: 0 },
      weather: [{ id: 0, main: '', description: '', icon: '' }],
      wind: { speed: 0 },
    };
  
    render(<WeatherCard weatherData={incompleteWeatherData} />);
  
    expect(screen.getByText('0°C')).toBeInTheDocument();
    expect(screen.getByText(/Wind 0 m\/s/i)).toBeInTheDocument();
  
    const img = screen.getByAltText('');
    expect(img).toHaveAttribute('src', 'https://openweathermap.org/img/wn/@4x.png');
  });
  
  it('renders correctly with minimal data', () => {
    const minimalWeatherData: WeatherData = {
      name: 'Toronto',
      main: { temp: 0, temp_min: 0, temp_max: 0, humidity: 0 },
      weather: [{ id: 0, main: 'Unknown', description: 'No data', icon: '' }],
      wind: { speed: 0 },
    };

    render(<WeatherCard weatherData={minimalWeatherData} />);

    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(screen.getByText('0°C')).toBeInTheDocument();
    expect(screen.getByText(/Wind 0 m\/s/i)).toBeInTheDocument();
  });
});
