import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;

          switch (route.name) {
            case 'trips':
              iconName = focused ? 'map' : 'map-outline';
              break;
            case 'galery':
              iconName = focused ? 'images' : 'images-outline';
              break;
            case 'about':
              iconName = focused ? 'information-circle' : 'information-circle-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="trips" options={{ title: 'Trips' }} />
      <Tabs.Screen name="galery" options={{ title: 'Gallery' }} />
      <Tabs.Screen name="about" options={{ title: 'About' }} />
    </Tabs>
  );
}