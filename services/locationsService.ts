import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";

/**
 * Singleton service for managing location-related operations.
 */
class LocationService {
  private static instance: LocationService;

  private constructor() {}

  /**
   * Gets the singleton instance of LocationService.
   * @returns The singleton instance of LocationService.
   */
  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  /**
   * Retrieves the last known location from AsyncStorage.
   * @returns The last known location, or null if not found.
   */
  public async getLastLocation(): Promise<LocationObject | null> {
    const lastLocationString = await AsyncStorage.getItem("lastLocation");
    if (lastLocationString) {
      return JSON.parse(lastLocationString);
    }
    return null;
  }

  /**
   * Sets the last known location in AsyncStorage.
   * @param location - The location object to store.
   */
  public async setLastLocation(location: LocationObject): Promise<void> {
    await AsyncStorage.setItem("lastLocation", JSON.stringify(location));
  }

  /**
   * Retrieves the current location using Expo Location.
   * @returns The current location, or null if retrieval fails.
   */
  public async getCurrentLocation(): Promise<LocationObject | null> {
    const location = await Location.getCurrentPositionAsync();
    return location;
  }

  /**
   * Clears the last known location from AsyncStorage.
   */
  public async clearLastLocation(): Promise<void> {
    await AsyncStorage.removeItem("lastLocation");
  }
}

export const locationService = LocationService.getInstance();
