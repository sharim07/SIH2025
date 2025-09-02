export const mockWeatherData = {
  temperature: 28,
  humidity: 65,
  windSpeed: 12,
  condition: 'Sunny',
  forecast: [
    { day: 'Today', temp: 28, condition: 'Sunny' },
    { day: 'Tomorrow', temp: 26, condition: 'Cloudy' },
    { day: 'Wed', temp: 24, condition: 'Rainy' },
    { day: 'Thu', temp: 27, condition: 'Sunny' },
    { day: 'Fri', temp: 29, condition: 'Sunny' },
  ],
};

export const mockSoilData = {
  ph: 6.5,
  moisture: 45,
  nitrogen: 280,
  phosphorus: 45,
  potassium: 180,
  organicMatter: 3.2,
};

export const mockRecommendations = [
  {
    crop: 'Basmati Rice',
    suitability: 92,
    expectedYield: '45-50 quintals/acre',
    profitMargin: '₹15,000-20,000/acre',
    plantingTime: 'June-July',
    sustainabilityScore: 85,
  },
  {
    crop: 'Sugarcane',
    suitability: 78,
    expectedYield: '800-1000 quintals/acre',
    profitMargin: '₹25,000-30,000/acre',
    plantingTime: 'February-March',
    sustainabilityScore: 65,
  },
  {
    crop: 'Cotton',
    suitability: 85,
    expectedYield: '15-20 quintals/acre',
    profitMargin: '₹18,000-25,000/acre',
    plantingTime: 'May-June',
    sustainabilityScore: 75,
  },
];

export const mockMarketData = [
  {
    crop: 'Basmati Rice',
    currentPrice: 2800,
    previousPrice: 2650,
    location: 'Pune APMC',
    unit: 'quintal',
    demand: 'High' as const,
    quality: 'Grade A',
  },
  {
    crop: 'Wheat',
    currentPrice: 2200,
    previousPrice: 2250,
    location: 'Mumbai Market',
    unit: 'quintal',
    demand: 'Medium' as const,
    quality: 'FAQ',
  },
  {
    crop: 'Onion',
    currentPrice: 1500,
    previousPrice: 1200,
    location: 'Nashik Market',
    unit: 'quintal',
    demand: 'High' as const,
    quality: 'Medium',
  },
  {
    crop: 'Tomato',
    currentPrice: 800,
    previousPrice: 900,
    location: 'Local Market',
    unit: 'quintal',
    demand: 'Low' as const,
    quality: 'Grade B',
  },
];

export const mockDemandData = [
  { crop: 'Rice', demand: 85, trend: 'up' as const },
  { crop: 'Wheat', demand: 70, trend: 'stable' as const },
  { crop: 'Cotton', demand: 65, trend: 'down' as const },
  { crop: 'Onion', demand: 90, trend: 'up' as const },
  { crop: 'Tomato', demand: 45, trend: 'down' as const },
];