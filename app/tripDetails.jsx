import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import ThemedText from "../components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import { styles } from "../Styles/TripDetails.styles";
import EditTripModal from "../components/ui/modals/EditTripModal";
import EditNoteModal from "../components/ui/modals/EditNoteModal";

const { width } = Dimensions.get("window");

export default function TripDetails() {
  const params = useLocalSearchParams();

  const [trip, setTrip] = useState({
    id: params.id,
    destination: params.destination,
    date: params.date,
    image: params.image,
    photos: [],
    notes: [],
    gradient: JSON.parse(params.gradient || '["#FF6B6B", "#FF8E53"]'),
    days: params.days,
    memories: params.memories,
  });

  const [photos, setPhotos] = useState([]);
  const [notes, setNotes] = useState([]);

  // State for Modals
  const [addNoteModalVisible, setAddNoteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editNoteModalVisible, setEditNoteModalVisible] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);

  const [captionModalVisible, setCaptionModalVisible] = useState(false);
  const [pickedImageUri, setPickedImageUri] = useState(null);
  const [caption, setCaption] = useState("");

  // State for New Note Input
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  // State for selected items
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Load trip details on mount
  useEffect(() => {
    const loadTripDetails = async () => {
      try {
        const storedTrips = await AsyncStorage.getItem("@trips");
        if (!storedTrips) return;

        const trips = JSON.parse(storedTrips);
        const foundTrip = trips.find((t) => t.id === trip.id);

        if (foundTrip) {
          const cleanPhotos = (foundTrip.photos || []).filter((photo) => photo);
          const cleanNotes = (foundTrip.notes || []).filter((note) => note);

          setTrip(foundTrip);
          setPhotos(cleanPhotos);
          setNotes(cleanNotes);
        }
      } catch (error) {
        console.error("Failed to load trip details:", error);
      }
    };

    loadTripDetails();
  }, [trip.id]);

  // General function to save trip data
  const saveTripData = async (updatedData) => {
    try {
      const storedTrips = await AsyncStorage.getItem("@trips");
      const trips = storedTrips ? JSON.parse(storedTrips) : [];

      const updatedTrips = trips.map((t) =>
        t.id === trip.id
          ? {
              ...t,
              ...updatedData,
            }
          : t
      );

      await AsyncStorage.setItem("@trips", JSON.stringify(updatedTrips));
    } catch (error) {
      console.error("❌ Failed to save trip data:", error);
    }
  };

  // Handle saving an EDITED trip
  const handleSaveEdit = async (updatedTrip) => {
    try {
      const storedTrips = await AsyncStorage.getItem("@trips");
      const trips = storedTrips ? JSON.parse(storedTrips) : [];

      const updatedTrips = trips.map((t) =>
        t.id === updatedTrip.id ? updatedTrip : t
      );

      await AsyncStorage.setItem("@trips", JSON.stringify(updatedTrips));

      setTrip(updatedTrip);
      setEditModalVisible(false);
      console.log("✅ Trip updated successfully!");
    } catch (error) {
      console.error("❌ Failed to save edited trip:", error);
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const pickedUri = result.assets[0].uri;

      setPickedImageUri(pickedUri);
      setCaptionModalVisible(true);
    } catch (error) {
      console.error("❌ Failed to add photo:", error);
    }
  };

  // Handle saving the photo with caption
  const handleSavePhoto = async () => {
    if (!pickedImageUri) return;

    const newPhoto = {
      id: uuid.v4(),
      uri: pickedImageUri,
      caption: caption || "Untitled",
    };
    const updatedPhotos = [...photos, newPhoto];

    setPhotos(updatedPhotos);
    await saveTripData({ photos: updatedPhotos });

    console.log("✅ Photo added successfully!");

    setCaptionModalVisible(false);
    setPickedImageUri(null);
    setCaption("");
  };

  // Add NEW Note Function
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
      mood: "📝",
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    await saveTripData({ notes: updatedNotes });

    setNoteTitle("");
    setNoteContent("");
    setAddNoteModalVisible(false);
  };

  // Handle updating an EXISTING note
  const handleUpdateNote = async (updatedNote) => {
    try {
      const updatedNotes = notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
      setNotes(updatedNotes);
      await saveTripData({ notes: updatedNotes });
      setEditNoteModalVisible(false);
      setSelectedNote(null);
      console.log("✅ Note updated successfully!");
    } catch (error) {
      console.error("❌ Failed to update note:", error);
    }
  };

  // Handle DELETING an existing note
  const handleDeleteNote = async (noteId) => {
    try {
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
      await saveTripData({ notes: updatedNotes });
      setEditNoteModalVisible(false);
      setSelectedNote(null);
      console.log("✅ Note deleted successfully!");
    } catch (error) {
      console.error("❌ Failed to delete note:", error);
    }
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

              router.back();
            },
          },
        ]
      );
    } catch (error) {
      console.error("❌ Failed to delete trip:", error);
    }
  };

  // Function to open the edit note modal
  const openEditNote = (note) => {
    setSelectedNote(note);
    setEditNoteModalVisible(true);
  };

  // Function to open the photo modal
  const openPhotoModal = (photo) => {
    setSelectedPhoto(photo);
    setPhotoModalVisible(true);
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
        {/* --- MODIFIED SECTION START --- */}
        <View style={styles.headerContent}>
          {/* This new View will contain the top row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: 20, // This adds space between the buttons and the title
            }}
          >
            {/* Left Side: Back Button */}
            <TouchableOpacity
              // We add {marginBottom: 0} to override the style from TripDetails.styles.js
              style={[styles.backButton, { marginBottom: 0 }]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>

            {/* Right Side: Action Buttons */}
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setEditModalVisible(true)}
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

          {/* This part is unchanged, it's the centered info */}
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

          {/* The old absolutely positioned View for buttons is now REMOVED. */}
        </View>
        {/* --- MODIFIED SECTION END --- */}

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
              <TouchableOpacity
                key={photo.id}
                activeOpacity={0.8}
                onPress={() => openPhotoModal(photo)}
              >
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

          {/* Note List */}
          {Array.isArray(notes) && notes.length > 0 ? (
            notes.map((note, index) => (
              <TouchableOpacity
                key={note.id}
                activeOpacity={0.7}
                style={[
                  styles.noteCard,
                  index === notes.length - 1 && styles.lastNote,
                ]}
                onPress={() => openEditNote(note)}
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
            onPress={() => setAddNoteModalVisible(true)}
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

      {/* --- MODALS --- */}

      {/* Add Note Modal */}
      <Modal
        visible={addNoteModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setAddNoteModalVisible(false)}
      >
        <View style={addNoteModalStyles.modalOverlay}>
          <View style={addNoteModalStyles.modalContainer}>
            <ThemedText style={addNoteModalStyles.modalTitle}>
              New Note
            </ThemedText>
            <TextInput
              placeholder="Note Title"
              value={noteTitle}
              onChangeText={setNoteTitle}
              style={addNoteModalStyles.input}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Write your memory..."
              value={noteContent}
              onChangeText={setNoteContent}
              style={[
                addNoteModalStyles.input,
                { height: 120, textAlignVertical: "top" },
              ]}
              multiline
              placeholderTextColor="#888"
            />
            <View style={addNoteModalStyles.buttonRow}>
              <TouchableOpacity
                onPress={() => setAddNoteModalVisible(false)}
                style={[
                  addNoteModalStyles.button,
                  addNoteModalStyles.buttonCancel,
                ]}
              >
                <ThemedText style={addNoteModalStyles.buttonCancelText}>
                  Cancel
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addNoteToTrip}
                style={[
                  addNoteModalStyles.button,
                  addNoteModalStyles.buttonSave,
                ]}
              >
                <ThemedText style={addNoteModalStyles.buttonSaveText}>
                  Save
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Photo Caption Modal */}
      <Modal
        visible={captionModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setCaptionModalVisible(false)}
      >
        <View style={addNoteModalStyles.modalOverlay}>
          <View style={addNoteModalStyles.modalContainer}>
            <ThemedText style={addNoteModalStyles.modalTitle}>
              Add Caption
            </ThemedText>
            {pickedImageUri && (
              <Image
                source={{ uri: pickedImageUri }}
                style={[styles.photoCard, { width: "100%", marginBottom: 20 }]}
              />
            )}
            <TextInput
              placeholder="Write a caption..."
              value={caption}
              onChangeText={setCaption}
              style={addNoteModalStyles.input}
              placeholderTextColor="#888"
            />
            <View style={addNoteModalStyles.buttonRow}>
              <TouchableOpacity
                onPress={() => {
                  setCaptionModalVisible(false);
                  setPickedImageUri(null);
                  setCaption("");
                }}
                style={[
                  addNoteModalStyles.button,
                  addNoteModalStyles.buttonCancel,
                ]}
              >
                <ThemedText style={addNoteModalStyles.buttonCancelText}>
                  Cancel
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSavePhoto}
                style={[
                  addNoteModalStyles.button,
                  addNoteModalStyles.buttonSave,
                ]}
              >
                <ThemedText style={addNoteModalStyles.buttonSaveText}>
                  Save Photo
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Trip Modal */}
      <EditTripModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSaveEdit}
        tripToEdit={trip}
      />

      {/* Edit Note Modal */}
      <EditNoteModal
        visible={editNoteModalVisible}
        noteToEdit={selectedNote}
        onClose={() => {
          setEditNoteModalVisible(false);
          setSelectedNote(null);
        }}
        onSave={handleUpdateNote}
        onDelete={handleDeleteNote}
      />

      {/* View Photo Modal */}
      <Modal
        visible={photoModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPhotoModalVisible(false)}
      >
        <View style={viewPhotoModalStyles.modalContainer}>
          <TouchableOpacity
            style={viewPhotoModalStyles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setPhotoModalVisible(false)}
          >
            <View style={viewPhotoModalStyles.modalContent}>
              <TouchableOpacity
                style={viewPhotoModalStyles.closeButton}
                onPress={() => setPhotoModalVisible(false)}
              >
                <Ionicons name="close-circle" size={36} color="#FFF" />
              </TouchableOpacity>

              {selectedPhoto && (
                <>
                  <Image
                    source={{ uri: selectedPhoto.uri }}
                    style={viewPhotoModalStyles.modalImage}
                    resizeMode="contain"
                  />
                  <View style={viewPhotoModalStyles.modalInfo}>
                    <View style={viewPhotoModalStyles.modalInfoHeader}>
                      <View style={{ flex: 1 }}>
                        <ThemedText style={viewPhotoModalStyles.modalTrip}>
                          {selectedPhoto.caption}
                        </ThemedText>
                        <ThemedText style={viewPhotoModalStyles.modalDate}>
                          From: {trip.destination}
                        </ThemedText>
                      </View>
                      <View style={viewPhotoModalStyles.modalActions}>
                        <TouchableOpacity
                          style={viewPhotoModalStyles.actionButton}
                        >
                          <Ionicons
                            name="share-outline"
                            size={24}
                            color="#FFF"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={viewPhotoModalStyles.actionButton}
                        >
                          <Ionicons
                            name="trash-outline"
                            size={24}
                            color="#FF6B6B"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

// Styles for the ADD NOTE/CAPTION modal
const addNoteModalStyles = StyleSheet.create({
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
    backgroundColor: "#FF6B6B",
    marginLeft: 8,
  },
  buttonSaveText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

// Styles for the VIEW PHOTO modal
const viewPhotoModalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
  },
  modalBackdrop: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
  },
  modalImage: {
    width: width,
    height: width,
    alignSelf: "center",
  },
  modalInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
  },
  modalInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTrip: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  modalDate: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  modalActions: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});
