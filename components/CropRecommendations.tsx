import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Leaf, TrendingUp, Calendar, DollarSign } from 'lucide-react-native';

interface Recommendation {
  crop: string;
  suitability: number;
  expectedYield: string;
  profitMargin: string;
  plantingTime: string;
  sustainabilityScore: number;
}

interface CropRecommendationsProps {
  recommendations: Recommendation[];
}

export function CropRecommendations({ recommendations }: CropRecommendationsProps) {
  const getSuitabilityColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getSustainabilityColor = (score: number) => {
    if (score >= 80) return '#22C55E';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={styles.container}>
      {recommendations.map((recommendation, index) => (
        <TouchableOpacity key={index} style={styles.recommendationCard}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Leaf size={24} color="#22C55E" />
              <Text style={styles.cropName}>{recommendation.crop}</Text>
            </View>
            <View style={styles.scores}>
              <View style={styles.scoreItem}>
                <Text style={[styles.scoreValue, { color: getSuitabilityColor(recommendation.suitability) }]}>
                  {recommendation.suitability}%
                </Text>
                <Text style={styles.scoreLabel}>Suitable</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={[styles.scoreValue, { color: getSustainabilityColor(recommendation.sustainabilityScore) }]}>
                  {recommendation.sustainabilityScore}%
                </Text>
                <Text style={styles.scoreLabel}>Sustainable</Text>
              </View>
            </View>
          </View>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <TrendingUp size={16} color="#3B82F6" />
              <Text style={styles.detailLabel}>Expected Yield:</Text>
              <Text style={styles.detailValue}>{recommendation.expectedYield}</Text>
            </View>
            <View style={styles.detailItem}>
              <DollarSign size={16} color="#10B981" />
              <Text style={styles.detailLabel}>Profit Margin:</Text>
              <Text style={styles.detailValue}>{recommendation.profitMargin}</Text>
            </View>
            <View style={styles.detailItem}>
              <Calendar size={16} color="#F59E0B" />
              <Text style={styles.detailLabel}>Best Planting:</Text>
              <Text style={styles.detailValue}>{recommendation.plantingTime}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cropName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 12,
    flex: 1,
  },
  scores: {
    flexDirection: 'row',
    gap: 16,
  },
  scoreItem: {
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  scoreLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  details: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    marginRight: 8,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
});