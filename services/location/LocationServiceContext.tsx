import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext } from "react";
import { ILocationService } from "./ILocationService";
import { createLocationService } from "./locationsService";

/**
 * The default location service.
 */
const defaultLocationService = createLocationService({ storage: AsyncStorage });

/**
 * The location service context.
 */
const LocationServiceContext = createContext<ILocationService>(
  defaultLocationService,
);
/**
 * The use location service hook.
 */
export const useLocationService = () => useContext(LocationServiceContext);

/**
 * The location service provider.
 */
export const LocationServiceProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <LocationServiceContext.Provider value={defaultLocationService}>
    {children}
  </LocationServiceContext.Provider>
);
