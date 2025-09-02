import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  MapPin,
  Thermometer,
  Droplets,
  DollarSign,
  TrendingUp,
  Calendar,
  Leaf,
} from 'lucide-react-native';
import { WeatherCard } from '../../components/WeatherCard';
import { SoilMetrics } from '../../components/SoilMetrics';
import { CropRecommendations } from '../../components/CropRecommendations';
import { mockWeatherData, mockSoilData, mockRecommendations } from '../../data/mockData';

export default function Dashboard() {
  const [location, setLocation] = useState('Maharashtra, India');
  const [weatherData, setWeatherData] = useState(mockWeatherData);
  const [soilData, setSoilData] = useState(mockSoilData);
  const [recommendations, setRecommendations] = useState(mockRecommendations);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <MapPin size={20} color="#22C55E" />
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <Text style={styles.greeting}>Good Morning, Farmer!</Text>
          <Text style={styles.subtitle}>Let's optimize your harvest today</Text>
        </View>

        {/* Weather Overview */}
        <WeatherCard data={weatherData} />

        {/* Soil Metrics */}
        <SoilMetrics data={soilData} />

        {/* AI Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Crop Recommendations</Text>
          <CropRecommendations recommendations={recommendations} />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Calendar size={24} color="#22C55E" />
              <Text style={styles.actionText}>Planting Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <DollarSign size={24} color="#3B82F6" />
              <Text style={styles.actionText}>Market Prices</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Leaf size={24} color="#10B981" />
              <Text style={styles.actionText}>Disease Check</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <TrendingUp size={24} color="#F59E0B" />
              <Text style={styles.actionText}>Yield Forecast</Text>
            </TouchableOpacity>
          </View>
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
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
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
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
  },
});