import { Forcast } from "@/models/forcast";
import { getDayOfWeek } from "@/utils/date-fns";
import { getCurrentWeather } from "@/utils/forecast";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CurrentWeatherIcon from "../atoms/CurrentWeatherIcon";

/**
 * The forecast item component.
 * @param item - The item to display.
 * @returns The forecast item component.
 */
interface ForecastItemProps {
  item: Forcast;
}

/**
 * The forecast item component.
 * @param item - The item to display.
 * @returns The forecast item component.
 */
const Forecast: React.FC<ForecastItemProps> = ({ item }: ForecastItemProps) => {
  return (
    <View style={styles.container}>
      {item && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={item.list}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={[styles.text, { width: 70 }]}>
                {getDayOfWeek(item.dt_txt.toString())}
              </Text>
              <CurrentWeatherIcon
                icon={getCurrentWeather(item.weather[0].main)}
                weather={item}
              />
              <Text style={[styles.text]}>{Math.round(item.main.temp)}°</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Forecast;

const styles = StyleSheet.create({
  /**
   * The item for the forecast.
   */
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  /**
   * The container for the forecast.
   */
  container: {
    padding: 12,
  },
  /**
   * The text for the forecast.
   */
  text: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 25,
    marginVertical: 5,
  },
});
