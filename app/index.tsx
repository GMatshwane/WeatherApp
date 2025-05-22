import Forecast from "@/components/atoms/ForecastItem";
import CurrentWeather from "@/components/molecules/CurrentWeather";
import { Forcast } from "@/models/forcast";
import { weatherService } from "@/services/weatherService";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
/**
 * This is the main screen of the app.
 * It will fetch the current weather and forecast for the user's location.
 */
export default function Index() {
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [forecastData, setForecastData] = useState<Forcast | undefined>();
  useEffect(() => {
    const fetchWeather = async () => {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission not granted");
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync();
      setLoadingMessage("GPS location fixed...");

      // Fetch current weather
      // const weatherData =
      //   await weatherService.getCurrentWeather<CurrentWeatherType>(
      //     location.coords.latitude.toString(),
      //     location.coords.longitude.toString(),
      //   );

      const forecastData = await weatherService.getForecast<Forcast>(
        location.coords.latitude.toString(),
        location.coords.longitude.toString(),
      );
      setForecastData(forecastData);
    };
    fetchWeather();
  }, []);

  return (
    <View style={styles.container}>
      <CurrentWeather
        location={forecastData?.city.name}
        temperature={20}
        description={"Cloudy"}
      />
      {forecastData ? (
        <Forecast item={forecastData} />
      ) : (
        <View style={styles.indicator}>
          <Text style={styles.indicatorText}>Loading...</Text>
        </View>
      )}
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
