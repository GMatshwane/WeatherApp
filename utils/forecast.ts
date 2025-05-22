/**
 * Get the current weather via set constraints.
 * @param weather - The weather to get.
 * @returns The current weather.
 */
export const getCurrentWeather = (
  weather: string,
): "clear" | "rain" | "clouds" => {
  switch (weather.toLowerCase()) {
    case "clear":
      return "clear";
    case "rain":
      return "rain";
    case "clouds":
      return "clouds";
    default:
      return "clear";
  }
};
