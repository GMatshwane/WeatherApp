import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import ConfirmationModal from "../ConfirmationModal";

describe("ConfirmationModal", () => {
  const mockOnRequestClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();
  const testText = "Are you sure you want to proceed?";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when visible", () => {
    const { getByText } = render(
      <ConfirmationModal
        visible={true}
        onRequestClose={mockOnRequestClose}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        text={testText}
      />,
    );

    expect(getByText(testText)).toBeTruthy();
    expect(getByText("Cancel")).toBeTruthy();
    expect(getByText("Confirm")).toBeTruthy();
  });

  it("does not render when not visible", () => {
    const { queryByText } = render(
      <ConfirmationModal
        visible={false}
        onRequestClose={mockOnRequestClose}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        text={testText}
      />,
    );

    expect(queryByText(testText)).toBeNull();
  });

  it("calls onConfirm when confirm button is pressed", () => {
    const { getByText } = render(
      <ConfirmationModal
        visible={true}
        onRequestClose={mockOnRequestClose}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        text={testText}
      />,
    );

    fireEvent.press(getByText("Confirm"));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when cancel button is pressed", () => {
    const { getByText } = render(
      <ConfirmationModal
        visible={true}
        onRequestClose={mockOnRequestClose}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        text={testText}
      />,
    );

    fireEvent.press(getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
