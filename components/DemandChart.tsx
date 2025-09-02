import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChartBar as BarChart3, TrendingUp } from 'lucide-react-native';

interface DemandData {
  crop: string;
  demand: number;
  trend: 'up' | 'down' | 'stable';
}

interface DemandChartProps {
  data: DemandData[];
}

export function DemandChart({ data }: DemandChartProps) {
  const maxDemand = Math.max(...data.map(item => item.demand));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BarChart3 size={20} color="#3B82F6" />
        <Text style={styles.title}>Crop Demand Trends</Text>
      </View>
      
      <View style={styles.chart}>
        {data.map((item, index) => (
          <View key={index} style={styles.barContainer}>
            <View style={styles.barWrapper}>
              <View
                style={[
                  styles.bar,
                  {
                    height: (item.demand / maxDemand) * 80,
                    backgroundColor: item.trend === 'up' ? '#10B981' : 
                                   item.trend === 'down' ? '#EF4444' : '#F59E0B',
                  },
                ]}
              />
              <Text style={styles.demandValue}>{item.demand}%</Text>
            </View>
            <Text style={styles.cropLabel}>{item.crop}</Text>
            <View style={styles.trendIndicator}>
              <TrendingUp 
                size={12} 
                color={item.trend === 'up' ? '#10B981' : 
                       item.trend === 'down' ? '#EF4444' : '#F59E0B'} 
              />
            </View>
          </View>
        ))}
      </View>
      
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendText}>High Demand</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
          <Text style={styles.legendText}>Stable</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
          <Text style={styles.legendText}>Low Demand</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    marginBottom: 16,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    alignItems: 'center',
    height: 100,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 20,
    borderRadius: 4,
    marginBottom: 4,
  },
  demandValue: {
    fontSize: 10,
    fontWeight: '600',
    color: '#374151',
  },
  cropLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
  trendIndicator: {
    marginTop: 4,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});