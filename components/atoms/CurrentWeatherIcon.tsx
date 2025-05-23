import { List } from "@/models/forcast";
import { toDate } from "date-fns";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface CurrentWeatherIconProps {
  /**
   * The icon name to display.
   */
  icon: "clear" | "rain" | "clouds";
  weather: List;
}

/**
 * The weather icons.
 */
const weatherIcons: Record<"clear" | "rain" | "clouds", ImageSourcePropType> = {
  /**
   * The clear icon.
   */
  clear: require("@/assets/icons/clear.png"),
  /**
   * The rain icon.
   */
  rain: require("@/assets/icons/rain.png"),
  /**
   * The clouds / partlysunny icon.
   */
  clouds: require("@/assets/icons/clouds.png"),
};

/**
 * The current weather icon component.
 * @param icon - The icon to display.
 * @param weather - The weather conditions to display.
 * @returns The icon to display.
 */
const CurrentWeatherIcon: React.FC<CurrentWeatherIconProps> = ({
  icon,
  weather,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={weatherIcons[icon]}
        style={styles.icon}
        resizeMode="contain"
      />
      <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
        <Text style={styles.text}>{weather.weather[0].description}</Text>
        <Text style={styles.smText}>
          {toDate(weather.dt_txt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );
};

export default CurrentWeatherIcon;

/**
 * The styles for the current weather icon.
 */
const styles = StyleSheet.create({
  /**
   * The container for the current weather icon.
   */
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  /**
   * The icon for the current weather.
   */
  icon: {
    width: 40,
    height: 50,
  },
  /**
   * The text for the current weather.
   */
  text: {
    fontSize: 14,
    color: "#fff",
  },
  /**
   * The small text for the current weather.
   */
  smText: {
    fontSize: 12,
    color: "#fff",
  },
});
