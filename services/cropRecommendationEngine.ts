interface SoilConditions {
  ph: number;
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
}

interface WeatherConditions {
  temperature: number;
  humidity: number;
  rainfall: number;
  season: 'Kharif' | 'Rabi' | 'Zaid';
}

interface MarketConditions {
  prices: Record<string, number>;
  demand: Record<string, 'High' | 'Medium' | 'Low'>;
  trends: Record<string, 'up' | 'down' | 'stable'>;
}

interface CropProfile {
  name: string;
  optimalPh: [number, number];
  waterRequirement: 'Low' | 'Medium' | 'High';
  season: ('Kharif' | 'Rabi' | 'Zaid')[];
  nitrogenRequirement: number;
  phosphorusRequirement: number;
  potassiumRequirement: number;
  maturityPeriod: number; // days
  averageYield: number; // quintals per acre
}

const cropDatabase: CropProfile[] = [
  {
    name: 'Basmati Rice',
    optimalPh: [6.0, 7.0],
    waterRequirement: 'High',
    season: ['Kharif'],
    nitrogenRequirement: 250,
    phosphorusRequirement: 40,
    potassiumRequirement: 150,
    maturityPeriod: 120,
    averageYield: 47,
  },
  {
    name: 'Wheat',
    optimalPh: [6.0, 7.5],
    waterRequirement: 'Medium',
    season: ['Rabi'],
    nitrogenRequirement: 200,
    phosphorusRequirement: 50,
    potassiumRequirement: 100,
    maturityPeriod: 110,
    averageYield: 35,
  },
  {
    name: 'Cotton',
    optimalPh: [5.8, 8.2],
    waterRequirement: 'Medium',
    season: ['Kharif'],
    nitrogenRequirement: 180,
    phosphorusRequirement: 60,
    potassiumRequirement: 120,
    maturityPeriod: 180,
    averageYield: 18,
  },
  {
    name: 'Sugarcane',
    optimalPh: [6.5, 7.5],
    waterRequirement: 'High',
    season: ['Kharif', 'Rabi'],
    nitrogenRequirement: 300,
    phosphorusRequirement: 80,
    potassiumRequirement: 200,
    maturityPeriod: 365,
    averageYield: 900,
  },
  {
    name: 'Maize',
    optimalPh: [6.0, 6.8],
    waterRequirement: 'Medium',
    season: ['Kharif', 'Rabi'],
    nitrogenRequirement: 220,
    phosphorusRequirement: 55,
    potassiumRequirement: 130,
    maturityPeriod: 90,
    averageYield: 25,
  },
];

export class CropRecommendationEngine {
  private calculateSoilSuitability(crop: CropProfile, soil: SoilConditions): number {
    let score = 0;
    
    // pH compatibility (40% weight)
    const phScore = this.getPhScore(crop.optimalPh, soil.ph);
    score += phScore * 0.4;
    
    // Nutrient availability (60% weight)
    const nutrientScore = this.getNutrientScore(crop, soil);
    score += nutrientScore * 0.6;
    
    return Math.min(100, Math.max(0, score));
  }

  private getPhScore(optimalRange: [number, number], currentPh: number): number {
    const [min, max] = optimalRange;
    if (currentPh >= min && currentPh <= max) return 100;
    
    const distance = currentPh < min ? min - currentPh : currentPh - max;
    return Math.max(0, 100 - (distance * 20)); // 20 points deduction per pH unit
  }

  private getNutrientScore(crop: CropProfile, soil: SoilConditions): number {
    const nScore = Math.min(100, (soil.nitrogen / crop.nitrogenRequirement) * 100);
    const pScore = Math.min(100, (soil.phosphorus / crop.phosphorusRequirement) * 100);
    const kScore = Math.min(100, (soil.potassium / crop.potassiumRequirement) * 100);
    
    return (nScore + pScore + kScore) / 3;
  }

  private calculateWeatherSuitability(crop: CropProfile, weather: WeatherConditions): number {
    let score = 100;
    
    // Season compatibility
    if (!crop.season.includes(weather.season)) {
      score -= 50;
    }
    
    // Water requirement vs humidity/rainfall
    if (crop.waterRequirement === 'High' && weather.humidity < 60) {
      score -= 20;
    }
    if (crop.waterRequirement === 'Low' && weather.humidity > 80) {
      score -= 15;
    }
    
    return Math.max(0, score);
  }

  private calculateMarketScore(cropName: string, market: MarketConditions): number {
    const demand = market.demand[cropName] || 'Medium';
    const trend = market.trends[cropName] || 'stable';
    
    let score = 50; // Base score
    
    // Demand scoring
    switch (demand) {
      case 'High':
        score += 30;
        break;
      case 'Medium':
        score += 15;
        break;
      case 'Low':
        score += 0;
        break;
    }
    
    // Trend scoring
    switch (trend) {
      case 'up':
        score += 20;
        break;
      case 'stable':
        score += 10;
        break;
      case 'down':
        score += 0;
        break;
    }
    
    return Math.min(100, score);
  }

  private calculateSustainabilityScore(crop: CropProfile, soil: SoilConditions): number {
    let score = 70; // Base sustainability score
    
    // Organic matter bonus
    if (soil.organicMatter > 3.0) score += 20;
    else if (soil.organicMatter > 2.0) score += 10;
    
    // Water efficiency
    if (crop.waterRequirement === 'Low') score += 10;
    else if (crop.waterRequirement === 'High') score -= 10;
    
    return Math.min(100, Math.max(0, score));
  }

  generateRecommendations(
    soil: SoilConditions,
    weather: WeatherConditions,
    market: MarketConditions
  ) {
    const recommendations = cropDatabase.map(crop => {
      const soilScore = this.calculateSoilSuitability(crop, soil);
      const weatherScore = this.calculateWeatherSuitability(crop, weather);
      const marketScore = this.calculateMarketScore(crop.name, market);
      const sustainabilityScore = this.calculateSustainabilityScore(crop, soil);
      
      // Weighted average: soil 40%, weather 30%, market 30%
      const overallSuitability = (soilScore * 0.4) + (weatherScore * 0.3) + (marketScore * 0.3);
      
      const currentPrice = market.prices[crop.name] || 2000;
      const estimatedRevenue = crop.averageYield * currentPrice;
      const estimatedCost = estimatedRevenue * 0.6; // Assume 60% cost ratio
      const profitMargin = estimatedRevenue - estimatedCost;
      
      return {
        crop: crop.name,
        suitability: Math.round(overallSuitability),
        expectedYield: `${crop.averageYield - 5}-${crop.averageYield + 5} quintals/acre`,
        profitMargin: `₹${(profitMargin / 1000).toFixed(0)}K-${((profitMargin * 1.2) / 1000).toFixed(0)}K/acre`,
        plantingTime: this.getPlantingTime(crop.season, weather.season),
        sustainabilityScore: Math.round(sustainabilityScore),
      };
    });
    
    // Sort by suitability score and return top 3
    return recommendations
      .sort((a, b) => b.suitability - a.suitability)
      .slice(0, 3);
  }

  private getPlantingTime(cropSeasons: string[], currentSeason: string): string {
    if (cropSeasons.includes(currentSeason)) {
      return 'Now (Current Season)';
    }
    
    const seasonOrder = ['Rabi', 'Zaid', 'Kharif'];
    const currentIndex = seasonOrder.indexOf(currentSeason);
    
    for (let i = 1; i <= 3; i++) {
      const nextSeason = seasonOrder[(currentIndex + i) % 3];
      if (cropSeasons.includes(nextSeason)) {
        return `${nextSeason} Season`;
      }
    }
    
    return 'Next suitable season';
  }
}

export const cropRecommendationEngine = new CropRecommendationEngine();