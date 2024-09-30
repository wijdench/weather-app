import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { WeatherData } from '../../api/apiService/Weather/weatherApiDefinitions';

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { main, description, icon } = weatherData.weather[0];

  const iconUrl = `${process.env.REACT_APP_WEATHER_API_ICON_URL}${icon}@4x.png`;

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="h6">{main}</Typography>
            <Typography>{description}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              {weatherData.main.temp}°C
            </Typography>
            <Typography>Wind {weatherData.wind.speed} m/s</Typography>
          </Box>

          <Box>
            <img
              src={iconUrl}
              alt={description}
              style={{ width: '150px', height: '150px' }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
