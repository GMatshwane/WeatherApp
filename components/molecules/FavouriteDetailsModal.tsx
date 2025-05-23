import { CurrentWeather } from "@/models/current";
import { PlaceDetails, PlacePhoto } from "@/models/place";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getPhotoUrl,
  getPlaceDetails,
  searchPlaceByName,
} from "../../services/googlePlacesService";

interface FavouriteDetailsModalProps {
  visible: boolean;
  onRequestClose: () => void;
  location: CurrentWeather | null;
}

const FavouriteDetailsModal: React.FC<FavouriteDetailsModalProps> = ({
  visible,
  onRequestClose,
  location,
}) => {
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaceDetails = useCallback(async () => {
    if (!location?.name) return;

    setLoading(true);
    setError(null);

    try {
      const placeId = await searchPlaceByName(location.name);
      if (placeId) {
        const details = await getPlaceDetails(placeId);
        setPlaceDetails(details);
      } else {
        setError("Could not find place details");
      }
    } catch (err) {
      setError("Failed to fetch place details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [location?.name]);

  useEffect(() => {
    if (visible && location) {
      fetchPlaceDetails();
    }
  }, [visible, location, fetchPlaceDetails]);

  if (!location) return null;

  const handleWebsitePress = () => {
    if (placeDetails?.website) {
      Linking.openURL(placeDetails.website);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{location.name}</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity
                onPress={onRequestClose}
                style={styles.closeButton}
                testID="close-button"
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.scrollContent}>
            <View style={styles.weatherInfo}>
              <Text style={styles.temperature}>
                {Math.round(location.main?.temp ?? 0)}°C
              </Text>
              <Text style={styles.description}>
                {location.weather[0]?.description}
              </Text>
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading place details...</Text>
              </View>
            ) : error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={fetchPlaceDetails}
                >
                  <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
              </View>
            ) : placeDetails ? (
              <>
                <View style={styles.detailsSection}>
                  <Text style={styles.sectionTitle}>Location Details</Text>
                  <View style={styles.detailRow}>
                    <Ionicons name="location" size={20} color="#666" />
                    <Text style={styles.detailText}>
                      {placeDetails.formatted_address}
                    </Text>
                  </View>
                  {placeDetails.rating && (
                    <View style={styles.detailRow}>
                      <Ionicons name="star" size={20} color="#FFD700" />
                      <Text style={styles.detailText}>
                        Rating: {placeDetails.rating} (
                        {placeDetails.user_ratings_total} reviews)
                      </Text>
                    </View>
                  )}
                  {placeDetails.website && (
                    <TouchableOpacity
                      style={styles.detailRow}
                      onPress={handleWebsitePress}
                    >
                      <Ionicons name="globe" size={20} color="#666" />
                      <Text style={[styles.detailText, styles.linkText]}>
                        Visit Website
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {placeDetails.photos && placeDetails.photos.length > 0 && (
                  <View style={styles.imagesSection}>
                    <Text style={styles.sectionTitle}>Location Photos</Text>
                    <View style={styles.imageGrid}>
                      {placeDetails.photos
                        .slice(0, 4)
                        .map((photo: PlacePhoto, index: number) => (
                          <Image
                            key={index}
                            source={{ uri: getPhotoUrl(photo.photo_reference) }}
                            style={styles.image}
                          />
                        ))}
                    </View>
                  </View>
                )}

                {placeDetails.types && (
                  <View style={styles.typesSection}>
                    <Text style={styles.sectionTitle}>Place Type</Text>
                    <View style={styles.typesContainer}>
                      {placeDetails.types.map((type: string, index: number) => (
                        <View key={index} style={styles.typeChip}>
                          <Text style={styles.typeText}>
                            {type.replace(/_/g, " ")}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </>
            ) : null}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    height: "80%",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  refreshButton: {
    padding: 5,
  },
  scrollContent: {
    flex: 1,
  },
  weatherInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 18,
    color: "#666",
    textTransform: "capitalize",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    color: "#ff0000",
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  detailsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
    flex: 1,
  },
  linkText: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  imagesSection: {
    marginBottom: 20,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  image: {
    width: "48%",
    height: 150,
    borderRadius: 10,
  },
  typesSection: {
    marginBottom: 20,
  },
  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  typeChip: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeText: {
    color: "#666",
    textTransform: "capitalize",
  },
});

export default FavouriteDetailsModal;
