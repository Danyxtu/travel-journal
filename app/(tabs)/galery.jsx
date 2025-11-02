import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions, Modal } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'

const { width } = Dimensions.get('window')
const imageSize = (width - 60) / 3 // 3 columns with padding

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')

  const photos = [
    { 
      id: 1, 
      uri: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      trip: 'Paris, France',
      date: 'June 2024',
      category: 'Landmarks'
    },
    { 
      id: 2, 
      uri: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800',
      trip: 'Tokyo, Japan',
      date: 'March 2024',
      category: 'Culture'
    },
    { 
      id: 3, 
      uri: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800',
      trip: 'Bali, Indonesia',
      date: 'December 2023',
      category: 'Nature'
    },
    { 
      id: 4, 
      uri: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
      trip: 'Paris, France',
      date: 'June 2024',
      category: 'Street'
    },
    { 
      id: 5, 
      uri: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800',
      trip: 'Santorini, Greece',
      date: 'July 2023',
      category: 'Landmarks'
    },
    { 
      id: 6, 
      uri: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800',
      trip: 'Tokyo, Japan',
      date: 'March 2024',
      category: 'Food'
    },
    { 
      id: 7, 
      uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      trip: 'Bali, Indonesia',
      date: 'December 2023',
      category: 'Nature'
    },
    { 
      id: 8, 
      uri: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800',
      trip: 'Paris, France',
      date: 'June 2024',
      category: 'Landmarks'
    },
    { 
      id: 9, 
      uri: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800',
      trip: 'New York, USA',
      date: 'September 2023',
      category: 'Landmarks'
    },
    { 
      id: 10, 
      uri: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800',
      trip: 'Santorini, Greece',
      date: 'July 2023',
      category: 'Food'
    },
    { 
      id: 11, 
      uri: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800',
      trip: 'Tokyo, Japan',
      date: 'March 2024',
      category: 'Street'
    },
    { 
      id: 12, 
      uri: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800',
      trip: 'Bali, Indonesia',
      date: 'December 2023',
      category: 'Nature'
    },
    { 
      id: 13, 
      uri: 'https://images.unsplash.com/photo-1471623320832-752e8bbf8413?w=800',
      trip: 'Paris, France',
      date: 'June 2024',
      category: 'Nature'
    },
    { 
      id: 14, 
      uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      trip: 'New York, USA',
      date: 'September 2023',
      category: 'Food'
    },
    { 
      id: 15, 
      uri: 'https://images.unsplash.com/photo-1490077476659-095159692ab5?w=800',
      trip: 'Santorini, Greece',
      date: 'July 2023',
      category: 'Culture'
    },
  ]

  const filters = ['All', 'Landmarks', 'Nature', 'Food', 'Culture', 'Street']

  const filteredPhotos = activeFilter === 'All' 
    ? photos 
    : photos.filter(photo => photo.category === activeFilter)

  const stats = {
    total: photos.length,
    trips: [...new Set(photos.map(p => p.trip))].length,
    recent: photos.filter(p => p.date.includes('2024')).length
  }

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
        <TouchableOpacity style={styles.uploadButton}>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E53']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.uploadGradient}
          >
            <Ionicons name="cloud-upload" size={20} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
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
              colors={activeFilter === filter 
                ? ['#FF6B6B', '#FF8E53'] 
                : ['#FFF', '#FFF']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.filterChip,
                activeFilter !== filter && styles.filterChipInactive
              ]}
            >
              <ThemedText style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive
              ]}>
                {filter}
              </ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Photo Grid */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.photoGrid}>
          {filteredPhotos.map((photo, index) => (
            <TouchableOpacity
              key={photo.id}
              activeOpacity={0.9}
              onPress={() => setSelectedImage(photo)}
              style={[
                styles.photoContainer,
                { animationDelay: `${index * 50}ms` }
              ]}
            >
              <Image 
                source={{ uri: photo.uri }} 
                style={styles.photoImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.6)']}
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
          ))}
        </View>

        {/* Add Photo Card */}
        <TouchableOpacity style={styles.addPhotoCard} activeOpacity={0.7}>
          <View style={styles.addPhotoContent}>
            <Ionicons name="camera-outline" size={48} color="#999" />
            <ThemedText style={styles.addPhotoText}>
              Add More Photos
            </ThemedText>
            <ThemedText style={styles.addPhotoSubtext}>
              Capture and upload your memories
            </ThemedText>
          </View>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Image Modal */}
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
                          <Ionicons name="heart-outline" size={24} color="#FFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                          <Ionicons name="share-outline" size={24} color="#FFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                          <Ionicons name="download-outline" size={24} color="#FFF" />
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  uploadButton: {
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  uploadGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipInactive: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#FFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  photoContainer: {
    width: imageSize,
    height: imageSize,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  photoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  photoTrip: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '600',
    flex: 1,
  },
  addPhotoCard: {
    borderRadius: 16,
    padding: 40,
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  addPhotoContent: {
    alignItems: 'center',
    gap: 8,
  },
  addPhotoText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  addPhotoSubtext: {
    fontSize: 13,
    color: '#999',
  },
  bottomSpacer: {
    height: 40,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
  },
  modalBackdrop: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
  },
  modalImage: {
    width: width,
    height: width,
    alignSelf: 'center',
  },
  modalInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
  },
  modalInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTrip: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  modalDate: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
})