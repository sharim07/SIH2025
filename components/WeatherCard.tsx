import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sun, Cloud, CloudRain, Thermometer, Droplets, Wind } from 'lucide-react-native';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
  }>;
}

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return Sun;
      case 'cloudy':
        return Cloud;
      case 'rainy':
        return CloudRain;
      default:
        return Sun;
    }
  };

  const WeatherIcon = getWeatherIcon(data.condition);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Conditions</Text>
      
      <View style={styles.currentWeather}>
        <View style={styles.mainInfo}>
          <WeatherIcon size={48} color="#22C55E" />
          <View style={styles.tempContainer}>
            <Text style={styles.temperature}>{data.temperature}°C</Text>
            <Text style={styles.condition}>{data.condition}</Text>
          </View>
        </View>
        
        <View style={styles.metrics}>
          <View style={styles.metric}>
            <Droplets size={16} color="#3B82F6" />
            <Text style={styles.metricValue}>{data.humidity}%</Text>
            <Text style={styles.metricLabel}>Humidity</Text>
          </View>
          <View style={styles.metric}>
            <Wind size={16} color="#10B981" />
            <Text style={styles.metricValue}>{data.windSpeed}</Text>
            <Text style={styles.metricLabel}>km/h</Text>
          </View>
        </View>
      </View>

      <View style={styles.forecast}>
        <Text style={styles.forecastTitle}>5-Day Forecast</Text>
        <View style={styles.forecastList}>
          {data.forecast.map((item, index) => {
            const ForecastIcon = getWeatherIcon(item.condition);
            return (
              <View key={index} style={styles.forecastItem}>
                <Text style={styles.forecastDay}>{item.day}</Text>
                <ForecastIcon size={20} color="#6B7280" />
                <Text style={styles.forecastTemp}>{item.temp}°</Text>
              </View>
            );
          })}
        </View>
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
  currentWeather: {
    marginBottom: 20,
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tempContainer: {
    marginLeft: 16,
  },
  temperature: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
  },
  condition: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metric: {
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  forecast: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  forecastTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  forecastList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forecastItem: {
    alignItems: 'center',
    flex: 1,
  },
  forecastDay: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '600',
  },
  forecastTemp: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginTop: 8,
  },
});