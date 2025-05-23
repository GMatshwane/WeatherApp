import { LocationObject } from "expo-location";

export interface ILocationService {
  getLastLocation(): Promise<LocationObject | null>;
  setLastLocation(location: LocationObject): Promise<void>;
  getCurrentLocation(): Promise<LocationObject | null>;
  clearLastLocation(): Promise<void>;
}
