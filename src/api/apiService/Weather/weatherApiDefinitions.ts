interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainData {
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

interface WindData {
  speed: number;
}

export interface WeatherData {
  name: string;
  main: MainData;
  weather: Weather[];
  wind: WindData;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: MainData;
    weather: Weather[];
    wind: WindData;
  }>;
}
