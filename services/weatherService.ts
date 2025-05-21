import { API_KEY, BASE_URL } from "@/index";

// Error class for API errors
class WeatherServiceError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "WeatherServiceError";
  }
}

// Weather service class
class WeatherService {
  private async fetchWithErrorHandling<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new WeatherServiceError(
          `API request failed with status ${response.status}`,
          response.status
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
        }`
      );
    }
  }

  // Get current weather
  async getCurrentWeather<T>(lat: string, lon: string): Promise<T> {
    return this.fetchWithErrorHandling<T>(
      `/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
  }

  // Get 5-day forecast
  async getForecast<T>(lat: string, lon: string): Promise<T> {
    return this.fetchWithErrorHandling<T>(
      `/forecast5?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
  }
}

// Export a singleton instance
export const weatherService = new WeatherService();
