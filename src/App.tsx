import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import WeatherApp from './containers/WeatherApp';

const App: React.FC = () => {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
};

export default App;
