import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Beaker, Droplets, Zap, Leaf } from 'lucide-react-native';

interface SoilData {
  ph: number;
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
}

interface SoilMetricsProps {
  data: SoilData;
}

export function SoilMetrics({ data }: SoilMetricsProps) {
  const getPhStatus = (ph: number) => {
    if (ph < 6.0) return { status: 'Acidic', color: '#EF4444' };
    if (ph > 7.5) return { status: 'Alkaline', color: '#F59E0B' };
    return { status: 'Optimal', color: '#10B981' };
  };

  const getMoistureStatus = (moisture: number) => {
    if (moisture < 30) return { status: 'Low', color: '#EF4444' };
    if (moisture > 70) return { status: 'High', color: '#F59E0B' };
    return { status: 'Good', color: '#10B981' };
  };

  const phStatus = getPhStatus(data.ph);
  const moistureStatus = getMoistureStatus(data.moisture);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soil Health Analysis</Text>
      
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Beaker size={20} color="#3B82F6" />
            <Text style={styles.metricLabel}>pH Level</Text>
          </View>
          <Text style={styles.metricValue}>{data.ph}</Text>
          <View style={[styles.statusBadge, { backgroundColor: phStatus.color }]}>
            <Text style={styles.statusText}>{phStatus.status}</Text>
          </View>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Droplets size={20} color="#06B6D4" />
            <Text style={styles.metricLabel}>Moisture</Text>
          </View>
          <Text style={styles.metricValue}>{data.moisture}%</Text>
          <View style={[styles.statusBadge, { backgroundColor: moistureStatus.color }]}>
            <Text style={styles.statusText}>{moistureStatus.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.nutrientsContainer}>
        <Text style={styles.nutrientsTitle}>Nutrient Levels (NPK)</Text>
        <View style={styles.nutrientsGrid}>
          <View style={styles.nutrientItem}>
            <View style={styles.nutrientIcon}>
              <Leaf size={16} color="#22C55E" />
            </View>
            <Text style={styles.nutrientLabel}>N</Text>
            <Text style={styles.nutrientValue}>{data.nitrogen}mg/kg</Text>
          </View>
          <View style={styles.nutrientItem}>
            <View style={styles.nutrientIcon}>
              <Zap size={16} color="#F59E0B" />
            </View>
            <Text style={styles.nutrientLabel}>P</Text>
            <Text style={styles.nutrientValue}>{data.phosphorus}mg/kg</Text>
          </View>
          <View style={styles.nutrientItem}>
            <View style={styles.nutrientIcon}>
              <Droplets size={16} color="#8B5CF6" />
            </View>
            <Text style={styles.nutrientLabel}>K</Text>
            <Text style={styles.nutrientValue}>{data.potassium}mg/kg</Text>
          </View>
        </View>
      </View>

      <View style={styles.organicMatterContainer}>
        <Text style={styles.organicMatterLabel}>Organic Matter</Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(data.organicMatter / 5) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.organicMatterValue}>{data.organicMatter}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 6,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  nutrientsContainer: {
    marginBottom: 20,
  },
  nutrientsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  nutrientsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutrientItem: {
    alignItems: 'center',
    flex: 1,
  },
  nutrientIcon: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
  },
  nutrientLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 4,
  },
  nutrientValue: {
    fontSize: 12,
    color: '#6B7280',
  },
  organicMatterContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  organicMatterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  progressBar: {
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    height: 8,
    marginBottom: 8,
  },
  progressFill: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    height: '100%',
  },
  organicMatterValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22C55E',
    textAlign: 'right',
  },
});