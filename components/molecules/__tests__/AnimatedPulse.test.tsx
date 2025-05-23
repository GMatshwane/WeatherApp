import { render } from "@testing-library/react-native";
import React from "react";
import AnimatedPulse from "../AnimatedPulse";

describe("AnimatedPulse", () => {
  it("renders correctly with default delay", () => {
    const { getByTestId } = render(<AnimatedPulse />);
    expect(getByTestId("animated-pulse")).toBeTruthy();
  });

  it("renders correctly with custom delay", () => {
    const { getByTestId } = render(<AnimatedPulse delay={500} />);
    expect(getByTestId("animated-pulse")).toBeTruthy();
  });
});
