import { render, screen } from "@testing-library/react-native";
import React from "react";
import LoadingModal from "../LoadingModal";

describe("LoadingModal", () => {
  it("renders correctly when visible", () => {
    const testText = "Loading...";
    render(<LoadingModal visible={true} text={testText} />);

    // Check if the text is rendered
    expect(screen.getByText(testText)).toBeTruthy();
  });

  it("does not render when not visible", () => {
    const testText = "Loading...";
    render(<LoadingModal visible={false} text={testText} />);

    // Check if the text is not rendered
    expect(screen.queryByText(testText)).toBeNull();
  });

  it("renders with different text content", () => {
    const customText = "Please wait...";
    render(<LoadingModal visible={true} text={customText} />);

    // Check if the custom text is rendered
    expect(screen.getByText(customText)).toBeTruthy();
  });
});
