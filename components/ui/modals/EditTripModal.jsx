import {
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  styles,
  gradientOptions,
  emojiOptions,
} from "../modals/TripModal.style";

// utils
import ThemedText from "../../ThemedText";

const EditTripModal = ({ visible, onClose, onSave, tripToEdit }) => {
  const [selectedGradient, setSelectedGradient] = useState(gradientOptions[0]);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [tripData, setTripData] = useState({
    destination: "",
    startDate: null,
    endDate: null,
    emoji: "✈️",
    notes: "",
  });

  // This effect populates the form when the modal is opened with a trip
  useEffect(() => {
    if (tripToEdit && visible) {
      // Find the gradient object that matches the trip's gradient array
      const currentGradient =
        gradientOptions.find(
          (g) => g.colors.join("") === (tripToEdit.gradient || []).join("")
        ) || gradientOptions[0];

      setSelectedGradient(currentGradient);

      setTripData({
        destination: tripToEdit.destination || "",
        // Ensure dates are Date objects for the picker
        startDate: tripToEdit.startDate ? new Date(tripToEdit.startDate) : null,
        endDate: tripToEdit.endDate ? new Date(tripToEdit.endDate) : null,
        emoji: tripToEdit.emoji || "✈️",
        notes: tripToEdit.notes || "",
      });
    }
  }, [tripToEdit, visible]);

  const onStartDateChange = (event, selectedDate) => {
    if (Platform.OS === "ios") {
      setShowStartPicker(false);
      if (selectedDate) {
        setTripData({ ...tripData, startDate: selectedDate });
      }
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    if (Platform.OS === "ios") {
      setShowEndPicker(false);
      if (selectedDate) {
        setTripData({ ...tripData, endDate: selectedDate });
      }
    }
  };

  const showStartDatepicker = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: tripData.startDate || new Date(),
        onChange: (event, selectedDate) => {
          if (event.type === "set" && selectedDate) {
            setTripData({ ...tripData, startDate: selectedDate });
          }
        },
        mode: "date",
        is24Hour: true,
      });
    } else {
      setShowStartPicker(true);
    }
  };

  const showEndDatepicker = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: tripData.endDate || tripData.startDate || new Date(),
        onChange: (event, selectedDate) => {
          if (event.type === "set" && selectedDate) {
            setTripData({ ...tripData, endDate: selectedDate });
          }
        },
        mode: "date",
        is24Hour: true,
        minimumDate: tripData.startDate || new Date(),
      });
    } else {
      setShowEndPicker(true);
    }
  };

  const handleSave = async () => {
    if (tripData.destination && tripData.startDate && tripData.endDate) {
      const updatedTrip = {
        ...tripToEdit, // Keep existing ID and memories/photos
        destination: tripData.destination,
        startDate: tripData.startDate.toISOString(), // Store as string
        endDate: tripData.endDate.toISOString(), // Store as string
        emoji: tripData.emoji,
        notes: tripData.notes,
        gradient: selectedGradient.colors,
        image: tripData.emoji, // 'image' and 'emoji' seem to be used for the same thing
        date: `${formatDate(tripData.startDate)} - ${formatDate(
          tripData.endDate
        )}`,
        days: calculateDays(tripData.startDate, tripData.endDate),
      };

      // onSave is passed from tripDetails.jsx and will handle AsyncStorage
      onSave?.(updatedTrip);
      handleClose();
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const options = { month: "short", day: "numeric", year: "numeric" };
    // Ensure we are working with a Date object
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", options);
  };

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    return (
      Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)) + 1
    );
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <LinearGradient
            colors={selectedGradient.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.modalHeader}
          >
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#FFF" />
            </TouchableOpacity>
            <ThemedText style={styles.modalTitle}>Edit Trip</ThemedText>
            <ThemedText style={styles.modalSubtitle}>
              Update your adventure
            </ThemedText>

            {/* Preview Emoji */}
            <View style={styles.emojiPreview}>
              <ThemedText style={styles.emojiPreviewText}>
                {tripData.emoji}
              </ThemedText>
            </View>
          </LinearGradient>

          <ScrollView
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Destination Input */}
            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <Ionicons
                  name="location"
                  size={20}
                  color={selectedGradient.colors[0]}
                />
                <ThemedText style={styles.labelText}>Destination</ThemedText>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Where are you going?"
                placeholderTextColor="#999"
                value={tripData.destination}
                onChangeText={(text) =>
                  setTripData({ ...tripData, destination: text })
                }
              />
            </View>

            {/* Date Inputs */}
            <View style={styles.dateContainer}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <View style={styles.inputLabel}>
                  <Ionicons
                    name="calendar"
                    size={20}
                    color={selectedGradient.colors[0]}
                  />
                  <ThemedText style={styles.labelText}>Start Date</ThemedText>
                </View>
                <TouchableOpacity
                  style={styles.input}
                  onPress={showStartDatepicker}
                >
                  <ThemedText
                    style={{ color: tripData.startDate ? "#1A1A1A" : "#999" }}
                  >
                    {tripData.startDate
                      ? formatDate(tripData.startDate)
                      : "Select Start Date"}
                  </ThemedText>
                </TouchableOpacity>
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <View style={styles.inputLabel}>
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={selectedGradient.colors[0]}
                  />
                  <ThemedText style={styles.labelText}>End Date</ThemedText>
                </View>
                <TouchableOpacity
                  style={styles.input}
                  onPress={showEndDatepicker}
                >
                  <ThemedText
                    style={{ color: tripData.endDate ? "#1A1A1A" : "#999" }}
                  >
                    {tripData.endDate
                      ? formatDate(tripData.endDate)
                      : "Select End Date"}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            {/* iOS Date Pickers */}
            {Platform.OS === "ios" && showStartPicker && (
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={tripData.startDate || new Date()}
                  mode="date"
                  display="spinner"
                  onChange={onStartDateChange}
                />
              </View>
            )}

            {Platform.OS === "ios" && showEndPicker && (
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={tripData.endDate || tripData.startDate || new Date()}
                  mode="date"
                  display="spinner"
                  onChange={onEndDateChange}
                  minimumDate={tripData.startDate || new Date()}
                />
              </View>
            )}

            {/* Emoji Selector */}
            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <Ionicons
                  name="happy"
                  size={20}
                  color={selectedGradient.colors[0]}
                />
                <ThemedText style={styles.labelText}>Choose Icon</ThemedText>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.emojiContainer}
              >
                {emojiOptions.map((emoji, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.emojiOption,
                      tripData.emoji === emoji && styles.emojiOptionSelected,
                    ]}
                    onPress={() => setTripData({ ...tripData, emoji })}
                    activeOpacity={0.7}
                  >
                    <ThemedText style={styles.emojiText}>{emoji}</ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Color Theme Selector */}
            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <Ionicons
                  name="color-palette"
                  size={20}
                  color={selectedGradient.colors[0]}
                />
                <ThemedText style={styles.labelText}>Color Theme</ThemedText>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.gradientContainer}
              >
                {gradientOptions.map((gradient) => (
                  <TouchableOpacity
                    key={gradient.id}
                    onPress={() => setSelectedGradient(gradient)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={gradient.colors}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={[
                        styles.gradientOption,
                        selectedGradient.id === gradient.id &&
                          styles.gradientOptionSelected,
                      ]}
                    >
                      {selectedGradient.id === gradient.id && (
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color="#FFF"
                        />
                      )}
                    </LinearGradient>
                    <ThemedText style={styles.gradientName}>
                      {gradient.name}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Notes Input */}
            <View style={styles.inputGroup}>
              <View style={styles.inputLabel}>
                <Ionicons
                  name="document-text"
                  size={20}
                  color={selectedGradient.colors[0]}
                />
                <ThemedText style={styles.labelText}>
                  Notes (Optional)
                </ThemedText>
              </View>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add some notes about your trip..."
                placeholderTextColor="#999"
                value={tripData.notes}
                onChangeText={(text) =>
                  setTripData({ ...tripData, notes: text })
                }
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.bottomSpacer} />
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={selectedGradient.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.saveButtonGradient}
              >
                <Ionicons name="checkmark" size={20} color="#FFF" />
                <ThemedText style={styles.saveButtonText}>
                  Save Changes
                </ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditTripModal;
