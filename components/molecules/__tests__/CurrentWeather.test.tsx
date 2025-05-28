import { render } from "@testing-library/react-native";
import React from "react";
import { ImageSourcePropType } from "react-native";
import CurrentWeather from "../CurrentWeather";

describe("CurrentWeather", () => {
  const mockProps = {
    temperature: 25,
    weatherType: "sunny",
    location: "New York",
    backgroundImage: { uri: "mocked-image-uri" } as ImageSourcePropType,
    isFavourite: false,
    onToggleFavourite: jest.fn(),
  };

  it("renders correctly with all props", () => {
    const { getByText } = render(<CurrentWeather {...mockProps} />);

    expect(getByText("25°")).toBeTruthy();
    expect(getByText("New York")).toBeTruthy();
  });

  it("renders correctly without location", () => {
    const { getByText, queryByText } = render(
      <CurrentWeather {...mockProps} location={""} />,
    );

    expect(getByText("25°")).toBeTruthy();
    expect(queryByText("New York")).toBeNull();
  });

  it("displays temperature with correct format", () => {
    const { getByText } = render(<CurrentWeather {...mockProps} />);
    const temperatureElement = getByText("25°");
    expect(temperatureElement).toBeTruthy();
  });
});
