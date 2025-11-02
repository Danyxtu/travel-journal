import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, router } from 'expo-router'
import ThemedText from '../components/ThemedText'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width } = Dimensions.get('window')

export default function TripDetails() {
  const params = useLocalSearchParams()
  // Parse the trip data from params
  const trip = {
    id: params.id,
    destination: params.destination,
    date: params.date,
    image: params.image,
    gradient: JSON.parse(params.gradient || '["#FF6B6B", "#FF8E53"]'),
    days: params.days,
    memories: params.memories
  }

  const deleteTripById = async (id) => {
    try {
      const existingTrips = await AsyncStorage.getItem('@trips');
      const trips = existingTrips ? JSON.parse(existingTrips) : [];
      
      const updatedTrips = trips.filter(trip => trip.id !== id);
      await AsyncStorage.setItem('@trips', JSON.stringify(updatedTrips));
      
      router.back();
    } catch (e) {
      console.log("Error deleting trip", e);
    }
  }

  // Sample photos for the trip
  const photos = [
    { id: 1, uri: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800', caption: 'Eiffel Tower at sunset' },
    { id: 2, uri: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800', caption: 'Louvre Museum' },
    { id: 3, uri: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800', caption: 'Paris streets' },
    { id: 4, uri: 'https://images.unsplash.com/photo-1471623320832-752e8bbf8413?w=800', caption: 'Seine River' },
    { id: 5, uri: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800', caption: 'Arc de Triomphe' },
    { id: 6, uri: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800', caption: 'Notre Dame' },
  ]

  // Sample notes
  const notes = [
    {
      id: 1,
      date: 'June 15, 2024',
      time: '3:30 PM',
      title: 'Arrival Day',
      content: 'Finally arrived in Paris! The city is even more beautiful than I imagined. Had the most amazing croissant at a local café near our hotel. Can\'t wait to explore more tomorrow!',
      mood: '😊'
    },
    {
      id: 2,
      date: 'June 16, 2024',
      time: '6:00 PM',
      title: 'Eiffel Tower Visit',
      content: 'Visited the Eiffel Tower today. The view from the top was absolutely breathtaking! Watched the sunset and saw the city lights come alive. Definitely a highlight of the trip.',
      mood: '🤩'
    },
    {
      id: 3,
      date: 'June 18, 2024',
      time: '2:15 PM',
      title: 'Louvre Museum',
      content: 'Spent the entire day at the Louvre. Saw the Mona Lisa and so many incredible artworks. My feet are killing me but it was totally worth it!',
      mood: '😍'
    },
    {
      id: 4,
      date: 'June 20, 2024',
      time: '8:00 PM',
      title: 'Seine River Cruise',
      content: 'Evening cruise on the Seine River was magical. The city looks completely different from the water. Had wine and cheese while floating past illuminated monuments.',
      mood: '✨'
    }
  ]

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
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
            <ThemedText style={styles.headerTitle}>{trip.destination}</ThemedText>
            <ThemedText style={styles.headerDate}>{trip.date}</ThemedText>
            
            <View style={styles.headerStats}>
              <View style={styles.headerStat}>
                <Ionicons name="images" size={16} color="rgba(255,255,255,0.9)" />
                <ThemedText style={styles.headerStatText}>{photos.length} Photos</ThemedText>
              </View>
              <View style={styles.headerStat}>
                <Ionicons name="document-text" size={16} color="rgba(255,255,255,0.9)" />
                <ThemedText style={styles.headerStatText}>{notes.length} Notes</ThemedText>
              </View>
              <View style={styles.headerStat}>
                <Ionicons name="calendar" size={16} color="rgba(255,255,255,0.9)" />
                <ThemedText style={styles.headerStatText}>{trip.days} Days</ThemedText>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row' , gap: 12, position: 'absolute', right: 20, top: 0 }}>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="create-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTripById(trip.id)} style={styles.editButton}>
              <Ionicons name="trash" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Decorative circles */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Photos Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="images" size={24} color={trip.gradient[0]} />
            <ThemedText style={[styles.sectionTitle, { color: trip.gradient[0] }]}>
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
                  <Image 
                    source={{ uri: photo.uri }} 
                    style={styles.photo}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={styles.photoOverlay}
                  >
                    <ThemedText style={styles.photoCaption} numberOfLines={2}>
                      {photo.caption}
                    </ThemedText>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity style={styles.addPhotoCard} activeOpacity={0.7}>
              <Ionicons name="add-circle-outline" size={40} color="#999" />
              <ThemedText style={styles.addPhotoText}>Add Photo</ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Notes Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="document-text" size={24} color={trip.gradient[0]} />
            <ThemedText style={[styles.sectionTitle, { color: trip.gradient[0] }]}>
              Travel Notes
            </ThemedText>
          </View>

          {notes.map((note, index) => (
            <TouchableOpacity 
              key={note.id} 
              activeOpacity={0.7}
              style={[styles.noteCard, index === notes.length - 1 && styles.lastNote]}
            >
              <View style={styles.noteHeader}>
                <View style={styles.noteLeft}>
                  <ThemedText style={styles.noteMood}>{note.mood}</ThemedText>
                  <View>
                    <ThemedText style={styles.noteTitle}>{note.title}</ThemedText>
                    <View style={styles.noteDateTime}>
                      <ThemedText style={styles.noteDate}>{note.date}</ThemedText>
                      <ThemedText style={styles.noteSeparator}>•</ThemedText>
                      <ThemedText style={styles.noteTime}>{note.time}</ThemedText>
                    </View>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </View>
              
              <ThemedText style={styles.noteContent} numberOfLines={3}>
                {note.content}
              </ThemedText>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.addNoteButton} activeOpacity={0.7}>
            <Ionicons name="add-circle" size={20} color={trip.gradient[0]} />
            <ThemedText style={[styles.addNoteText, { color: trip.gradient[0] }]}>
              Add New Note
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  headerContent: {
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerInfo: {
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 6,
  },
  headerDate: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 20,
  },
  headerStats: {
    flexDirection: 'row',
    gap: 20,
  },
  headerStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerStatText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -50,
    right: -50,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.08)',
    bottom: -30,
    left: -30,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  photosContainer: {
    paddingRight: 20,
  },
  photoCard: {
    width: width * 0.7,
    height: 220,
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  photoCaption: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
  },
  addPhotoCard: {
    width: width * 0.5,
    height: 220,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    gap: 8,
  },
  addPhotoText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
  },
  noteCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  lastNote: {
    marginBottom: 16,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  noteLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  noteMood: {
    fontSize: 32,
  },
  noteTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  noteDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  noteDate: {
    fontSize: 12,
    color: '#666',
  },
  noteSeparator: {
    fontSize: 12,
    color: '#CCC',
  },
  noteTime: {
    fontSize: 12,
    color: '#666',
  },
  noteContent: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  addNoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addNoteText: {
    fontSize: 15,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 40,
  },
})