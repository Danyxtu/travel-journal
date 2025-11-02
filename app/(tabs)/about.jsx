import { StyleSheet, View, ScrollView, TouchableOpacity, Linking } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'

export default function About() {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Product Designer',
      avatar: '👩‍🎨',
      color: ['#FF6B6B', '#FF8E53']
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Lead Developer',
      avatar: '👨‍💻',
      color: ['#4E65FF', '#92EFFD']
    },
    {
      id: 3,
      name: 'Emma Williams',
      role: 'UX Researcher',
      avatar: '👩‍🔬',
      color: ['#11998E', '#38EF7D']
    },
    {
      id: 4,
      name: 'Alex Martinez',
      role: 'Backend Engineer',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  heroSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  heroGradient: {
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    overflow: 'hidden',
  },
  appIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 20,
  },
  versionBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
  },
  section: {
    marginBottom: 32,
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
    color: '#1A1A1A',
  },
  missionCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  missionText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#444',
  },
  featuresGrid: {
    gap: 12,
  },
  featureCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  teamCard: {
    width: '48%',
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
  teamGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamAvatar: {
    fontSize: 36,
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
    textAlign: 'center',
  },
  teamRole: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  copyrightText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerLink: {
    fontSize: 12,
    color: '#4E65FF',
    fontWeight: '600',
  },
  footerSeparator: {
    fontSize: 12,
    color: '#CCC',
  },
  bottomSpacer: {
    height: 40,
  },
})