import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import WeatherPulse from "./WeatherPulse";

/**
 * Loading modal component that shows a loading animation and a message.
 * @param visible - Whether the modal is visible or not.
 * @param text - The text to display in the modal.
 */
interface LoadingModalProps {
  /**
   * Whether the modal is visible or not.
   */
  visible: boolean;
  /**
   * The text to display in the modal.
   */
  text: string;
}
/**
 * Loading modal component that shows a loading animation and a message.
 * @param visible - Whether the modal is visible or not.
 * @param text - The text to display in the modal.
 * @returns The loading modal component.
 */
const LoadingModal: React.FC<LoadingModalProps> = ({
  visible,
  text,
}: LoadingModalProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <WeatherPulse />
          <Text style={styles.modalText}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;

/**
 * The styles for the loading modal.
 */
const styles = StyleSheet.create({
  /**
   * The overlay for the loading modal.
   */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  /**
   * The content for the loading modal.
   */
  modalContent: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  /**
   * The text for the loading modal.
   */
  modalText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },
});
