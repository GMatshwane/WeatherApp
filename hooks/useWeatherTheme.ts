import { useContext } from "react";
import { WeatherThemeContext } from "../contexts/WeatherThemeContext";

/**
 * The use weather theme hook.
 * @returns The weather theme color.
 */
export const useWeatherTheme = () => {
  const { backgroundColor } = useContext(WeatherThemeContext);
  return { backgroundColor };
};
