import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import { User, MapPin, Phone, Mail, Settings, Bell, Globe, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, Camera, Leaf, TrendingUp } from 'lucide-react-native';

export default function Profile() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [language, setLanguage] = useState('English');

  const farmerData = {
    name: 'Rajesh Kumar',
    location: 'Pune, Maharashtra',
    phone: '+91 98765 43210',
    email: 'rajesh.farmer@gmail.com',
    farmSize: '5.2 acres',
    primaryCrops: ['Rice', 'Wheat', 'Sugarcane'],
    experience: '15 years',
  };

  const profileOptions = [
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Weather alerts and market updates',
      hasSwitch: true,
      switchValue: notificationsEnabled,
      onSwitchChange: setNotificationsEnabled,
    },
    {
      icon: Globe,
      title: 'Language',
      subtitle: language,
      onPress: () => Alert.alert('Language', 'Language selection coming soon'),
    },
    {
      icon: Settings,
      title: 'App Settings',
      subtitle: 'Customize your experience',
      onPress: () => Alert.alert('Settings', 'Settings panel coming soon'),
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      onPress: () => Alert.alert('Support', 'Support center coming soon'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={20} color="#22C55E" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={32} color="#FFFFFF" />
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{farmerData.name}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#6B7280" />
            <Text style={styles.location}>{farmerData.location}</Text>
          </View>
        </View>

        {/* Farm Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Farm Information</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Leaf size={24} color="#22C55E" />
              <Text style={styles.infoValue}>{farmerData.farmSize}</Text>
              <Text style={styles.infoLabel}>Farm Size</Text>
            </View>
            <View style={styles.infoCard}>
              <TrendingUp size={24} color="#3B82F6" />
              <Text style={styles.infoValue}>{farmerData.experience}</Text>
              <Text style={styles.infoLabel}>Experience</Text>
            </View>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactItem}>
              <Phone size={20} color="#6B7280" />
              <Text style={styles.contactText}>{farmerData.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Mail size={20} color="#6B7280" />
              <Text style={styles.contactText}>{farmerData.email}</Text>
            </View>
          </View>
        </View>

        {/* Primary Crops */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Primary Crops</Text>
          <View style={styles.cropsContainer}>
            {farmerData.primaryCrops.map((crop, index) => (
              <View key={index} style={styles.cropChip}>
                <Text style={styles.cropText}>{crop}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Offline Mode */}
        <View style={styles.section}>
          <View style={styles.offlineCard}>
            <View style={styles.offlineInfo}>
              <Text style={styles.offlineTitle}>Offline Mode</Text>
              <Text style={styles.offlineSubtitle}>
                {offlineMode
                  ? 'App will work without internet'
                  : 'Requires internet connection'}
              </Text>
            </View>
            <Switch
              value={offlineMode}
              onValueChange={setOfflineMode}
              trackColor={{ false: '#D1D5DB', true: '#22C55E' }}
              thumbColor={offlineMode ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>
        </View>

        {/* Settings Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {profileOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionCard}
              onPress={option.onPress}
            >
              <View style={styles.optionLeft}>
                <View style={styles.optionIcon}>
                  <option.icon size={20} color="#6B7280" />
                </View>
                <View style={styles.optionInfo}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                </View>
              </View>
              {option.hasSwitch ? (
                <Switch
                  value={option.switchValue}
                  onValueChange={option.onSwitchChange}
                  trackColor={{ false: '#D1D5DB', true: '#22C55E' }}
                  thumbColor={option.switchValue ? '#FFFFFF' : '#F3F4F6'}
                />
              ) : (
                <Text style={styles.optionArrow}>›</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?')}
          >
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  editButton: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 10,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    fontWeight: '500',
  },
  cropsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cropChip: {
    backgroundColor: '#F0FDF4',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  cropText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22C55E',
  },
  offlineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  offlineInfo: {
    flex: 1,
  },
  offlineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  offlineSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  optionArrow: {
    fontSize: 24,
    color: '#D1D5DB',
    fontWeight: '300',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },
});