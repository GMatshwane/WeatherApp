import AsyncStorage from "@react-native-async-storage/async-storage";
import { CurrentWeather } from "../../models/current";

/**
 * The favourites service interface.
 */
export interface IFavouritesService {
  getFavourites(): Promise<CurrentWeather[]>;
  addFavourite(location: CurrentWeather): Promise<void>;
  removeFavourite(location: string): Promise<void>;
}

/**
 * The favourites service class.
 * @param storage - The storage.
 */
class FavouritesService implements IFavouritesService {
  private storage: typeof AsyncStorage;

  constructor(storage: typeof AsyncStorage) {
    this.storage = storage;
  }

  /**
   * Get the favourites.
   * @returns The favourites.
   */
  async getFavourites(): Promise<CurrentWeather[]> {
    const storedFavourites = await this.storage.getItem("favourites");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  }

  /**
   * Add a favourite.
   * @param location - The location.
   */
  async addFavourite(location: CurrentWeather): Promise<void> {
    const favourites = await this.getFavourites();
    if (!favourites.some((fav) => fav.name === location.name)) {
      favourites.push(location);
      await this.storage.setItem("favourites", JSON.stringify(favourites));
    }
  }

  /**
   * Remove a favourite.
   * @param location - The location.
   */
  async removeFavourite(location: string): Promise<void> {
    const favourites = await this.getFavourites();
    const newFavourites = favourites.filter((fav) => fav.name !== location);
    await this.storage.setItem("favourites", JSON.stringify(newFavourites));
  }
}

/**
 * Create the favourites service.
 * @param storage - The storage.
 * @returns The favourites service.
 */
export const createFavouritesService = (
  storage: typeof AsyncStorage,
): IFavouritesService => {
  return new FavouritesService(storage);
};
