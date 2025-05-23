import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CurrentWeather as CurrentWeatherType } from "../../models/current";
import { Forcast } from "../../models/forcast";
import { useLocationService } from "../../services/location/LocationServiceContext";
import { useWeatherService } from "../../services/weather/WeatherServiceContext";
import {
  getWeatherBackground,
  WeatherTheme,
} from "../../utils/weatherBackgrounds";
import CurrentWeatherSummary from "../atoms/CurrentWeatherSummary";
import LoadingModal from "../atoms/LoadingModal";
import CurrentWeather from "../molecules/CurrentWeather";
import Forecast from "../molecules/ForecastItem";

/**
 * The weather screen component.
 */
const WeatherScreen: React.FC = () => {
  const locationService = useLocationService();
  const weatherService = useWeatherService();
  const [loading, setLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState("");
  const [forecastData, setForecastData] = useState<Forcast | undefined>();
  const [currentWeatherData, setCurrentWeatherData] =
    useState<CurrentWeatherType>();
  const [weatherTheme, setWeatherTheme] = useState<WeatherTheme>({
    backgroundColor: "#f5f5f5",
    backgroundImage: require("../../assets/images/forest_sunny.png"),
  });

  useEffect(() => {
    /**
     * The function to fetch the weather.
     */
    const fetchWeather = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      setLoaderMessage("Getting location");
      setLoading(true);

      let lastLocation = await locationService.getCurrentLocation();
      if (!lastLocation) {
        lastLocation = await locationService.getLastLocation();
        if (!lastLocation) {
          throw new Error("No location found");
        }
      }

      if (lastLocation) {
        setLoaderMessage("Getting location based weather data");
        try {
          const { currentWeatherData, forecastData } =
            await getWeatherInformation(lastLocation);
          if (currentWeatherData) {
            setCurrentWeatherData(currentWeatherData);
          }
          if (forecastData) {
            setForecastData(forecastData);
          }
        } catch (error) {
          console.error("Error fetching weather data", error);
        }
      }

      setLoading(false);
    };

    /**
     * Fetch the weather.
     */
    fetchWeather();
  }, []);

  useEffect(() => {
    if (currentWeatherData?.weather[0]?.description) {
      const weatherDescription =
        typeof currentWeatherData.weather[0].description === "string"
          ? currentWeatherData.weather[0].description
          : currentWeatherData.weather[0].description;
      setWeatherTheme(getWeatherBackground(weatherDescription));
    }
  }, [currentWeatherData]);

  /**
   * Get the weather information.
   * @param lastLocation - The last location.
   * @returns The weather information.
   */
  const getWeatherInformation = async (
    lastLocation: Location.LocationObject,
  ) => {
    const [currentWeatherData, forecastData] = await Promise.all([
      weatherService.getCurrentWeather<CurrentWeatherType>(
        lastLocation.coords.latitude.toString(),
        lastLocation.coords.longitude.toString(),
      ),
      weatherService.getForecast<Forcast>(
        lastLocation.coords.latitude.toString(),
        lastLocation.coords.longitude.toString(),
      ),
    ]);

    await AsyncStorage.setItem(
      "currentWeather",
      JSON.stringify(currentWeatherData),
    );
    await AsyncStorage.setItem("forecast", JSON.stringify(forecastData));

    return { currentWeatherData, forecastData };
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: weatherTheme.backgroundColor },
      ]}
    >
      {currentWeatherData && (
        <CurrentWeather
          location={currentWeatherData?.name}
          temperature={Math.round(currentWeatherData?.main?.temp ?? 0)}
          weatherType={currentWeatherData?.weather[0]?.description ?? ""}
          backgroundImage={weatherTheme.backgroundImage}
        />
      )}
      {currentWeatherData && (
        <CurrentWeatherSummary
          temp_min={currentWeatherData?.main?.temp_min ?? 0}
          temp={currentWeatherData?.main?.temp ?? 0}
          temp_max={currentWeatherData?.main?.temp_max ?? 0}
        />
      )}
      {forecastData && <Forecast item={forecastData} />}
      <LoadingModal visible={loading} text={loaderMessage} />
    </View>
  );
};

export default WeatherScreen;

/**
 * The styles for the weather screen.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
