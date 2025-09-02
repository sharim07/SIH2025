import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Camera, Droplets, Thermometer, Clock } from 'lucide-react-native';

interface AnalysisResultsProps {
  results: {
    disease: string;
    confidence: number;
    severity: string;
    treatment: string;
    recommendation: string;
  };
  onNewAnalysis: () => void;
}

export function AnalysisResults({ results, onNewAnalysis }: AnalysisResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low':
        return '#10B981';
      case 'moderate':
        return '#F59E0B';
      case 'high':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low':
        return CheckCircle;
      case 'moderate':
      case 'high':
        return AlertTriangle;
      default:
        return AlertTriangle;
    }
  };

  const SeverityIcon = getSeverityIcon(results.severity);

  return (
    <View style={styles.container}>
      <View style={styles.resultCard}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <SeverityIcon size={24} color={getSeverityColor(results.severity)} />
            <Text style={styles.diseaseTitle}>{results.disease}</Text>
          </View>
          <View style={styles.confidenceContainer}>
            <Text style={styles.confidenceText}>{results.confidence}%</Text>
            <Text style={styles.confidenceLabel}>Confidence</Text>
          </View>
        </View>

        <View style={styles.severityContainer}>
          <Text style={styles.severityLabel}>Severity Level</Text>
          <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(results.severity) }]}>
            <Text style={styles.severityText}>{results.severity}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Droplets size={20} color="#3B82F6" />
            <Text style={styles.sectionTitle}>Treatment</Text>
          </View>
          <Text style={styles.treatmentText}>{results.treatment}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={20} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Recommendation</Text>
          </View>
          <Text style={styles.recommendationText}>{results.recommendation}</Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.newAnalysisButton} onPress={onNewAnalysis}>
            <Camera size={20} color="#FFFFFF" />
            <Text style={styles.newAnalysisText}>New Analysis</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Additional Tips */}
      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Prevention Tips</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tipItem}>• Ensure proper plant spacing for air circulation</Text>
          <Text style={styles.tipItem}>• Water early morning to reduce fungal growth</Text>
          <Text style={styles.tipItem}>• Remove affected leaves immediately</Text>
          <Text style={styles.tipItem}>• Apply preventive spray before monsoon</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  diseaseTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 12,
    flex: 1,
  },
  confidenceContainer: {
    alignItems: 'center',
  },
  confidenceText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#22C55E',
  },
  confidenceLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  severityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  severityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  severityBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  severityText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  treatmentText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  recommendationText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    backgroundColor: '#FFFBEB',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  actionContainer: {
    marginTop: 8,
  },
  newAnalysisButton: {
    backgroundColor: '#22C55E',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newAnalysisText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  tipsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});