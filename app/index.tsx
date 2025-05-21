import { CurrentWeather } from "@/models/current";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { weatherService } from "../services/weatherService";

/**
 * This is the main screen of the app.
 * It will fetch the current weather and forecast for the user's location.
 * @returns
 */
export default function Index() {
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  useEffect(() => {
    const fetchWeather = async () => {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync();
      setLoadingMessage("GPS location fixed...");
      const weatherData =
        await weatherService.getCurrentWeather<CurrentWeather>(
          location.coords.latitude.toString(),
          location.coords.longitude.toString()
        );

      console.log(weatherData);
    };
    fetchWeather();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{loadingMessage}</Text>
    </View>
  );
}
