import CurrentWeatherSummary from "@/components/atoms/CurrentWeatherSummary";
import Forecast from "@/components/atoms/ForecastItem";
import LoadingModal from "@/components/atoms/LoadingModal";
import CurrentWeather from "@/components/molecules/CurrentWeather";
import { CurrentWeather as CurrentWeatherType } from "@/models/current";
import { Forcast } from "@/models/forcast";
import { weatherService } from "@/services/weatherService";
import * as Location from "expo-location";
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
        console.log("Permission not granted");
        return;
      }

      // Indicate loading when location based data
      setLoaderMessage("Getting your current location");
      setLoading(true);
      const location = await Location.getCurrentPositionAsync();

      //
      setLoaderMessage("Getting location based weather data");

      // Fetch current weather
      const currentWeatherData =
        await weatherService.getCurrentWeather<CurrentWeatherType>(
          location.coords.latitude.toString(),
          location.coords.longitude.toString(),
        );

      // Set the current weather data
      setCurrentWeatherData(currentWeatherData);

      // Fetch forecast data
      const forecastData = await weatherService.getForecast<Forcast>(
        location.coords.latitude.toString(),
        location.coords.longitude.toString(),
      );
      setForecastData(forecastData);

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
