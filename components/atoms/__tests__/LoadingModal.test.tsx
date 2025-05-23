import { render } from "@testing-library/react-native";
import React from "react";
import LoadingModal from "../LoadingModal";

describe("LoadingModal", () => {
  it("renders correctly when visible is true", () => {
    const { getByText } = render(
      <LoadingModal visible={true} text="Loading..." />,
    );
    expect(getByText("Loading...")).toBeTruthy();
  });

  it("renders correctly when visible is false", () => {
    const { queryByText } = render(
      <LoadingModal visible={false} text="Loading..." />,
    );
    expect(queryByText("Loading...")).toBeNull();
  });
});
