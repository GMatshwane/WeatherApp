import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext } from "react";
import {
  createFavouritesService,
  IFavouritesService,
} from "./favouritesService";

/**
 * The default favourites service.
 */
const defaultFavouritesService = createFavouritesService(AsyncStorage);

/**
 * The favourites service context.
 */
const FavouritesServiceContext = createContext<IFavouritesService>(
  defaultFavouritesService,
);

/**
 * The use favourites service hook.
 * @description The use favourites service hook.
 */
export const useFavouritesService = () => useContext(FavouritesServiceContext);

/**
 * The favourites service provider.
 * @param children - The children.
 */
export const FavouritesServiceProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <FavouritesServiceContext.Provider value={defaultFavouritesService}>
    {children}
  </FavouritesServiceContext.Provider>
);
