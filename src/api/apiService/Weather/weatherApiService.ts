import axios from 'axios';
import { WeatherData, ForecastData } from './weatherApiDefinitions';

const BASE_URL = process.env.REACT_APP_WEATHER_BASE_URL || '';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || '';

export const fetchWeatherDataById = async (
  cityId: number
): Promise<WeatherData | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        id: cityId,
        appid: API_KEY,
        units: 'metric',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export const fetchForecastDataById = async (
  cityId: number
): Promise<ForecastData | { list: [] }> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        id: cityId,
        appid: API_KEY,
        units: 'metric',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    return { list: [] };
  }
};
