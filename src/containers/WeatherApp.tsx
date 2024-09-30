import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import WeatherCard from '../components/Weather/WeatherCard';
import ForecastList from '../components/Forecast/ForecastList';
import ForecastToggleButton from '../components/Forecast/ForecastToggleButton';
import ForecastChips from '../components/Forecast/ForecastChips';
import CitySelector from '../components/CitySelector/CitySelector';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useWeatherContext } from '../context/WeatherContext';

const getNext5Days = () => {
  const today = new Date();
  const days = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }
  return days;
};

const WeatherApp: React.FC = () => {
  const { weatherData, forecastData } = useWeatherContext();
  const [isForecastVisible, setIsForecastVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const next5Days = getNext5Days();

  const toggleForecastVisibility = () => {
    setIsForecastVisible((prev) => !prev);
  };

  const handleDateSelection = (date: Date) => {
    setSelectedDate(date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }));
  };

  const filteredForecastData = forecastData
    ? forecastData.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
        });
        return selectedDate ? forecastDate === selectedDate : true;
      })
    : [];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container sx={{ flexGrow: 1 }}>
        <Header />

        <CitySelector />

        {weatherData && forecastData && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              mt: 4,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" gutterBottom>
                {weatherData.name} Weather Details
              </Typography>
              <WeatherCard weatherData={weatherData} />
            </Box>

            <Box sx={{ flex: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h5" gutterBottom>
                  5-Day Weather Forecast
                </Typography>

                <ForecastToggleButton
                  isForecastVisible={isForecastVisible}
                  onClick={toggleForecastVisibility}
                />
              </Box>

              {isForecastVisible && (
                <>
                  <ForecastChips
                    next5Days={next5Days}
                    selectedDate={selectedDate}
                    onDateSelection={handleDateSelection}
                  />
                  <ForecastList forecastData={{ ...forecastData, list: filteredForecastData }} />
                </>
              )}
            </Box>
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

export default WeatherApp;
