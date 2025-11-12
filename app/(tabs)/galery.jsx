import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions, Modal } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import { styles } from '../../Styles/Galery.styles'

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

