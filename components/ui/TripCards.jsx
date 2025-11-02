import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import ThemedText from '../ThemedText'

const TripCards = ({ trip, index }) => {
  const handleTripPress = () => {
    router.push({
      pathname: '/tripDetails',
      params: {
        id: trip.id,
        destination: trip.destination,
        date: trip.date,
        image: trip.image,
        gradient: JSON.stringify(trip.gradient),
        days: trip.days,
        memories: trip.memories
      }
    })
  }

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={handleTripPress}
    >
      <LinearGradient
        colors={trip.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.tripCard,
          index === 0 && styles.firstCard
        ]}
      >
        {/* Card Content */}
        <View style={styles.cardContent}>
          <View style={styles.cardLeft}>
            <View style={styles.iconContainer}>
              <ThemedText style={styles.emoji}>{trip.image}</ThemedText>
            </View>
            <View style={styles.tripInfo}>
              <ThemedText style={styles.destination}>
                {trip.destination}
              </ThemedText>
              <ThemedText style={styles.date}>
                {trip.date}
              </ThemedText>
              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Ionicons name="images-outline" size={14} color="rgba(255,255,255,0.9)" />
                  <ThemedText style={styles.statText}>
                    {trip.memories} memories
                  </ThemedText>
                </View>
                <View style={styles.stat}>
                  <Ionicons name="calendar-outline" size={14} color="rgba(255,255,255,0.9)" />
                  <ThemedText style={styles.statText}>
                    {trip.days} days
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.8)" />
        </View>

        {/* Decorative Elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default TripCards

const styles = StyleSheet.create({
  tripCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    minHeight: 140,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  firstCard: {
    marginTop: 0,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emoji: {
    fontSize: 32,
  },
  tripInfo: {
    flex: 1,
  },
  destination: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -30,
    right: -30,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.08)',
    bottom: -20,
    left: -20,
  },
})