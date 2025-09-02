import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TrendingUp, TrendingDown, DollarSign, MapPin } from 'lucide-react-native';

interface MarketData {
  crop: string;
  currentPrice: number;
  previousPrice: number;
  location: string;
  unit: string;
  demand: 'High' | 'Medium' | 'Low';
  quality: string;
}

interface MarketPriceCardProps {
  data: MarketData;
}

export function MarketPriceCard({ data }: MarketPriceCardProps) {
  const priceChange = data.currentPrice - data.previousPrice;
  const priceChangePercent = ((priceChange / data.previousPrice) * 100).toFixed(1);
  const isPositive = priceChange > 0;

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High':
        return '#10B981';
      case 'Medium':
        return '#F59E0B';
      case 'Low':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <View style={styles.cropInfo}>
          <Text style={styles.cropName}>{data.crop}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={12} color="#6B7280" />
            <Text style={styles.location}>{data.location}</Text>
          </View>
        </View>
        <View style={[styles.demandBadge, { backgroundColor: getDemandColor(data.demand) }]}>
          <Text style={styles.demandText}>{data.demand}</Text>
        </View>
      </View>

      <View style={styles.priceContainer}>
        <View style={styles.currentPrice}>
          <DollarSign size={16} color="#111827" />
          <Text style={styles.priceValue}>₹{data.currentPrice}</Text>
          <Text style={styles.priceUnit}>/{data.unit}</Text>
        </View>
        <View style={styles.priceChange}>
          <TrendIcon size={16} color={isPositive ? '#10B981' : '#EF4444'} />
          <Text style={[styles.changeText, { color: isPositive ? '#10B981' : '#EF4444' }]}>
            {isPositive ? '+' : ''}₹{Math.abs(priceChange)} ({isPositive ? '+' : ''}{priceChangePercent}%)
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.quality}>Quality: {data.quality}</Text>
        <Text style={styles.lastUpdated}>Updated 2 hours ago</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cropInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  demandBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  demandText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 4,
  },
  priceUnit: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 2,
  },
  priceChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  quality: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});