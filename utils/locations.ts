import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

/**
 * Get the last location from the async storage.
 * @returns The last location.
 */
export const getLastLocation = async () => {
  const lastLocationString = await AsyncStorage.getItem("lastLocation");
  if (lastLocationString) {
    const lastLocation = JSON.parse(lastLocationString);
    return lastLocation;
  }
};

/**
 * Set the last location in the async storage.
 * @param location - The location to set.
 */
export const setLastLocation = async (location: Location.LocationObject) => {
  console.log("Setting last location", location);
  await AsyncStorage.setItem("lastLocation", JSON.stringify(location.coords));
};

/**
 * Get the current location.
 * @returns The current location.
 */
export const getCurrentLocation = async () => {
  const location = await Location.getCurrentPositionAsync();
  return location;
};
