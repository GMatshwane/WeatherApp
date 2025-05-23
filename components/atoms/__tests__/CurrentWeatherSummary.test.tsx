import { render } from "@testing-library/react-native";
import React from "react";
import CurrentWeatherSummary from "../CurrentWeatherSummary";

describe("CurrentWeatherSummary", () => {
  const mockProps = {
    temp_min: 24,
    temp: 25,
    temp_max: 26,
  };

  it("renders correctly with provided temperatures", () => {
    const { getByText } = render(<CurrentWeatherSummary {...mockProps} />);
    expect(getByText("24°")).toBeTruthy();
    expect(getByText("25°")).toBeTruthy();
    expect(getByText("26°")).toBeTruthy();
  });
});
