import Constants from "expo-constants";
import React, { createContext, useContext } from "react";
import { IWeatherService } from "./IWeatherService";
import { createWeatherService } from "./weatherService";

/**
 * The default weather service.
 * @description The default weather service.
 */
const defaultWeatherService = createWeatherService({
  apiKey: Constants.expoConfig?.extra?.REACT_APP_WEATHER_API_KEY || "",
  baseUrl: Constants.expoConfig?.extra?.REACT_APP_WEATHER_API_URL || "",
});

/**
 * The weather service context.
 * @description The weather service context.
 */
const WeatherServiceContext = createContext<IWeatherService>(
  defaultWeatherService,
);

/**
 * The use weather service hook.
 * @description The use weather service hook.
 */
export const useWeatherService = () => useContext(WeatherServiceContext);

/**
 * The weather service provider.
 * @description The weather service provider.
 */
export const WeatherServiceProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <WeatherServiceContext.Provider value={defaultWeatherService}>
    {children}
  </WeatherServiceContext.Provider>
);
