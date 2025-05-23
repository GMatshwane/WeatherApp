import CurrentWeatherSummary from "@/components/atoms/CurrentWeatherSummary";
import Forecast from "@/components/atoms/ForecastItem";
import LoadingModal from "@/components/atoms/LoadingModal";
import CurrentWeather from "@/components/molecules/CurrentWeather";
import { CurrentWeather as CurrentWeatherType } from "@/models/current";
import { Forcast } from "@/models/forcast";
import { locationService } from "@/services/locationsService";
import { weatherService } from "@/services/weatherService";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

/**
 * This is the main screen of the app.
 * It will fetch the current weather and forecast for the user's location.
 */
export default function Index() {
  const [loading, setLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState("");
  const [forecastData, setForecastData] = useState<Forcast | undefined>();
  const [currentWeatherData, setCurrentWeatherData] = useState<
    CurrentWeatherType | undefined
  >();
  useEffect(() => {
    const fetchWeather = async () => {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // Permission not granted
        return;
      }

      // Indicate loading when location based data
      setLoaderMessage("Getting location");
      setLoading(true);
      // Try to get the current location first
      let lastLocation: LocationObject | null =
        await locationService.getCurrentLocation();
      if (!lastLocation) {
        // If current location fails, try to use the last location
        lastLocation = await locationService.getLastLocation();
      } else {
        // If current location is successful, update the last location
        await locationService.setLastLocation(lastLocation);
      }

      // Fetch current weather
      if (lastLocation) {
        setLoaderMessage("Getting location based weather data");
        try {
          const currentWeatherData =
            await weatherService.getCurrentWeather<CurrentWeatherType>(
              lastLocation.coords.latitude.toString(),
              lastLocation.coords.longitude.toString(),
            );

          // Set the current weather data
          setCurrentWeatherData(currentWeatherData);

          // Fetch forecast data
          const forecastData = await weatherService.getForecast<Forcast>(
            lastLocation.coords.latitude.toString(),
            lastLocation.coords.longitude.toString(),
          );
          setForecastData(forecastData);
        } catch (error) {
          console.error("Error fetching weather data", error);
        }
      }

      // Stop loading
      setLoading(false);
    };
    fetchWeather();
  }, []);

  return (
    <View style={styles.container}>
      <CurrentWeather
        location={currentWeatherData?.name}
        temperature={Math.round(currentWeatherData?.main?.temp ?? 0)}
        description={currentWeatherData?.weather[0]?.description ?? ""}
      />
      <View>
        <CurrentWeatherSummary
          temp_min={currentWeatherData?.main?.temp_min ?? 0}
          temp={currentWeatherData?.main?.temp ?? 0}
          temp_max={currentWeatherData?.main?.temp_max ?? 0}
        />
      </View>
      <View style={{ flex: 1 }}>
        {forecastData && <Forecast item={forecastData} />}
      </View>
      <LoadingModal visible={loading} text={loaderMessage} />
    </View>
  );
}

/**
 * The styles for the index screen.
 */
const styles = StyleSheet.create({
  /**
   * The container style.
   */
  container: {
    backgroundColor: "#54717A",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  /**
   * The indicator style.
   */
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  /**
   * The indicator text style.
   */
  indicatorText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
