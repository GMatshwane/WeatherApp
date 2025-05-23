/**
 * The details of a place.
 */
export interface PlaceDetails {
  /**
   * The name of the place.
   */
  name: string;
  /**
   * The formatted address of the place.
   */
  formatted_address: string;
  /**
   * The photos of the place.
   */
  photos?: PlacePhoto[];
  /**
   * The rating of the place.
   */
  rating?: number;
  /**
   * The number of user ratings.
   */
  user_ratings_total?: number;
  /**
   * The geometry of the place.
   */
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
  /**
   * The types of the place.
   */
  types?: string[];
  /**
   * The website of the place.
   */
  website?: string;
}

/**
 * The photo of a place.
 */
export interface PlacePhoto {
  /**
   * The photo reference.
   */
  photo_reference: string;
  /**
   * The height of the photo.
   */
  height: number;
  /**
   * The width of the photo.
   */
  width: number;
}
