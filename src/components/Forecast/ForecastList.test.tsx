import React from 'react';
import { render, screen } from '@testing-library/react';
import ForecastList from './ForecastList';
import { ForecastData } from '../../api/apiService/Weather/weatherApiDefinitions';

const mockForecastData: ForecastData = {
  list: [
    {
      dt: 1633035600, // 1st Oct, 12:00 PM (UTC)
      main: { temp: 20, temp_min: 15, temp_max: 25, humidity: 60 },
      weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      ],
      wind: { speed: 5 },
    },
    {
      dt: 1633122000, // 2nd Oct, 12:00 PM (UTC)
      main: { temp: 18, temp_min: 14, temp_max: 22, humidity: 55 },
      weather: [
        { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
      ],
      wind: { speed: 4 },
    },
  ],
};

process.env.REACT_APP_WEATHER_API_ICON_URL =
  'https://openweathermap.org/img/wn/';

describe('ForecastList Component', () => {
  it('renders the forecast list with correct items', () => {
    render(<ForecastList forecastData={mockForecastData} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);

    const firstDateObject = new Date(1633035600 * 1000); // This is 1 Oct 2021, 12:00 PM UTC
    const firstFormattedDate = firstDateObject.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    });
    const firstFormattedTime = firstDateObject.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
      timeZone: 'UTC',
    });

    expect(
      screen.getByText(`${firstFormattedDate}, ${firstFormattedTime}`)
    ).toBeInTheDocument();
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Temp: 20°C, Min: 15°C, Max: 25°C, Wind: 5 m\/s/i)
    ).toBeInTheDocument();

    const secondDateObject = new Date(1633122000 * 1000); // This is 1 Oct 2021, 12:00 PM UTC
    const secondFormattedDate = secondDateObject.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    });
    const secondFormattedTime = secondDateObject.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
      timeZone: 'UTC',
    });

    expect(
      screen.getByText(`${secondFormattedDate}, ${secondFormattedTime}`)
    ).toBeInTheDocument();

    expect(screen.getByText(/few clouds/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Temp: 18°C, Min: 14°C, Max: 22°C, Wind: 4 m\/s/i)
    ).toBeInTheDocument();
  });

  it('renders the weather icon for each forecast item', () => {
    render(<ForecastList forecastData={mockForecastData} />);

    const icons = screen.getAllByRole('img');
    expect(icons[0]).toHaveAttribute(
      'src',
      'https://openweathermap.org/img/wn/01d@2x.png'
    );
    expect(icons[0]).toHaveAttribute('alt', 'clear sky');
    expect(icons[1]).toHaveAttribute(
      'src',
      'https://openweathermap.org/img/wn/02d@2x.png'
    );
    expect(icons[1]).toHaveAttribute('alt', 'few clouds');
  });

  it('renders an empty state when forecastData is empty', () => {
    const emptyForecastData: ForecastData = { list: [] };
    render(<ForecastList forecastData={emptyForecastData} />);

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });

  it('handles missing forecast data gracefully (using 0 for temp and wind)', () => {
    const invalidForecastData: ForecastData = {
      list: [
        {
          dt: 1633035600, // Equivalent to 1 Oct 2021, 12:00 PM UTC
          main: { temp: 0, temp_min: 0, temp_max: 0, humidity: 60 },
          weather: [
            { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
          ],
          wind: { speed: 0 },
        },
      ],
    };

    render(<ForecastList forecastData={invalidForecastData} />);

    const dateObject = new Date(1633035600 * 1000); // This is 1 Oct 2021, 12:00 PM UTC
    const formattedDate = dateObject.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    });
    const formattedTime = dateObject.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
      timeZone: 'UTC',
    });

    expect(
      screen.getByText(`${formattedDate}, ${formattedTime}`)
    ).toBeInTheDocument();
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Temp: 0°C, Min: 0°C, Max: 0°C, Wind: 0 m\/s/i)
    ).toBeInTheDocument();
  });
});
