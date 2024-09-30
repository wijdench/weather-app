import axios from 'axios';
import {
  fetchWeatherDataById,
  fetchForecastDataById,
} from './weatherApiService';
import { WeatherData, ForecastData } from './weatherApiDefinitions';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('weatherApiService', () => {
  const cityId = 12345;

  const weatherData: WeatherData = {
    name: 'Test City',
    main: { temp: 20, temp_min: 15, temp_max: 25, humidity: 60 },
    weather: [
      { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
    ],
    wind: { speed: 5 },
  };

  const forecastData: ForecastData = {
    list: [
      {
        dt: 1633035600,
        main: { temp: 15, temp_min: 10, temp_max: 20, humidity: 50 },
        weather: [
          { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
        ],
        wind: { speed: 4 },
      },
    ],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return weather data on successful API call', async () => {
    mockedAxios.get.mockResolvedValue({ data: weatherData });

    const result = await fetchWeatherDataById(cityId);

    expect(result).toEqual(weatherData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_WEATHER_BASE_URL}/weather`,
      {
        params: {
          id: cityId,
          appid: process.env.REACT_APP_WEATHER_API_KEY,
          units: 'metric',
        },
      }
    );
  });

  it('should return null on API failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    const result = await fetchWeatherDataById(cityId);

    expect(result).toBeNull();
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it('should return forecast data on successful API call', async () => {
    mockedAxios.get.mockResolvedValue({ data: forecastData });

    const result = await fetchForecastDataById(cityId);

    expect(result).toEqual(forecastData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_WEATHER_BASE_URL}/forecast`,
      {
        params: {
          id: cityId,
          appid: process.env.REACT_APP_WEATHER_API_KEY,
          units: 'metric',
        },
      }
    );
  });

  it('should return an empty list on API failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    const result = await fetchForecastDataById(cityId);

    expect(result).toEqual({ list: [] });
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
