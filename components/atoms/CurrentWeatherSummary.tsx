import { Main } from "@/models/current";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * The current weather summary. This shows the min temperature, the current temperature, and the max temperature.
 * @param props - The props for the current weather summary.
 */
const CurrentWeatherSummary: React.FC<Main> = ({
  temp_min,
  temp,
  temp_max,
}: Main) => {
  const roundedTempMin = Math.round(temp_min);
  const roundedTemp = Math.round(temp);
  const roundedTempMax = Math.round(temp_max);
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <Text style={styles.text}>{roundedTempMin}°</Text>
        <Text style={styles.smText}>{"min"}</Text>
      </View>
      <View style={styles.indicatorContainer}>
        <Text style={styles.text}>{roundedTemp}°</Text>
        <Text style={styles.smText}>{"current"}</Text>
      </View>
      <View style={styles.indicatorContainer}>
        <Text style={styles.text}>{roundedTempMax}°</Text>
        <Text style={styles.smText}>{"max"}</Text>
      </View>
    </View>
  );
};

export default CurrentWeatherSummary;

/**
 * The styles for the current weather summary.
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#fff",
    paddingBottom: 10,
  },
  indicatorContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    color: "#fff",
    fontSize: 30,
  },
  smText: {
    color: "#fff",
    fontSize: 12,
    letterSpacing: 2,
  },
});
