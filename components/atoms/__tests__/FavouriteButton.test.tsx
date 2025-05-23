import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import FavouriteButton from "../FavouriteButton";

describe("FavouriteButton", () => {
  it("renders correctly when not favourited", () => {
    const { getByTestId } = render(
      <FavouriteButton isFavourite={false} onToggle={() => {}} />,
    );
    const button = getByTestId("favourite-button");
    expect(button).toBeTruthy();
  });

  it("renders correctly when favourited", () => {
    const { getByTestId } = render(
      <FavouriteButton isFavourite={true} onToggle={() => {}} />,
    );
    const button = getByTestId("favourite-button");
    expect(button).toBeTruthy();
  });

  it("calls onToggle when pressed", () => {
    const onToggleMock = jest.fn();
    const { getByTestId } = render(
      <FavouriteButton isFavourite={false} onToggle={onToggleMock} />,
    );
    const button = getByTestId("favourite-button");
    fireEvent.press(button);
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });
});
