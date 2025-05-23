import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

/**
 * The favourite button props.
 */
interface FavouriteButtonProps {
  isFavourite: boolean;
  onToggle: () => void;
}

/**
 * The favourite button component.
 * @param isFavourite - The is favourite.
 * @param onToggle - The on toggle.
 */
const FavouriteButton: React.FC<FavouriteButtonProps> = ({
  isFavourite,
  onToggle,
}) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.button}>
      <Ionicons
        name={isFavourite ? "heart" : "heart-outline"}
        size={30}
        color={isFavourite ? "red" : "#fff"}
      />
    </TouchableOpacity>
  );
};

/**
 * The styles for the favourite button.
 */
const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
});

export default FavouriteButton;
