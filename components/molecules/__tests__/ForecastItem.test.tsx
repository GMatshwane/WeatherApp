import { render } from "@testing-library/react-native";
import React from "react";
import Forecast from "../ForecastItem";

describe("ForecastItem", () => {
  const mockForecast = {
    cod: "200",
    message: 0,
    cnt: 1,
    list: [
      {
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
      },
    ],
    city: {
      id: 1,
      name: "New York",
      coord: { lat: 40.7128, lon: -74.006 },
      country: "US",
      population: 8175133,
      timezone: -14400,
      sunrise: 1716422400,
      sunset: 1716422400,
    },
  };

  it("renders correctly with a forecast item", () => {
    const { getByText } = render(<Forecast item={mockForecast} />);
    expect(getByText("Thursday")).toBeTruthy();
    expect(getByText("25°")).toBeTruthy();
  });
});
