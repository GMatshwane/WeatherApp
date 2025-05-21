import { API_KEY, BASE_URL } from "@/index";

// Error class for API errors
class WeatherServiceError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "WeatherServiceError";
  }
}

/**
 * OpenWeatherMap API weather service class
 * @description Used to fetch weather data from the OpenWeatherMap API
 */
class WeatherService {
  /**
   * Fetches weather data from the OpenWeatherMap API with error handling
   * @param endpoint - The API endpoint to fetch data from
   * @returns The weather data
   */
  private async fetchWithErrorHandling<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}&appid=${API_KEY}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new WeatherServiceError(
          `API request failed with status ${response.status}`,
          response.status,
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof WeatherServiceError) {
        throw error;
      }
      throw new WeatherServiceError(
        `Failed to fetch weather data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  }

  /**
   * Fetches current weather data from the OpenWeatherMap API
   * @param lat - The latitude of the location
   * @param lon - The longitude of the location
   * @returns The current weather data
   */
  async getCurrentWeather<T>(lat: string, lon: string): Promise<T> {
    return this.fetchWithErrorHandling<T>(`/weather?lat=${lat}&lon=${lon}`);
  }

  /**
   * Fetches 5-day forecast data from the OpenWeatherMap API with error handling
   * @param lat - The latitude of the location
   * @param lon - The longitude of the location
   * @returns The 5-day forecast data
   */
  async getForecast<T>(lat: string, lon: string): Promise<T> {
    return this.fetchWithErrorHandling<T>(`/forecast?lat=${lat}&lon=${lon}`);
  }
}

// Export a singleton instance
export const weatherService = new WeatherService();
