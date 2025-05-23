import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FavouriteButton from "../atoms/FavouriteButton";

/**
 * The props for the current weather.
 */
type CurrentWeatherProps = {
  /**
   * The temperature.
   */
  temperature: number;
  /**
   * The weather type.
   */
  weatherType: string;
  /**
   * The location.
   */
  location?: string;
  /**
   * The background image.
   */
  backgroundImage: ImageSourcePropType;
  isFavourite?: boolean;
  onToggleFavourite?: () => void;
};

/**
 * The current weather component.
 * @param temperature - The temperature.
 */
const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  temperature,
  weatherType,
  location,
  backgroundImage,
  isFavourite = false,
  onToggleFavourite,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={backgroundImage}
        resizeMode="cover"
        style={styles.imageContainer}
      />
      <View style={styles.overlay}>
        <Text style={styles.temperature}>{temperature}°</Text>
        <Text style={styles.description}>{weatherType.toUpperCase()}</Text>
        {location && (
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={20} color="#fff" />
            <Text style={styles.locationText}>{location || "Unknown"}</Text>
          </View>
        )}
        {onToggleFavourite && (
          <View style={{ position: "absolute", top: 50, right: 10 }}>
            <FavouriteButton
              isFavourite={isFavourite}
              onToggle={onToggleFavourite}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default CurrentWeather;

/**
 * The styles for the current weather.
 */
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 300,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  temperature: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#fff",
    opacity: 1,
  },
  description: {
    fontSize: 20,
    color: "#fff",
    opacity: 0.5,
    marginBottom: 10,
  },
  locationText: {
    color: "#fff",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
