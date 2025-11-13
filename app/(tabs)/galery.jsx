import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback } from "react"; // Removed useEffect
import { useFocusEffect } from "expo-router"; // Import useFocusEffect
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import { styles } from "../../Styles/Galery.styles";
import AddPhotoModal from "../../components/ui/modals/AddPhotoModal"; // --- NEW: Import new modal ---

const { width } = Dimensions.get("window");
const imageSize = (width - 60) / 3; // 3 columns with padding

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [allPhotos, setAllPhotos] = useState([]); // State to hold loaded photos
  const [addPhotoModalVisible, setAddPhotoModalVisible] = useState(false); // --- NEW ---

  // Function to load all photos from all trips
  const loadAllPhotos = async () => {
    try {
      const storedTrips = await AsyncStorage.getItem("@trips");
      if (!storedTrips) {
        setAllPhotos([]);
        return;
      }

      const trips = JSON.parse(storedTrips);

      // Use flatMap to get all photos from all trips into a single array
      const loadedPhotos = trips.flatMap((trip) =>
        trip.photos
          ? trip.photos.map((photo) => ({
              ...photo,
              trip: trip.destination, // Add trip destination to photo object
              date: trip.date, // Add trip date to photo object
              // This is a placeholder for filtering
              category: ["Landmarks", "Nature", "Food", "Culture", "Street"][
                Math.floor(Math.random() * 5) // Random for demo
              ],
            }))
          : []
      );

      setAllPhotos(loadedPhotos);
    } catch (error) {
      console.error("Failed to load all photos:", error);
      setAllPhotos([]);
    }
  };

  // Load photos when the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadAllPhotos();
    }, [])
  );

  const filters = ["All", "Landmarks", "Nature", "Food", "Culture", "Street"];

  const filteredPhotos =
    activeFilter === "All"
      ? allPhotos
      : allPhotos.filter((photo) => photo.category === activeFilter);

  // Stats are now dynamic based on loaded photos
  const stats = {
    total: allPhotos.length,
    trips: [...new Set(allPhotos.map((p) => p.trip))].length,
    recent: allPhotos.filter((p) => p.date && p.date.includes("2024")).length,
  };

  return (
    <View style={styles.container}>
      <Spacer />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <ThemedText style={styles.title}>Gallery</ThemedText>
          <ThemedText style={styles.subtitle}>
            {filteredPhotos.length} photos
          </ThemedText>
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="images" size={24} color="#FF6B6B" />
          <ThemedText style={styles.statNumber}>{stats.total}</ThemedText>
          <ThemedText style={styles.statLabel}>Total Photos</ThemedText>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="map" size={24} color="#4E65FF" />
          <ThemedText style={styles.statNumber}>{stats.trips}</ThemedText>
          <ThemedText style={styles.statLabel}>Trips</ThemedText>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="time" size={24} color="#11998E" />
          <ThemedText style={styles.statNumber}>{stats.recent}</ThemedText>
          <ThemedText style={styles.statLabel}>This Year</ThemedText>
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setActiveFilter(filter)}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={
                activeFilter === filter
                  ? ["#FF6B6B", "#FF8E53"]
                  : ["#FFF", "#FFF"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.filterChip,
                activeFilter !== filter && styles.filterChipInactive,
              ]}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Photo Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ ...styles.scrollContent, paddingBottom: 80 }} // Added paddingBottom
      >
        <View style={styles.photoGrid}>
          {filteredPhotos.length > 0 ? (
            filteredPhotos.map((photo, index) => (
              <TouchableOpacity
                key={photo.id || index} // Use photo.id if available, fallback to index
                activeOpacity={0.9}
                onPress={() => setSelectedImage(photo)}
                style={[
                  styles.photoContainer,
                  { animationDelay: `${index * 50}ms` },
                ]}
              >
                <Image source={{ uri: photo.uri }} style={styles.photoImage} />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.6)"]}
                  style={styles.photoOverlay}
                >
                  <View style={styles.photoInfo}>
                    <Ionicons name="location" size={12} color="#FFF" />
                    <ThemedText style={styles.photoTrip} numberOfLines={1}>
                      {photo.trip}
                    </ThemedText>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))
          ) : (
            // --- NEW: Empty state for gallery ---
            <View style={styles.addPhotoCard}>
              <View style={styles.addPhotoContent}>
                <Ionicons name="camera-outline" size={48} color="#999" />
                <ThemedText style={styles.addPhotoText}>
                  No Photos Yet
                </ThemedText>
                <ThemedText style={styles.addPhotoSubtext}>
                  Add photos from a trip to see them here
                </ThemedText>
              </View>
            </View>
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* --- NEW: Floating Action Button --- */}
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => setAddPhotoModalVisible(true)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#FF6B6B", "#FF8E53"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={32} color="#FFF" />
        </LinearGradient>
      </TouchableOpacity>
      {/* --- END NEW --- */}

      {/* Image Modal (for viewing) */}
      <Modal
        visible={selectedImage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setSelectedImage(null)}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedImage(null)}
              >
                <Ionicons name="close-circle" size={36} color="#FFF" />
              </TouchableOpacity>

              {selectedImage && (
                <>
                  <Image
                    source={{ uri: selectedImage.uri }}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                  <View style={styles.modalInfo}>
                    <View style={styles.modalInfoHeader}>
                      <View>
                        <ThemedText style={styles.modalTrip}>
                          {selectedImage.trip}
                        </ThemedText>
                        <ThemedText style={styles.modalDate}>
                          {selectedImage.date}
                        </ThemedText>
                      </View>
                      <View style={styles.modalActions}>
                        <TouchableOpacity style={styles.actionButton}>
                          <Ionicons
                            name="heart-outline"
                            size={24}
                            color="#FFF"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                          <Ionicons
                            name="share-outline"
                            size={24}
                            color="#FFF"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                          <Ionicons
                            name="download-outline"
                            size={24}
                            color="#FFF"
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

      {/* --- NEW: Add Photo Modal (for adding) --- */}
      <AddPhotoModal
        visible={addPhotoModalVisible}
        onClose={() => setAddPhotoModalVisible(false)}
        onPhotoAdded={() => {
          // When a photo is added, refresh the gallery
          loadAllPhotos();
        }}
      />
    </View>
  );
}
