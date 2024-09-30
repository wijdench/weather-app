import React, { createContext, useContext, useState, ReactNode } from 'react';
import { fetchWeatherDataById, fetchForecastDataById } from '../api/apiService/Weather/weatherApiService';
import { WeatherData, ForecastData } from '../api/apiService/Weather/weatherApiDefinitions';

interface WeatherContextProps {
  selectedCityId: number | '';
  setSelectedCityId: (id: number | '') => void;
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
  fetchWeatherAndForecast: (cityId: number) => void;
}

export const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeatherContext must be used within a WeatherProvider');
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [selectedCityId, setSelectedCityId] = useState<number | ''>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);

  const fetchWeatherAndForecast = async (cityId: number) => {
    try {
      const weather = await fetchWeatherDataById(cityId);
      const forecast = await fetchForecastDataById(cityId);

      setWeatherData(weather);
      setForecastData(forecast);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        selectedCityId,
        setSelectedCityId,
        weatherData,
        forecastData,
        fetchWeatherAndForecast,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
