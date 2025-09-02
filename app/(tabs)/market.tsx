import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react-native';
import { MarketPriceCard } from '../../components/MarketPriceCard';
import { DemandChart } from '../../components/DemandChart';
import { mockMarketData, mockDemandData } from '../../data/mockData';

export default function Market() {
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [timeframe, setTimeframe] = useState('week');

  const filterOptions = ['all', 'grains', 'vegetables', 'fruits'];
  const timeOptions = [
    { label: '1W', value: 'week' },
    { label: '1M', value: 'month' },
    { label: '3M', value: 'quarter' },
    { label: '1Y', value: 'year' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Market Intelligence</Text>
          <Text style={styles.subtitle}>Real-time prices and trends</Text>
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.filterChip,
                  selectedCrop === option && styles.filterChipActive,
                ]}
                onPress={() => setSelectedCrop(option)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedCrop === option && styles.filterTextActive,
                  ]}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Market Overview */}
        <View style={styles.overviewContainer}>
          <Text style={styles.sectionTitle}>Market Overview</Text>
          <View style={styles.overviewCards}>
            <View style={styles.overviewCard}>
              <TrendingUp size={24} color="#10B981" />
              <Text style={styles.overviewValue}>+12.5%</Text>
              <Text style={styles.overviewLabel}>Weekly Growth</Text>
            </View>
            <View style={styles.overviewCard}>
              <DollarSign size={24} color="#3B82F6" />
              <Text style={styles.overviewValue}>₹2,450</Text>
              <Text style={styles.overviewLabel}>Avg. Price/Quintal</Text>
            </View>
            <View style={styles.overviewCard}>
              <BarChart3 size={24} color="#F59E0B" />
              <Text style={styles.overviewValue}>85%</Text>
              <Text style={styles.overviewLabel}>Market Activity</Text>
            </View>
          </View>
        </View>

        {/* Time Range Selector */}
        <View style={styles.timeContainer}>
          {timeOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.timeChip,
                timeframe === option.value && styles.timeChipActive,
              ]}
              onPress={() => setTimeframe(option.value)}
            >
              <Text
                style={[
                  styles.timeText,
                  timeframe === option.value && styles.timeTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Market Prices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Prices</Text>
          {mockMarketData.map((item, index) => (
            <MarketPriceCard key={index} data={item} />
          ))}
        </View>

        {/* Demand Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Demand Trends</Text>
          <DemandChart data={mockDemandData} />
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
  },
  title: {
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
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  filterChipActive: {
    backgroundColor: '#22C55E',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  overviewContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  overviewCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  overviewValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
  },
  overviewLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    justifyContent: 'center',
  },
  timeChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  timeChipActive: {
    backgroundColor: '#22C55E',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  timeTextActive: {
    color: '#FFFFFF',
  },
  section: {
    padding: 16,
  },
});