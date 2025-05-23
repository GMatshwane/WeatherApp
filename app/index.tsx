import React from "react";
import { StyleSheet, View } from "react-native";
import WeatherScreen from "../components/templates/WeatherScreen";

/**
 * The main app component.
 * @description The main app component.
 */
export default function App() {
  return (
    <View style={styles.container}>
      <WeatherScreen />
    </View>
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
  },
});
