import { PlaceDetails } from "@/models/place";
import Constants from "expo-constants";

/**
 * The Google Places API key.
 */
const GOOGLE_PLACES_API_KEY =
  Constants.expoConfig?.extra?.REACT_APP_PLACES_API_KEY;

/**
 * Search for a place by name.
 * @param name - The name of the place.
 * @returns The place ID.
 */
export async function searchPlaceByName(name: string): Promise<string | null> {
  try {
    // TODO: Remove stubbed name
    const locationName = name;
    const url = `${
      Constants.expoConfig?.extra?.REACT_APP_PLACES_API_URL
    }findplacefromtext/json?input=${encodeURIComponent(
      locationName,
    )}&inputtype=textquery&fields=place_id&key=${GOOGLE_PLACES_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].place_id;
    }
    return null;
  } catch (error) {
    console.error("Error searching place:", error);
    return null;
  }
}

/**
 * Get the details of a place.
 * @param placeId - The ID of the place.
 * @returns The details of the place.
 */
export async function getPlaceDetails(
  placeId: string,
): Promise<PlaceDetails | null> {
  try {
    const url = `${Constants.expoConfig?.extra?.REACT_APP_PLACES_API_URL}details/json?place_id=${placeId}&fields=name,formatted_address,photos,rating,user_ratings_total,geometry,types,website&key=${GOOGLE_PLACES_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.result) {
      return data.result;
    }
    return null;
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
}

/**
 * Get the URL of a photo.
 * @param photoReference - The reference of the photo.
 * @param maxwidth - The maximum width of the photo.
 * @returns The URL of the photo.
 */
export function getPhotoUrl(photoReference: string, maxwidth = 400): string {
  return `${Constants.expoConfig?.extra?.REACT_APP_PLACES_API_URL}photo?maxwidth=${maxwidth}&photoreference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`;
}
