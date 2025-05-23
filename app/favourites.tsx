import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import FavouritesScreen from "../components/templates/FavouritesScreen";
import { CurrentWeather } from "../models/current";

/**
 * The favourites screen component.
 * @description The favourites screen component.
 */
export default function Favourites() {
  const [favourites, setFavourites] = useState<CurrentWeather[]>([]);

  useEffect(() => {
    const loadFavourites = async () => {
      const storedFavourites = await AsyncStorage.getItem("favourites");
      if (storedFavourites) {
        setFavourites(JSON.parse(storedFavourites));
      }
    };
    loadFavourites();
  }, []);

  return (
    <View style={styles.container}>
      <FavouritesScreen />
    </View>
  );
}

/**
 * The styles for the favourites screen.
 * @description The styles for the favourites screen.
 */
const styles = StyleSheet.create({
  /**
   * The container for the favourites screen.
   */
  container: {
    flex: 1,
  },
});
