import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CurrentWeather } from "../../models/current";
import { useFavouritesService } from "../../services/favourites/FavouritesServiceContext";
import ConfirmationModal from "../molecules/ConfirmationModal";

const FavouritesScreen: React.FC = () => {
  const [favourites, setFavourites] = useState<CurrentWeather[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const favouritesService = useFavouritesService();

  /**
   * The function to load the favourites.
   */
  const loadFavourites = async () => {
    const storedFavourites = await favouritesService.getFavourites();
    setFavourites(storedFavourites);
  };

  /**
   * The effect to load the favourites.
   */
  useFocusEffect(
    React.useCallback(() => {
      loadFavourites();
    }, []),
  );

  /**
   * The function to confirm the removal of a favourite.
   * @param location - The location.
   */
  const confirmRemoveFavourite = (location: string) => {
    setSelectedLocation(location);
    setModalVisible(true);
  };

  /**
   * The function to remove a favourite.
   * */
  const removeFavourite = async () => {
    if (selectedLocation) {
      await favouritesService.removeFavourite(selectedLocation);
      const updatedFavourites = await favouritesService.getFavourites();
      setFavourites(updatedFavourites);
      setModalVisible(false);
      setSelectedLocation(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Ionicons name="heart" size={24} color="#ff0000" />
        <Text style={[styles.title, { color: "#333333" }]}>Favourites</Text>
      </View>
      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => confirmRemoveFavourite(item.name)}>
              <Ionicons name="trash-outline" size={24} color="#ff0000" />
            </TouchableOpacity>
          </View>
        )}
      />
      <ConfirmationModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onConfirm={removeFavourite}
        onCancel={() => setModalVisible(false)}
        text={`Remove ${selectedLocation} from favourites?`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 100,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default FavouritesScreen;
