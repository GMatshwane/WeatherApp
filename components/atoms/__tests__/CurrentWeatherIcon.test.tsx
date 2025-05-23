import { render } from "@testing-library/react-native";
import React from "react";
import CurrentWeatherIcon from "../CurrentWeatherIcon";

// Mock the image imports
jest.mock("@/assets/icons/clear.png", () => "clear-icon");
jest.mock("@/assets/icons/rain.png", () => "rain-icon");
jest.mock("@/assets/icons/clouds.png", () => "clouds-icon");

describe("CurrentWeatherIcon", () => {
  const mockWeather = {
    dt: 1716422400,
    dt_txt: new Date("2024-05-23T00:00:00Z"),
    main: {
      temp: 25,
      feels_like: 26,
      temp_min: 24,
      temp_max: 26,
      pressure: 1015,
      sea_level: 1015,
      grnd_level: 1014,
      humidity: 60,
      temp_kf: 0,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "Clear sky",
        icon: "01d",
      },
    ],
    clouds: { all: 0 },
    wind: { speed: 5, deg: 180, gust: 7 },
    visibility: 10000,
    pop: 0,
    sys: { pod: "d" },
  };

  it('renders correctly with icon "clear"', () => {
    const { getByText } = render(
      <CurrentWeatherIcon icon="clear" weather={mockWeather} />,
    );
    expect(getByText("Clear sky")).toBeTruthy();
  });

  it('renders correctly with icon "rain"', () => {
    const { getByText } = render(
      <CurrentWeatherIcon icon="rain" weather={mockWeather} />,
    );
    expect(getByText("Clear sky")).toBeTruthy();
  });

  it('renders correctly with icon "clouds"', () => {
    const { getByText } = render(
      <CurrentWeatherIcon icon="clouds" weather={mockWeather} />,
    );
    expect(getByText("Clear sky")).toBeTruthy();
  });
});
