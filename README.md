# Simple Weather App
This is a Simple Weather App built with React, TypeScript, and Material-UI. It allows users to select a city and view the current weather and a 5-day weather forecast using data from the OpenWeatherMap API.

## App Features
Users can select a city to view the current weather conditions.\
Displays weather details such as temperature, description, and wind speed.\
Shows a 5-day weather forecast with temperature, wind speed, and descriptions.\
Ability to filter the forecast by day.\
Uses React, TypeScript, Material-UI, and Axios for API calls.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the build folder. It bundles React in production mode and optimizes the build for the best performance.

### `npm run test`
Launches the test runner in the interactive watch mode. This project uses Jest and React Testing Library for unit testing.

### `npm run format`
Formats the codebase using Prettier.


## Installation & Setup
To set up the project locally, follow these steps:

### Clone the repository: `git clone https://github.com/your-repo/simple-weather-app.git`

### Navigate into the project directory: `cd simple-weather-app`

### Install the dependencies `npm install`

### Set up the environment variables by creating a .env file in the root directory. 
Add your OpenWeatherMap API key:

REACT_APP_WEATHER_BASE_URL=OpenWeatherMap_base_url_here\
REACT_APP_WEATHER_API_KEY=OpenWeatherMap_api_key_here\
REACT_APP_WEATHER_API_ICON_URL=OpenWeatherMap_api_icon_here

### Run the app `npm start`

## Project Structure
├── public/              # Public assets for the app\
├── src/                 # Source files\
│   ├── api/             # API-related services and definitions\
│   │   └── apiService/Weather/\
│   │       ├── weatherApiDefinitions.ts    # Interfaces for weather data\
│   │       └── weatherApiService.ts        # Functions to fetch data from OpenWeatherMap API\
│   ├── components/      # UI components\
│   │   ├── CitySelector/ # City selection dropdown\
│   │   ├── Footer/      # Footer component\
│   │   └── Forecast/    # Forecast-related components\
│   │   ├── Header/      # Header component\
│   │   └── Weather/     # Weather-related components\
│   ├── containers/      # Main app container component (WeatherApp)\
│   ├── context/         # React Context to manage state globally
│   │   └── WeatherContext.tsx  # WeatherContext for fetching and managing weather data
│   ├── data/            # Static data like cities.json\
│   ├── App.tsx          # Main entry point of the app\
│   └── index.tsx        # Entry file to render React App\
├── .env                 # Environment variables for API keys and base URLs\
├── package.json         # Project dependencies and scripts\
└── README.md            # Project documentation

## Future Improvements
Add more cities or allow dynamic city selection using the OpenWeatherMap API.\
Include more detailed weather information like precipitation or UV index.\
Error handling UI for when the API calls fail.\
Integrate E2E tests using Cypress or Playwright to simulate user interactions and ensure the app functions as expected from the user's perspective.

