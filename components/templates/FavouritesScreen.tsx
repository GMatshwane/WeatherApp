import { CurrentWeather } from "@/models/current";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelectedLocation } from "../../contexts/SelectedLocationContext";
import { useFavouritesService } from "../../services/favourites/FavouritesServiceContext";
import ConfirmationModal from "../molecules/ConfirmationModal";
import FavouriteDetailsModal from "../molecules/FavouriteDetailsModal";

const FavouritesScreen: React.FC = () => {
  const [favourites, setFavourites] = useState<CurrentWeather[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedFavourite, setSelectedFavourite] =
    useState<CurrentWeather | null>(null);
  const favouritesService = useFavouritesService();
  const { setSelectedLocation: setGlobalSelectedLocation } =
    useSelectedLocation();
  const router = useRouter();

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

  const confirmViewFavourite = (location: CurrentWeather) => {
    setSelectedFavourite(location);
    setDetailsModalVisible(true);
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

  const handleFavouritePress = (location: CurrentWeather) => {
    setGlobalSelectedLocation(location);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Ionicons name="heart" size={24} color="#ff0000" />
        <Text style={[styles.title, { color: "#333333" }]}>Favourites</Text>
      </View>
      <FlatList
        data={favourites}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFavouritePress(item)}>
            <View style={styles.item}>
              <Text>{item.name}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => confirmViewFavourite(item)}>
                  <Ionicons name="eye-outline" size={24} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => confirmRemoveFavourite(item.name)}
                >
                  <Ionicons name="trash-outline" size={24} color="#ff0000" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <ConfirmationModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onConfirm={removeFavourite}
        onCancel={() => setModalVisible(false)}
        text={`Remove ${selectedLocation} from favourites?`}
      />
      <FavouriteDetailsModal
        visible={detailsModalVisible}
        onRequestClose={() => setDetailsModalVisible(false)}
        location={selectedFavourite}
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
  actions: {
    flexDirection: "row",
    gap: 10,
  },
});

export default FavouritesScreen;
