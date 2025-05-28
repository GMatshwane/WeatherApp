import { CurrentWeather } from "@/models/current";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import {
  getPlaceDetails,
  searchPlaceByName,
} from "../../../services/googlePlacesService";
import FavouriteDetailsModal from "../FavouriteDetailsModal";

// Mock the Google Places service
jest.mock("../../../services/googlePlacesService", () => ({
  getPlaceDetails: jest.fn(),
  searchPlaceByName: jest.fn(),
  getPhotoUrl: jest.fn(),
}));

describe("FavouriteDetailsModal", () => {
  const mockLocation: CurrentWeather = {
    coord: { lon: 0, lat: 0 },
    weather: [{ id: 800, main: "Clear", description: "Sunny", icon: "01d" }],
    base: "stations",
    main: {
      temp: 25,
      feels_like: 26,
      temp_min: 20,
      temp_max: 30,
      pressure: 1013,
      humidity: 50,
    },
    visibility: 10000,
    wind: { speed: 5, deg: 180, gust: 7 },
    rain: { "1h": 0 },
    clouds: { all: 0 },
    dt: 1234567890,
    sys: {
      type: 1,
      id: 1234,
      country: "US",
      sunrise: 1234567890,
      sunset: 1234567890,
    },
    timezone: 0,
    id: 1234567,
    name: "Test City",
    cod: 200,
  };

  const mockPlaceDetails = {
    formatted_address: "123 Test Street",
    rating: 4.5,
    user_ratings_total: 100,
    website: "https://test.com",
    photos: [{ photo_reference: "test1" }, { photo_reference: "test2" }],
    types: ["city", "locality"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (searchPlaceByName as jest.Mock).mockResolvedValue("test-place-id");
    (getPlaceDetails as jest.Mock).mockResolvedValue(mockPlaceDetails);
  });

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((msg, ...args) => {
      if (
        typeof msg === "string" &&
        msg.includes("not wrapped in act") &&
        msg.includes("Icon")
      ) {
        return;
      }
      // @ts-ignore
      console.error(msg, ...args);
    });
  });

  afterAll(() => {
    // @ts-ignore
    // console.error.mockRestore();
  });

  it("renders correctly when visible", async () => {
    const { getByText } = render(
      <FavouriteDetailsModal
        visible={true}
        onRequestClose={() => {}}
        location={mockLocation}
      />,
    );

    await waitFor(() => {
      expect(getByText("Test City")).toBeTruthy();
      expect(getByText("25°C")).toBeTruthy();
    });
  });

  it("does not render when not visible", async () => {
    const { queryByText } = render(
      <FavouriteDetailsModal
        visible={false}
        onRequestClose={() => {}}
        location={mockLocation}
      />,
    );

    await waitFor(() => {
      expect(queryByText("Test City")).toBeNull();
    });
  });

  it("shows loading state while fetching place details", async () => {
    const { getByText } = render(
      <FavouriteDetailsModal
        visible={true}
        onRequestClose={() => {}}
        location={mockLocation}
      />,
    );

    await waitFor(() => {
      expect(getByText("Loading place details...")).toBeTruthy();
    });
  });

  it("displays place details after successful fetch", async () => {
    const { getByText } = render(
      <FavouriteDetailsModal
        visible={true}
        onRequestClose={() => {}}
        location={mockLocation}
      />,
    );

    await waitFor(() => {
      expect(getByText("Location Details")).toBeTruthy();
      expect(getByText("123 Test Street")).toBeTruthy();
      expect(getByText("Rating: 4.5 (100 reviews)")).toBeTruthy();
      expect(getByText("Visit Website")).toBeTruthy();
    });
  });

  it("shows error state when place details fetch fails", async () => {
    (searchPlaceByName as jest.Mock).mockRejectedValue(new Error("API Error"));

    // Suppress expected error log for this test
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const { getByText } = render(
      <FavouriteDetailsModal
        visible={true}
        onRequestClose={() => {}}
        location={mockLocation}
      />,
    );

    await waitFor(() => {
      expect(getByText("Failed to fetch place details")).toBeTruthy();
      expect(getByText("Retry")).toBeTruthy();
    });

    errorSpy.mockRestore();
  });

  it("calls onRequestClose when close button is pressed", async () => {
    const mockOnRequestClose = jest.fn();
    const { getByTestId } = render(
      <FavouriteDetailsModal
        visible={true}
        onRequestClose={mockOnRequestClose}
        location={mockLocation}
      />,
    );

    await waitFor(() => {
      fireEvent.press(getByTestId("close-button"));
      expect(mockOnRequestClose).toHaveBeenCalledTimes(1);
    });
  });
});
