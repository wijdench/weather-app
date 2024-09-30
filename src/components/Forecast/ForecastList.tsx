import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
} from '@mui/material';
import { ForecastData } from '../../api/apiService/Weather/weatherApiDefinitions';

interface ForecastListProps {
  forecastData: ForecastData;
}

const ForecastList: React.FC<ForecastListProps> = ({ forecastData }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <List>
        {forecastData.list.slice(0, 5).map((forecast, index) => {
          // Format the date as "28 Sept, 5 PM"
          const dateObject = new Date(forecast.dt * 1000);
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

          const { icon, description } = forecast.weather[0];
          const iconUrl = `${process.env.REACT_APP_WEATHER_API_ICON_URL}${icon}@2x.png`;

          return (
            <ListItem key={index} sx={{ alignItems: 'flex-start' }}>
              <ListItemAvatar>
                <Avatar
                  src={iconUrl}
                  alt={description}
                  sx={{ width: 56, height: 56 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${formattedDate}, ${formattedTime}`}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {description}
                    </Typography>
                    {' — '}
                    Temp: {forecast.main.temp}°C, Min: {forecast.main.temp_min}
                    °C, Max: {forecast.main.temp_max}°C, Wind:{' '}
                    {forecast.wind.speed} m/s
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default ForecastList;
