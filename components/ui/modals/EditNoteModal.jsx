import {
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import ThemedText from "../../ThemedText";

const EditNoteModal = ({ visible, noteToEdit, onClose, onSave, onDelete }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  // When the modal becomes visible or the note changes, populate the state
  useEffect(() => {
    if (noteToEdit && visible) {
      setNoteTitle(noteToEdit.title);
      setNoteContent(noteToEdit.content);
    } else {
      // Reset when closed
      setNoteTitle("");
      setNoteContent("");
    }
  }, [noteToEdit, visible]);

  const handleSave = () => {
    if (!noteTitle || !noteContent) {
      Alert.alert("Error", "Please fill in both title and content.");
      return;
    }
    // Pass the updated note object back to the parent
    onSave({
      ...noteToEdit,
      title: noteTitle,
      content: noteContent,
    });
  };

  const handleDelete = () => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(noteToEdit.id), // Pass just the ID back
      },
    ]);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContainer}>
          <ThemedText style={modalStyles.modalTitle}>Edit Note</ThemedText>

          {/* Delete Button */}
          <TouchableOpacity
            style={modalStyles.deleteButton}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
          </TouchableOpacity>

          <TextInput
            placeholder="Note Title"
            value={noteTitle}
            onChangeText={setNoteTitle}
            style={modalStyles.input}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Write your memory..."
            value={noteContent}
            onChangeText={setNoteContent}
            style={[
              modalStyles.input,
              { height: 120, textAlignVertical: "top" },
            ]}
            multiline
            placeholderTextColor="#888"
          />
          <View style={modalStyles.buttonRow}>
            <TouchableOpacity
              onPress={onClose}
              style={[modalStyles.button, modalStyles.buttonCancel]}
            >
              <ThemedText style={modalStyles.buttonCancelText}>
                Cancel
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              style={[modalStyles.button, modalStyles.buttonSave]}
            >
              <ThemedText style={modalStyles.buttonSaveText}>
                Save Changes
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditNoteModal;

// Styles for the modal
const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  deleteButton: {
    position: "absolute",
    top: 18,
    right: 20,
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: "#F1F3F5",
    marginRight: 8,
  },
  buttonCancelText: {
    fontWeight: "600",
    color: "#495057",
  },
  buttonSave: {
    backgroundColor: "#FF6B6B",
    marginLeft: 8,
  },
  buttonSaveText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
