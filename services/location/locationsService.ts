import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { ILocationService } from "./ILocationService";

/**
 * The location service config.
 */
export interface LocationServiceConfig {
  storage: {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
  };
}

/**
 * Singleton service for managing location-related operations.
 */
class LocationService implements ILocationService {
  /**
   * The instance of the location service.
   */
  private static instance: LocationService;
  /**
   * The storage.
   */
  private storage: LocationServiceConfig["storage"];

  /**
   * The constructor for the location service.
   * @param config - The config.
   */
  private constructor(config: LocationServiceConfig) {
    this.storage = config.storage;
  }

  /**
   * The singleton instance of LocationService.
   * @returns The singleton instance of LocationService.
   */
  public static getInstance(config: LocationServiceConfig): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService(config);
    }
    return LocationService.instance;
  }

  /**
   * The last known location from AsyncStorage.
   * @returns The last known location, or null if not found.
   */
  public async getLastLocation(): Promise<LocationObject | null> {
    const lastLocationString = await this.storage.getItem("lastLocation");
    if (lastLocationString) {
      return JSON.parse(lastLocationString);
    }
    return null;
  }

  /**
   * The last known location in AsyncStorage.
   * @param location - The location object to store.
   */
  public async setLastLocation(location: LocationObject): Promise<void> {
    await this.storage.setItem("lastLocation", JSON.stringify(location));
  }

  /**
   * The current location using Expo Location.
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
    await this.storage.removeItem("lastLocation");
  }
}

/**
 * The create location service function.
 * @param config - The config.
 * @returns The location service.
 */
export const createLocationService = (
  config: LocationServiceConfig,
): LocationService => {
  return LocationService.getInstance(config);
};
