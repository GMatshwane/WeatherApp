import { WeatherServiceProvider } from "@/services/weather/WeatherServiceContext";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WeatherScreen from "../components/templates/WeatherScreen";
import { LocationServiceProvider } from "../services/location/LocationServiceContext";

/**
 * The main app component.
 * @description The main app component.
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <LocationServiceProvider>
        <WeatherServiceProvider>
          <View style={styles.container}>
            <WeatherScreen />
          </View>
        </WeatherServiceProvider>
      </LocationServiceProvider>
    </SafeAreaProvider>
  );
}

/**
 * The styles for the app.
 * @description The styles for the app.
 */
const styles = StyleSheet.create({
  /**
   * The container for the app.
   */
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
