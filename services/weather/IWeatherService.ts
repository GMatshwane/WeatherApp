/**
 * The weather service interface.
 * @description The weather service interface.
 */
export interface IWeatherService {
  /**
   * The current weather.
   * @param lat - The latitude.
   * @param lon - The longitude.
   * @returns The current weather.
   */
  getCurrentWeather<T>(lat: string, lon: string): Promise<T>;
  /**
   * The forecast.
   * @param lat - The latitude.
   * @param lon - The longitude.
   * @returns The forecast.
   */
  getForecast<T>(lat: string, lon: string): Promise<T>;
}
