import { render } from "@testing-library/react-native";
import React from "react";
import WeatherPulse from "../WeatherPulse";

describe("WeatherPulse", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<WeatherPulse />);
    expect(getByTestId("weather-pulse")).toBeTruthy();
  });
});
