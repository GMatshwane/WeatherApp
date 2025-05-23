/**
 * The current weather interface.
 * @property coord - The coordinates.
 * @property weather - The weather.
 * @property base - The base.
 * @property main - The main.
 * @property visibility - The visibility.
 * @property wind - The wind.
 */
export interface CurrentWeather {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain: Rain;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

/**
 * The coord interface.
 * @property lon - The longitude.
 * @property lat - The latitude.
 */
export interface Coord {
  lon: number;
  lat: number;
}

/**
 * The weather interface.
 * @property id - The weather id.
 * @property main - The main weather.
 * @property description - The weather description.
 * @property icon - The weather icon.
 */
export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

/**
 * The main interface.
 * @property temp - The temperature.
 * @property feels_like - The feels like temperature.
 * @property temp_min - The minimum temperature.
 * @property temp_max - The maximum temperature.
 * @property pressure - The pressure.
 * @property humidity - The humidity.
 * @property sea_level - The sea level.
 * @property grnd_level - The ground level.
 */
export interface Main {
  temp: number;
  feels_like?: number;
  temp_min: number;
  temp_max: number;
  pressure?: number;
  humidity?: number;
  sea_level?: number;
  grnd_level?: number;
}

/**
 * The wind interface.
 * @property speed - The speed.
 * @property deg - The degree.
 * @property gust - The gust.
 */
export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

/**
 * The rain interface.
 * @property 1h - The rain in the last hour.
 */
export interface Rain {
  "1h": number;
}

/**
 * The clouds interface.
 * @property all - The cloudiness.
 */
export interface Clouds {
  all: number;
}

/**
 * The sys interface.
 * @property type - The type.
 * @property id - The id.
 * @property country - The country.
 * @property sunrise - The sunrise.
 * @property sunset - The sunset.
 */
export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

/**
 * The weather type interface.
 * @property description - The weather description.
 */
export interface WeatherType {
  description: "clear sky" | "rain" | "few clouds";
}
