# Weather App

A modern weather application built with React Native and Expo, providing real-time weather information and 5-day forecasts.

## Features

- Current weather conditions
- 5-day weather forecast
- Location-based weather updates
- Beautiful and intuitive UI

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd WeatherApp
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables. Create a **extra** object under the expo object inside the app.json file with the below properties:

```
"REACT_APP_WEATHER_API_URL"= "https://api.openweathermap.org/data/2.5"
"REACT_APP_WEATHER_API_KEY"=your_api_key
```

## Running the App

1. Start the development server:

```bash
npm start
# or
yarn start
```

2. Run on iOS:

```bash
npm run ios
# or
yarn ios
```

3. Run on Android:

```bash
npm run android
# or
yarn android
```

## Project Structure

```
WeatherApp/
├── assets/              # Images, fonts, and other static assets
├── models/             # TypeScript interfaces and types
│   ├── current.ts     # Current weather interface
│   └── forcast.ts     # Forecast interface
├── services/          # API services
│   └── weatherService.ts
├── components/        # React components
├── app/               # App screens and routes components
├── app.json          # Expo configuration
└── package.json      # Project dependencies
```

## Environment Variables

The following environment variables are required:

- `REACT_APP_WEATHER_API_URL`: Base URL for the weather API
- `REACT_APP_WEATHER_API_KEY`: API key for authentication

## API Integration

The app uses the following API endpoints:

- `/weather`: Get current weather data
- `/forecast5`: Get 5-day weather forecast

Both endpoints require latitude and longitude coordinates for location-based weather data.

## Application permissions

The application requires the following permissions:

- Location Permission: Required to fetch weather data for the user's current location
  - iOS: `NSLocationWhenInUseUsageDescription`
  - Android: `ACCESS_FINE_LOCATION`

These permissions are configured in the app.json file and will be requested when the app first attempts to access the device's location.

## Contributing

None required

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Weather data provided by **Open Weather**
- Icons and assets from **DVT Pty(Ltd)**
- Built with Expo and React Native
