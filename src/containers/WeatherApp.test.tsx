import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WeatherApp from '../containers/WeatherApp';
import { WeatherProvider } from '../context/WeatherContext';
import { fetchWeatherDataById, fetchForecastDataById } from '../api/apiService/Weather/weatherApiService';

jest.mock('../api/apiService/Weather/weatherApiService', () => ({
  fetchWeatherDataById: jest.fn(),
  fetchForecastDataById: jest.fn(),
}));

jest.mock('../../src/data/cities.json', () => [
  { id: 1, name: 'City A', country: 'Country A' },
  { id: 2, name: 'City B', country: 'Country B' },
]);

const mockFetchWeatherDataById = fetchWeatherDataById as jest.Mock;
const mockFetchForecastDataById = fetchForecastDataById as jest.Mock;

const mockWeatherData = {
  name: 'City A',
  main: { temp: 20, temp_min: 15, temp_max: 25, humidity: 50 },
  weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
  wind: { speed: 5 },
};

const mockForecastData = {
  list: [
    {
      dt: 1633035600,
      main: { temp: 20, temp_min: 15, temp_max: 25, humidity: 50 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      wind: { speed: 5 },
    },
  ],
};

describe('WeatherApp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithContext = (component: JSX.Element) => {
    return render(<WeatherProvider>{component}</WeatherProvider>);
  };

  it('fetches and displays weather and forecast data after selecting a city', async () => {
    mockFetchWeatherDataById.mockResolvedValue(mockWeatherData);
    mockFetchForecastDataById.mockResolvedValue(mockForecastData);

    renderWithContext(<WeatherApp />);
    userEvent.click(screen.getByLabelText(/select city/i));
    const cityOption = await screen.findByText('City A, Country A');
    userEvent.click(cityOption);

    await waitFor(() => {
      expect(screen.getByText('City A Weather Details')).toBeInTheDocument();
    });

 
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText(/see forecast/i)).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    mockFetchWeatherDataById.mockRejectedValue(new Error('Network Error'));
    mockFetchForecastDataById.mockRejectedValue(new Error('Network Error'));

    renderWithContext(<WeatherApp />);

    userEvent.click(screen.getByLabelText(/select city/i));
    const cityOption = await screen.findByText('City A, Country A');
    userEvent.click(cityOption);

    await waitFor(() => {
      expect(screen.queryByText('City A Weather Details')).not.toBeInTheDocument();
    });
  });
});
