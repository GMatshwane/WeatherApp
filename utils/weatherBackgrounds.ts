import { ImageSourcePropType } from "react-native";

/**
 * The weather condition
 */
export type WeatherCondition =
  | "Clear"
  | "Clouds"
  | "Rain"
  | "Drizzle"
  | "Thunderstorm";

/**
 * The weather theme.
 */
export interface WeatherTheme {
  backgroundColor: string;
  backgroundImage: ImageSourcePropType;
}

/**
 * The function to get the weather background.
 * @param weatherCondition - The weather condition.
 * @returns The weather theme.
 */
export const getWeatherBackground = (
  weatherCondition: string,
): WeatherTheme => {
  const condition = weatherCondition.toLowerCase();

  // Weather colors and backgrounds
  if (condition.includes("clear") || condition.includes("sun")) {
    return {
      backgroundColor: "#47ab27",
      backgroundImage: require("../assets/images/forest_sunny.png"),
    };
  }
  if (condition.includes("cloud")) {
    return {
      backgroundColor: "#54717a",
      backgroundImage: require("../assets/images/forest_cloudy.png"),
    };
  }
  if (
    condition.includes("rain") ||
    condition.includes("drizzle") ||
    condition.includes("thunderstorm")
  ) {
    return {
      backgroundColor: "#57575d",
      backgroundImage: require("../assets/images/forest_rainy.png"),
    };
  }

  // Default to sunny if no match
  return {
    backgroundColor: "#47ab27",
    backgroundImage: require("../assets/images/forest_sunny.png"),
  };
};
