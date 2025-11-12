import { StyleSheet, View, ScrollView, TouchableOpacity, Linking } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import { styles } from '../../Styles/About.styles'

export default function About() {
  const teamMembers = [

    {
      id: 1,
      name: 'Danny D.P. Dinglasa Jr. ',
      role: 'Project Manager & Lead Developer',
      avatar: '👨‍💻',
      color: ['#4E65FF', '#92EFFD']
    },
    {
      id: 2,
      name: 'Charles Dominic O. Gumondas',
      role: 'Business Analyst',
      avatar: '👩‍🎨',
      color: ['#FF6B6B', '#FF8E53']
    },
    {
      id: 3,
      name: 'Benedict Jambre',
      role: 'System Analyst',
      avatar: '👩‍🔬',
      color: ['#11998E', '#38EF7D']
    },
    {
      id: 4,
      name: 'Sheena Dianne L. De Guzman',
      role: 'UI/UX Designer',
      avatar: '👨‍🚀',
      color: ['#667EEA', '#764BA2']
    },
    {
      id: 5,
      name: 'Ameer S. Sabtal',
      role: 'Quality Assurance',
      avatar: '👨‍🚀',
      color: ['#667EEA', '#764BA2']
    }
  ]

  const features = [
    {
      icon: 'map',
      title: 'Track Your Journeys',
      description: 'Keep all your travel memories in one beautiful place'
    },
    {
      icon: 'camera',
      title: 'Capture Moments',
      description: 'Add photos and notes to remember every detail'
    },
    {
      icon: 'heart',
      title: 'Relive Memories',
      description: 'Browse through your adventures anytime, anywhere'
    },
    {
      icon: 'share-social',
      title: 'Share Stories',
      description: 'Inspire others with your travel experiences'
    }
  ]

  const handleSocialPress = (platform) => {
    const urls = {
      email: 'mailto:hello@traveljournal.app',
      twitter: 'https://twitter.com/traveljournal',
      instagram: 'https://instagram.com/traveljournal',
      github: 'https://github.com/traveljournal'
    }
    Linking.openURL(urls[platform])
  }

  return (
    <View style={styles.container}>
      <Spacer />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['#FF6B6B', '#4E65FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <ThemedText style={styles.appIcon}>✈️</ThemedText>
            <ThemedText style={styles.appName}>Travel Journal</ThemedText>
            <ThemedText style={styles.appTagline}>
              Your adventures, beautifully documented
            </ThemedText>
            <View style={styles.versionBadge}>
              <ThemedText style={styles.versionText}>Version 1.0.0</ThemedText>
            </View>
          </LinearGradient>
        </View>

        {/* Mission Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="rocket" size={24} color="#FF6B6B" />
            <ThemedText style={styles.sectionTitle}>Our Mission</ThemedText>
          </View>
          <View style={styles.missionCard}>
            <ThemedText style={styles.missionText}>
              We believe every journey tells a story. Travel Journal helps you capture, 
              preserve, and relive your most precious travel memories. Whether it's a 
              weekend getaway or a month-long adventure, we're here to help you document 
              every moment beautifully.
            </ThemedText>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="star" size={24} color="#4E65FF" />
            <ThemedText style={styles.sectionTitle}>Features</ThemedText>
          </View>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name={feature.icon} size={28} color="#FF6B6B" />
                </View>
                <ThemedText style={styles.featureTitle}>{feature.title}</ThemedText>
                <ThemedText style={styles.featureDescription}>
                  {feature.description}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Team Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="people" size={24} color="#11998E" />
            <ThemedText style={styles.sectionTitle}>Meet The Team</ThemedText>
          </View>
          <View style={styles.teamGrid}>
            {teamMembers.map((member) => (
              <TouchableOpacity 
                key={member.id} 
                style={styles.teamCard}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={member.color}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.teamGradient}
                >
                  <ThemedText style={styles.teamAvatar}>{member.avatar}</ThemedText>
                </LinearGradient>
                <ThemedText style={styles.teamName}>{member.name}</ThemedText>
                <ThemedText style={styles.teamRole}>{member.role}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>50K+</ThemedText>
            <ThemedText style={styles.statLabel}>Happy Travelers</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>1M+</ThemedText>
            <ThemedText style={styles.statLabel}>Memories Saved</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>150+</ThemedText>
            <ThemedText style={styles.statLabel}>Countries</ThemedText>
          </View>
        </View>

        {/* Connect Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="chatbubbles" size={24} color="#667EEA" />
            <ThemedText style={styles.sectionTitle}>Connect With Us</ThemedText>
          </View>
          <View style={styles.socialContainer}>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialPress('email')}
              activeOpacity={0.7}
            >
              <Ionicons name="mail" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialPress('twitter')}
              activeOpacity={0.7}
            >
              <Ionicons name="logo-twitter" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialPress('instagram')}
              activeOpacity={0.7}
            >
              <Ionicons name="logo-instagram" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialPress('github')}
              activeOpacity={0.7}
            >
              <Ionicons name="logo-github" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Made with ❤️ for travelers around the world
          </ThemedText>
          <ThemedText style={styles.copyrightText}>
            © 2024 Travel Journal. All rights reserved.
          </ThemedText>
          <View style={styles.footerLinks}>
            <TouchableOpacity>
              <ThemedText style={styles.footerLink}>Privacy Policy</ThemedText>
            </TouchableOpacity>
            <ThemedText style={styles.footerSeparator}>•</ThemedText>
            <TouchableOpacity>
              <ThemedText style={styles.footerLink}>Terms of Service</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  )
}
