import {
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import ThemedText from "../../ThemedText";
// We don't import styles from Galery.styles.js here, we use local styles

const AddPhotoModal = ({ visible, onClose, onPhotoAdded }) => {
  const [allTrips, setAllTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showTripSelector, setShowTripSelector] = useState(false);
  const [pickedImageUri, setPickedImageUri] = useState(null);
  const [caption, setCaption] = useState("");

  // Load all trips when the modal becomes visible
  useEffect(() => {
    if (visible) {
      loadAllTrips();
    } else {
      // Reset form when closed
      resetForm();
    }
  }, [visible]);

  const loadAllTrips = async () => {
    try {
      const storedTrips = await AsyncStorage.getItem("@trips");
      const trips = storedTrips ? JSON.parse(storedTrips) : [];
      setAllTrips(trips);
    } catch (e) {
      console.error("Failed to load trips for modal", e);
    }
  };

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "We need access to your photos to add trip memories."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }
      setPickedImageUri(result.assets[0].uri);
    } catch (error) {
      console.error("Failed to pick image:", error);
    }
  };

  const handleSave = async () => {
    if (!pickedImageUri) {
      Alert.alert("No Photo", "Please pick a photo first.");
      return;
    }
    if (!selectedTrip) {
      Alert.alert("No Trip", "Please select a trip to save this photo to.");
      return;
    }

    // Create the new photo object
    const newPhoto = {
      id: uuid.v4(),
      uri: pickedImageUri,
      caption: caption || "Untitled",
    };

    // Find the trip to update
    const tripToUpdate = allTrips.find((trip) => trip.id === selectedTrip.id);

    // Add the new photo to its photos array
    const updatedPhotos = [...(tripToUpdate.photos || []), newPhoto];

    // Create the updated trip object
    const updatedTrip = {
      ...tripToUpdate,
      photos: updatedPhotos,
    };

    // Create the final list of all trips
    const updatedTripsList = allTrips.map((trip) =>
      trip.id === updatedTrip.id ? updatedTrip : trip
    );

    // Save back to AsyncStorage
    try {
      await AsyncStorage.setItem("@trips", JSON.stringify(updatedTripsList));
      Alert.alert("Success", "Photo added to your trip!");
      onPhotoAdded(); // Tell the gallery screen to refresh
      onClose(); // Close this modal
    } catch (error) {
      console.error("Failed to save photo to trip:", error);
      Alert.alert("Error", "Could not save photo.");
    }
  };

  const resetForm = () => {
    setPickedImageUri(null);
    setCaption("");
    setSelectedTrip(null);
    setShowTripSelector(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContainer}>
          {/* Header */}
          <LinearGradient
            colors={["#FF6B6B", "#FF8E53"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={modalStyles.modalHeader}
          >
            <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
              <Ionicons name="close" size={28} color="#FFF" />
            </TouchableOpacity>
            <ThemedText style={modalStyles.modalTitle}>
              Add New Photo
            </ThemedText>
          </LinearGradient>

          {/* Content */}
          <ScrollView
            style={modalStyles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Image Picker */}
            <View style={modalStyles.inputGroup}>
              <View style={modalStyles.inputLabel}>
                <Ionicons name="image" size={20} color={"#FF6B6B"} />
                <ThemedText style={modalStyles.labelText}>Photo</ThemedText>
              </View>
              <TouchableOpacity
                style={modalStyles.imagePicker}
                onPress={pickImage}
              >
                {pickedImageUri ? (
                  <Image
                    source={{ uri: pickedImageUri }}
                    style={modalStyles.imagePreview}
                  />
                ) : (
                  <>
                    <Ionicons name="camera-outline" size={32} color="#666" />
                    <ThemedText style={modalStyles.imagePickerText}>
                      Tap to select a photo
                    </ThemedText>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Caption Input */}
            <View style={modalStyles.inputGroup}>
              <View style={modalStyles.inputLabel}>
                <Ionicons name="text" size={20} color={"#FF6B6B"} />
                <ThemedText style={modalStyles.labelText}>
                  Caption (Optional)
                </ThemedText>
              </View>
              <TextInput
                style={modalStyles.input}
                placeholder="Write a caption for your photo..."
                placeholderTextColor="#999"
                value={caption}
                onChangeText={setCaption}
              />
            </View>

            {/* Trip Selector (Dropdown) */}
            <View style={modalStyles.inputGroup}>
              <View style={modalStyles.inputLabel}>
                <Ionicons name="map" size={20} color={"#FF6B6B"} />
                <ThemedText style={modalStyles.labelText}>
                  Save to Trip
                </ThemedText>
              </View>
              <TouchableOpacity
                style={modalStyles.dropdownButton}
                onPress={() => setShowTripSelector(!showTripSelector)}
              >
                <ThemedText style={modalStyles.dropdownButtonText}>
                  {selectedTrip ? selectedTrip.destination : "Select a trip..."}
                </ThemedText>
                <Ionicons
                  name={showTripSelector ? "chevron-up" : "chevron-down"}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>

              {/* Dropdown List */}
              {showTripSelector && (
                <View style={modalStyles.dropdownList}>
                  <ScrollView
                    nestedScrollEnabled={true}
                    style={{ maxHeight: 150 }}
                  >
                    {allTrips.length > 0 ? (
                      allTrips.map((trip) => (
                        <TouchableOpacity
                          key={trip.id}
                          style={modalStyles.dropdownItem}
                          onPress={() => {
                            setSelectedTrip(trip);
                            setShowTripSelector(false);
                          }}
                        >
                          <ThemedText style={modalStyles.dropdownItemText}>
                            {trip.image} {trip.destination}
                          </ThemedText>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <View style={modalStyles.dropdownItem}>
                        <ThemedText style={modalStyles.dropdownItemText}>
                          No trips found. Create a trip first.
                        </ThemedText>
                      </View>
                    )}
                  </ScrollView>
                </View>
              )}
            </View>
            <View style={{ height: 20 }} />
          </ScrollView>

          {/* Action Buttons */}
          <View style={modalStyles.actionButtons}>
            <TouchableOpacity
              style={modalStyles.cancelButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <ThemedText style={modalStyles.cancelButtonText}>
                Cancel
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={modalStyles.saveButton}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#FF6B6B", "#FF8E53"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={modalStyles.saveButtonGradient}
              >
                <Ionicons name="add" size={20} color="#FFF" />
                <ThemedText style={modalStyles.saveButtonText}>
                  Add Photo
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddPhotoModal;

// Styles for this specific modal
const modalStyles = StyleSheet.create({
  // Modal Container
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "85%",
    overflow: "hidden",
  },
  modalHeader: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  // Form elements
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  // Image Picker
  imagePicker: {
    height: 150,
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imagePreview: {
    height: "100%",
    width: "100%",
  },
  imagePickerText: {
    color: "#666",
    marginTop: 8,
  },
  // Dropdown
  dropdownButton: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButtonText: {
    fontSize: 15,
    color: "#1A1A1A",
  },
  dropdownList: {
    // maxHeight: 150, (removed to allow inner scrollview to control)
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 8,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dropdownItemText: {
    fontSize: 15,
  },
  // Action Buttons
  actionButtons: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFF",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  saveButton: {
    flex: 2,
    borderRadius: 12,
    overflow: "hidden",
  },
  saveButtonGradient: {
    flexDirection: "row",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});
