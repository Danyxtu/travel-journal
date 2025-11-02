import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import { useState, useEffect } from 'react'
import AddTripModal from '../../components/ui/modals/AddTripModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useFocusEffect } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker'

// ui components
import Header from '../../components/ui/Header'
import TripCards from '../../components/ui/TripCards'


const Trips = () => {
  const [value, setValue] = useState([]);

  const saveData = async () => {
  const trips = [
    {
      id: uuid.v4(),
      destination: 'Paris, France',
      date: 'June 15-22, 2024',
      image: '🗼',
      memories: 12,
      gradient: ['#FF6B6B', '#FF8E53'],
      days: 7
    },
    {
      id: uuid.v4(),
      destination: 'Tokyo, Japan',
      date: 'March 10-20, 2024',
      image: '🗾',
      memories: 24,
      gradient: ['#4E65FF', '#92EFFD'],
      days: 10
    },
    {
      id: uuid.v4(),
      destination: 'Bali, Indonesia',
      date: 'December 1-8, 2023',
      image: '🏝️',
      memories: 18,
      gradient: ['#11998E', '#38EF7D'],
      days: 7
    },
    {
      id: uuid.v4(),
      destination: 'New York, USA',
      date: 'September 5-12, 2023',
      image: '🗽',
      memories: 15,
      gradient: ['#FFA500', '#FFD700'],
      days: 7
    },
    {
      id: uuid.v4(),
      destination: 'Santorini, Greece',
      date: 'July 20-28, 2023',
      image: '🏛️',
      memories: 20,
      gradient: ['#667EEA', '#764BA2'],
      days: 8
    }
  ];
  
  await AsyncStorage.setItem('@trips', JSON.stringify(trips));
  setValue(trips);
}

  useEffect(() => {
    const initializeData = async () => {
      const existingData = await AsyncStorage.getItem('@trips');
      if (!existingData) {
        await saveData();
      }
        getData();
      };
      initializeData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getData(); // reload trips every time user comes back
    }, [])
  );

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@trips');
      const trips = jsonValue != null ? JSON.parse(jsonValue) : [];
      setValue(trips);
      console.log(jsonValue);
    } catch (e) {
      // error reading value
    }
  };

  const [modalVisible, setModalVisible] = useState(false)

  const handleSaveTrip = (newTrip) => {
    console.log('New trip:', newTrip)
  }


  return (
    <View style={styles.container}>
      <Spacer />
      
      {/* Header Section */}
      <Header style={styles.header} title="My Trips">
        <View>
          <ThemedText style={styles.subtitle}>
            {value.length} adventures captured
          </ThemedText>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Ionicons name="add-circle" size={40} color="#FF6B6B" />
        </TouchableOpacity>
        <RNDateTimePicker value={new Date()} mode='date' display='default' />
      </Header>
      <AddTripModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveTrip}
      />
      {/* Trips List */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {value.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Spacer />
            <View style={styles.emojiCircle}>
              <Text style={styles.emoji}>🧳</Text>
            </View>
            <Spacer />
            <ThemedText size="h2" style={styles.emptyTitle}>
              No Trips Yet!
            </ThemedText>
            <ThemedText size="p" style={styles.emptySubtitle}>
              Puro ka cellphone eh 😆 — start your first adventure now!
            </ThemedText>
          </View>
        ) : (
          value.map((val, index) => (
            <TripCards key={val.id} trip={val} index={index} />
          ))
        )}


        {/* Add Trip Card */}
        <TouchableOpacity style={styles.addTripCard} onPress={() => setModalVisible(true)} activeOpacity={0.7}>
          <View style={styles.addTripContent}>
            <Ionicons name="add-circle-outline" size={48} color="#999" />
            <ThemedText style={styles.addTripText}>
              Plan a new trip
            </ThemedText>
          </View>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  )
}

export default Trips

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  addButton: {
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
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
  addTripCard: {
    borderRadius: 20,
    padding: 30,
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    minHeight: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTripContent: {
    alignItems: 'center',
    gap: 8,
  },
  addTripText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: '#f9fafb', // soft background
  },
  emojiCircle: {
    backgroundColor: '#e0f7fa',
    padding: 20,
    borderRadius: 100,
    elevation: 4, // subtle shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4, // subtle shadow for iOS
  },
  emoji: {
    fontSize: 48,
  },
  emptyTitle: {
    fontWeight: '700',
    color: '#374151',
    marginTop: 20,
  },
  emptySubtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 6,
    fontSize: 16,
  },
});
