import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CitySelector from './CitySelector';
import { WeatherContext } from '../../context/WeatherContext';

jest.mock('../../data/cities.json', () => [
  { id: 1, name: 'City A', country: 'Country A' },
  { id: 2, name: 'City B', country: 'Country B' },
]);

describe('CitySelector Component', () => {
  const mockSetSelectedCityId = jest.fn();
  const mockFetchWeatherAndForecast = jest.fn();

  const mockContextValue = {
    selectedCityId: '',
    setSelectedCityId: mockSetSelectedCityId,
    fetchWeatherAndForecast: mockFetchWeatherAndForecast,
    weatherData: null,
    forecastData: null,
  };

  const renderWithContext = (selectedCityId: number | '') => {
    return render(
      <WeatherContext.Provider
        value={{
          ...mockContextValue,
          selectedCityId,
        }}
      >
        <CitySelector />
      </WeatherContext.Provider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct label and helper text when no city is selected', () => {
    renderWithContext('');

    expect(screen.getByLabelText(/select city/i)).toBeInTheDocument();
    expect(
      screen.getByText(/please select the city to see the forecast/i)
    ).toBeInTheDocument();
  });

  it('does not show helper text when a city is selected', () => {
    renderWithContext(1);

    expect(
      screen.queryByText(/please select the city to see the forecast/i)
    ).not.toBeInTheDocument();
  });

  it('calls setSelectedCityId and fetchWeatherAndForecast when a city is selected', () => {
    renderWithContext('');

    fireEvent.mouseDown(screen.getByLabelText(/select city/i));
    fireEvent.click(screen.getByText('City A, Country A'));

    expect(mockSetSelectedCityId).toHaveBeenCalledWith(1);
    expect(mockFetchWeatherAndForecast).toHaveBeenCalledWith(1);
  });

  it('disables the "Select a city" option', () => {
    renderWithContext('');

    fireEvent.mouseDown(screen.getByLabelText(/select city/i));

    const defaultOption = screen.getByText(/select a city/i);
    expect(defaultOption).toBeInTheDocument();
    expect(defaultOption).toHaveAttribute('aria-disabled', 'true');
  });

  it('displays the correct list of cities from the mock data', () => {
    renderWithContext('');

    fireEvent.mouseDown(screen.getByLabelText(/select city/i));

    expect(screen.getByText('City A, Country A')).toBeInTheDocument();
    expect(screen.getByText('City B, Country B')).toBeInTheDocument();
  });
});
