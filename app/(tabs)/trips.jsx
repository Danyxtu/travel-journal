import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import { useState, useEffect } from "react";
import AddTripModal from "../../components/ui/modals/AddTripModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "../../Styles/Trips.styles";

// ui components
import Header from "../../components/ui/Header";
import TripCards from "../../components/ui/TripCards";

const Trips = () => {
  const [value, setValue] = useState([]);

  const saveData = async () => {
    const trips = [
      {
        id: uuid.v4(),
        destination: "Paris, France",
        date: "June 15-22, 2024",
        image: "🗼",
        memories: 12,
        gradient: ["#FF6B6B", "#FF8E53"],
        days: 7,
      },
      {
        id: uuid.v4(),
        destination: "Tokyo, Japan",
        date: "March 10-20, 2024",
        image: "🗾",
        memories: 24,
        gradient: ["#4E65FF", "#92EFFD"],
        days: 10,
      },
      {
        id: uuid.v4(),
        destination: "Bali, Indonesia",
        date: "December 1-8, 2023",
        image: "🏝️",
        memories: 18,
        gradient: ["#11998E", "#38EF7D"],
        days: 7,
      },
      {
        id: uuid.v4(),
        destination: "New York, USA",
        date: "September 5-12, 2023",
        image: "🗽",
        memories: 15,
        gradient: ["#FFA500", "#FFD700"],
        days: 7,
      },
      {
        id: uuid.v4(),
        destination: "Santorini, Greece",
        date: "July 20-28, 2023",
        image: "🏛️",
        memories: 20,
        gradient: ["#667EEA", "#764BA2"],
        days: 8,
      },
    ];

    await AsyncStorage.setItem("@trips", JSON.stringify(trips));
    setValue(trips);
  };

  useEffect(() => {
    const initializeData = async () => {
      const existingData = await AsyncStorage.getItem("@trips");
      if (!existingData) {
        await saveData();
      }
      getData();
    };
    initializeData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@trips");
      const trips = jsonValue != null ? JSON.parse(jsonValue) : [];
      setValue(trips);
      console.log(jsonValue);
    } catch (e) {}
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveTrip = async (newTrip) => {
    try {
      const tripWithId = { ...newTrip, id: uuid.v4() };
      const updatedTrips = [...value, tripWithId];

      await AsyncStorage.setItem("@trips", JSON.stringify(updatedTrips));

      setValue(updatedTrips);

      setModalVisible(false);
      console.log("check trip:  ", tripWithId);
    } catch (error) {
      console.error("Failed : ", error);
    }
  };

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
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
          <Ionicons name="add-circle" size={40} color="#FF6B6B" />
        </TouchableOpacity>
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
        <TouchableOpacity
          style={styles.addTripCard}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <View style={styles.addTripContent}>
            <Ionicons name="add-circle-outline" size={48} color="#999" />
            <ThemedText style={styles.addTripText}>Plan a new trip</ThemedText>
          </View>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

export default Trips;
