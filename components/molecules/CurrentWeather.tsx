import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

/**
 * The props for the current weather.
 */
type CurrentWeatherProps = {
  /**
   * The temperature.
   */
  temperature: number;
  /**
   * The description.
   */
  description: string;
  /**
   * The location.
   */
  location?: string;
};

/**
 * The current weather component.
 * @param temperature - The temperature.
 */
const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  temperature,
  description,
  location,
}) => {
  return (
    <View>
      <View>
        <Image
          source={require("@/assets/images/forest_cloudy.png")}
          resizeMode="stretch"
          style={styles.imageContainer}
        />

        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.temperature}>{temperature}°</Text>
          <Text style={styles.description}>{description}</Text>
          {location && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="location-outline" size={20} color="white" />
              <Text style={{ color: "white" }}>{location}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CurrentWeather;

/**
 * The styles for the current weather.
 */
const styles = StyleSheet.create({
  /**
   * The container for the current weather.
   */
  imageContainer: {
    width: "100%",
  },
  /**
   * The temperature for the current weather.
   */
  temperature: {
    fontSize: 70,
    fontWeight: "bold",
    color: "white",
  },
  /**
   * The description for the current weather.
   */
  description: {
    fontSize: 24,
    color: "white",
  },
});
