import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FavouriteButton from "../atoms/FavouriteButton";

/**
 * The props for the current weather.
 */
interface CurrentWeatherProps {
  /**
   * The location.
   */
  location: string;
  /**
   * The temperature.
   */
  temperature: number;
  /**
   * The weather type.
   */
  weatherType: string;
  /**
   * The background image.
   */
  backgroundImage: any;
  /**
   * Whether the location is a favorite.
   */
  isFavourite: boolean;
  /**
   * Callback to toggle the favorite status.
   */
  onToggleFavourite: () => void;
  /**
   * Callback to refresh the weather data.
   */
  onRefresh?: () => void;
  /**
   * Whether the data is currently loading.
   */
  isLoading?: boolean;
}

/**
 * The current weather component.
 * @param location - The location.
 * @param temperature - The temperature.
 * @param weatherType - The weather type.
 * @param backgroundImage - The background image.
 * @param isFavourite - Whether the location is a favorite.
 * @param onToggleFavourite - Callback to toggle the favorite status.
 * @param onRefresh - Callback to refresh the weather data.
 * @param isLoading - Whether the data is currently loading.
 */
const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  location,
  temperature,
  weatherType,
  backgroundImage,
  isFavourite,
  onToggleFavourite,
  onRefresh,
  isLoading = false,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      spinValue.setValue(0);
    }
  }, [isLoading]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.locationContainer}>
          <Text style={styles.location}>{location}</Text>
          <View style={styles.actions}>
            {onRefresh && (
              <TouchableOpacity
                onPress={onRefresh}
                style={styles.refreshButton}
                disabled={isLoading}
              >
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <FontAwesome name="refresh" size={24} color={"#666666"} />
                </Animated.View>
              </TouchableOpacity>
            )}
            <FavouriteButton
              isFavourite={isFavourite}
              onToggle={onToggleFavourite}
            />
          </View>
        </View>
        <View style={styles.weatherContainer}>
          <Text style={styles.temperature}>{temperature}°</Text>
          <Text style={styles.weatherType}>{weatherType}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

/**
 * The styles for the current weather.
 */
const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: 300,
  },
  backgroundImage: {
    opacity: 0.7,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  location: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  refreshButton: {
    padding: 8,
  },
  weatherContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temperature: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#fff",
  },
  weatherType: {
    fontSize: 24,
    color: "#fff",
    textTransform: "capitalize",
  },
});

export default CurrentWeather;
