import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import ThemedText from "../components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import { styles } from "../Styles/TripDetails.styles"; // Correct named import

export default function TripDetails() {
  const params = useLocalSearchParams();

  const [photos, setPhotos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const trip = {
    id: params.id,
    destination: params.destination,
    date: params.date,
    image: params.image,
    gradient: JSON.parse(params.gradient || '["#FF6B6B", "#FF8E53"]'),
    days: params.days,
    memories: params.memories,
  };

  // Load trip details on mount
  useEffect(() => {
    const loadTripDetails = async () => {
      try {
        const storedTrips = await AsyncStorage.getItem("@trips");
        if (!storedTrips) return;

        const trips = JSON.parse(storedTrips);
        const foundTrip = trips.find((t) => t.id === trip.id);

        if (foundTrip) {
          // Filter out any "blank" (null or undefined) entries
          const cleanPhotos = (foundTrip.photos || []).filter((photo) => photo);
          const cleanNotes = (foundTrip.notes || []).filter((note) => note);

          setPhotos(cleanPhotos);
          setNotes(cleanNotes);
          console.log("Loaded CLEAN data:", {
            photos: cleanPhotos,
            notes: cleanNotes,
          });
        }
      } catch (error) {
        console.error("Failed to load trip details:", error);
      }
    };

    loadTripDetails();
  }, [trip.id]);
  const saveTripData = async (updatedPhotos, updatedNotes) => {
    try {
      const storedTrips = await AsyncStorage.getItem("@trips");
      const trips = storedTrips ? JSON.parse(storedTrips) : [];

      const updatedTrips = trips.map((t) =>
        t.id === trip.id
          ? {
              ...t,
              photos: updatedPhotos !== undefined ? updatedPhotos : t.photos,
              notes: updatedNotes !== undefined ? updatedNotes : t.notes,
            }
          : t
      );

      await AsyncStorage.setItem("@trips", JSON.stringify(updatedTrips));
    } catch (error) {
      console.error("❌ Failed to save trip data:", error);
    }
  };

  // Add Photo Function
  const addPhotoToTrip = async () => {
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Correct enum
        allowsEditing: true,
        quality: 0.8,
      });

      if (result.canceled) return;

      const pickedUri = result.assets[0].uri;

      Alert.prompt(
        "Add Caption",
        "Write a short caption for this photo:",
        async (caption) => {
          const newPhoto = {
            id: uuid.v4(),
            uri: pickedUri,
            caption: caption || "Untitled",
          };
          const updatedPhotos = [...photos, newPhoto];

          setPhotos(updatedPhotos);
          await saveTripData(updatedPhotos, notes); // Pass both states

          console.log("✅ Photo added successfully!");
        }
      );
    } catch (error) {
      console.error("❌ Failed to add photo:", error);
    }
  };

  // Add Note Function
  const addNoteToTrip = async () => {
    if (!noteTitle || !noteContent) {
      Alert.alert("Error", "Please fill in both title and content.");
      return;
    }

    const newNote = {
      id: uuid.v4(),
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      title: noteTitle,
      content: noteContent,
      mood: "📝", // Default mood
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    await saveTripData(photos, updatedNotes); // Pass both states

    // Reset modal state
    setNoteTitle("");
    setNoteContent("");
    setNoteModalVisible(false);
  };

  // Delete Trip Function
  const deleteTripById = async (id) => {
    try {
      Alert.alert(
        "Delete Trip",
        "Are you sure you want to delete this trip and all its memories?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              const storedTrips = await AsyncStorage.getItem("@trips");
              if (!storedTrips) return;

              const trips = JSON.parse(storedTrips).filter((t) => t.id !== id);
              await AsyncStorage.setItem("@trips", JSON.stringify(trips));

              router.back(); // Go back to the previous screen
            },
          },
        ]
      );
    } catch (error) {
      console.error("❌ Failed to delete trip:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={trip.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <ThemedText style={styles.headerEmoji}>{trip.image}</ThemedText>
            <ThemedText style={styles.headerTitle}>
              {trip.destination}
            </ThemedText>
            <ThemedText style={styles.headerDate}>{trip.date}</ThemedText>

            <View style={styles.headerStats}>
              <View style={styles.headerStat}>
                <Ionicons
                  name="images"
                  size={16}
                  color="rgba(255,255,255,0.9)"
                />
                <ThemedText style={styles.headerStatText}>
                  {photos.length} Photos
                </ThemedText>
              </View>
              <View style={styles.headerStat}>
                <Ionicons
                  name="document-text"
                  size={16}
                  color="rgba(255,255,255,0.9)"
                />
                <ThemedText style={styles.headerStatText}>
                  {notes.length} Notes
                </ThemedText>
              </View>
              <View style={styles.headerStat}>
                <Ionicons
                  name="calendar"
                  size={16}
                  color="rgba(255,255,255,0.9)"
                />
                <ThemedText style={styles.headerStatText}>
                  {trip.days} Days
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              position: "absolute",
              right: 20,
              top: 60, // Assumes paddingTop is 60 from your styles
            }}
          >
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => console.log("TODO: Edit Trip Details")}
            >
              <Ionicons name="create-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteTripById(trip.id)}
              style={styles.editButton}
            >
              <Ionicons name="trash" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Decorative circles */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
      </LinearGradient>

      {/* Main Scroll Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Photos Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="images" size={24} color={trip.gradient[0]} />
            <ThemedText
              style={[styles.sectionTitle, { color: trip.gradient[0] }]}
            >
              Photos
            </ThemedText>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photosContainer}
          >
            {photos.map((photo) => (
              <TouchableOpacity key={photo.id} activeOpacity={0.8}>
                <View style={styles.photoCard}>
                  <Image source={{ uri: photo.uri }} style={styles.photo} />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.7)"]}
                    style={styles.photoOverlay}
                  >
                    <ThemedText style={styles.photoCaption} numberOfLines={2}>
                      {photo.caption}
                    </ThemedText>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.addPhotoCard}
              onPress={addPhotoToTrip}
              activeOpacity={0.7}
            >
              <Ionicons name="add-circle-outline" size={40} color="#999" />
              <ThemedText style={styles.addPhotoText}>Add Photo</ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Notes Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="document-text" size={24} color={trip.gradient[0]} />
            <ThemedText
              style={[styles.sectionTitle, { color: trip.gradient[0] }]}
            >
              Travel Notes
            </ThemedText>
          </View>

          {/* Corrected Note List */}
          {Array.isArray(notes) && notes.length > 0 ? (
            notes.map((note, index) => (
              <TouchableOpacity
                key={note.id}
                activeOpacity={0.7}
                style={[
                  styles.noteCard,
                  index === notes.length - 1 && styles.lastNote,
                ]}
                onPress={() => console.log("TODO: Open Note Details")}
              >
                <View style={styles.noteHeader}>
                  <View style={styles.noteLeft}>
                    <ThemedText style={styles.noteMood}>{note.mood}</ThemedText>
                    <View>
                      <ThemedText style={styles.noteTitle} numberOfLines={1}>
                        {note.title}
                      </ThemedText>
                      <View style={styles.noteDateTime}>
                        <ThemedText style={styles.noteDate}>
                          {note.date}
                        </ThemedText>
                        <ThemedText style={styles.noteSeparator}>•</ThemedText>
                        <ThemedText style={styles.noteTime}>
                          {note.time}
                        </ThemedText>
                      </View>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </View>

                <ThemedText style={styles.noteContent} numberOfLines={3}>
                  {note.content}
                </ThemedText>
              </TouchableOpacity>
            ))
          ) : (
            <ThemedText
              style={{ color: "#888", marginBottom: 16, textAlign: "center" }}
            >
              No notes added yet.
            </ThemedText>
          )}

          {/* Add Note Button */}
          <TouchableOpacity
            style={styles.addNoteButton}
            onPress={() => setNoteModalVisible(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="add-circle" size={20} color={trip.gradient[0]} />
            <ThemedText
              style={[styles.addNoteText, { color: trip.gradient[0] }]}
            >
              Add New Note
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Note Modal */}
      <Modal
        visible={noteModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setNoteModalVisible(false)}
      >
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContainer}>
            <ThemedText style={modalStyles.modalTitle}>New Note</ThemedText>
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
                onPress={() => setNoteModalVisible(false)}
                style={[modalStyles.button, modalStyles.buttonCancel]}
              >
                <ThemedText style={modalStyles.buttonCancelText}>
                  Cancel
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addNoteToTrip}
                style={[modalStyles.button, modalStyles.buttonSave]}
              >
                <ThemedText style={modalStyles.buttonSaveText}>Save</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
    backgroundColor: "#FF6B6B", // Example color,
    marginLeft: 8,
  },
  buttonSaveText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
