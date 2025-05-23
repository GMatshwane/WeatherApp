import React from "react";
import { StyleSheet, View } from "react-native";
import AnimatedPulse from "../molecules/AnimatedPulse";

/**
 * @description Weather pulse component that shows a pulsing animation.
 * @returns The weather pulse component.
 */
const WeatherPulse: React.FC = () => (
  <View testID="weather-pulse" style={styles.pulseContainer}>
    <AnimatedPulse delay={0} />
  </View>
);

export default WeatherPulse;

/**
 * The styles for the weather pulse component.
 */
const styles = StyleSheet.create({
  /**
   * The container for the weather pulse component
   */
  pulseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});
