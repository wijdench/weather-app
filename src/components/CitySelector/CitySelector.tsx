import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, SelectChangeEvent } from '@mui/material';
import cities from '../../data/cities.json';
import { useWeatherContext } from '../../context/WeatherContext';

const CitySelector: React.FC = () => {
  const { selectedCityId, setSelectedCityId, fetchWeatherAndForecast } = useWeatherContext();

  const handleCityChange = async (event: SelectChangeEvent<number>) => {
    const newCityId = Number(event.target.value);
    setSelectedCityId(newCityId);
    fetchWeatherAndForecast(newCityId);
  };

  return (
    <FormControl fullWidth sx={{ mb: 4, mt: 4 }}>
      <InputLabel id="city-select-label">Select City</InputLabel>
      <Select
        labelId="city-select-label"
        value={selectedCityId}
        onChange={handleCityChange}
        label="Select City"
      >
        <MenuItem value="" disabled>
          Select a city
        </MenuItem>
        {cities.map((city) => (
          <MenuItem key={city.id} value={city.id}>
            {city.name}, {city.country}
          </MenuItem>
        ))}
      </Select>
      {!selectedCityId && (
        <FormHelperText>
          Please select the city to see the forecast
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CitySelector;
