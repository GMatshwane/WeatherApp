import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

/**
 * The confirmation modal props.
 */
interface ConfirmationModalProps {
  visible: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  text: string;
}

/**
 * The confirmation modal component.
 * @param visible - The visible.
 * @param onRequestClose - The on request close.
 * @param onConfirm - The on confirm.
 * @param onCancel - The on cancel.
 * @param text - The text.
 */
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onRequestClose,
  onConfirm,
  onCancel,
  text,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{text}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

/**
 * The styles for the confirmation modal.
 */
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    minWidth: 100,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#ff4444",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ConfirmationModal;
