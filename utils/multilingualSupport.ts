export const translations = {
  English: {
    greeting: 'Hello! I\'m your AI farming assistant.',
    cropRecommendation: 'Crop Recommendation',
    weatherAdvice: 'Weather Advice',
    diseaseHelp: 'Disease Help',
    marketPrices: 'Market Prices',
    askAnything: 'Ask me anything about farming...',
    soilAnalysis: 'Soil Analysis',
    currentWeather: 'Current Weather',
    dashboard: 'Dashboard',
    market: 'Market',
    analyze: 'Analyze',
    chat: 'AI Chat',
    profile: 'Profile',
  },
  हिंदी: {
    greeting: 'नमस्ते! मैं आपका AI कृषि सहायक हूं।',
    cropRecommendation: 'फसल सुझाव',
    weatherAdvice: 'मौसम सलाह',
    diseaseHelp: 'रोग सहायता',
    marketPrices: 'बाजार भाव',
    askAnything: 'खेती के बारे में कुछ भी पूछें...',
    soilAnalysis: 'मिट्टी विश्लेषण',
    currentWeather: 'वर्तमान मौसम',
    dashboard: 'डैशबोर्ड',
    market: 'बाजार',
    analyze: 'विश्लेषण',
    chat: 'AI चैट',
    profile: 'प्रोफाइल',
  },
  मराठी: {
    greeting: 'नमस्कार! मी तुमचा AI शेती सहाय्यक आहे।',
    cropRecommendation: 'पीक शिफारस',
    weatherAdvice: 'हवामान सल्ला',
    diseaseHelp: 'रोग मदत',
    marketPrices: 'बाजार भाव',
    askAnything: 'शेतीबद्दल काहीही विचारा...',
    soilAnalysis: 'माती विश्लेषण',
    currentWeather: 'सध्याचे हवामान',
    dashboard: 'डॅशबोर्ड',
    market: 'बाजार',
    analyze: 'विश्लेषण',
    chat: 'AI चॅट',
    profile: 'प्रोफाइल',
  },
};

export type SupportedLanguage = keyof typeof translations;

export class MultilingualService {
  private static instance: MultilingualService;
  private currentLanguage: SupportedLanguage = 'English';

  static getInstance(): MultilingualService {
    if (!MultilingualService.instance) {
      MultilingualService.instance = new MultilingualService();
    }
    return MultilingualService.instance;
  }

  setLanguage(language: SupportedLanguage) {
    this.currentLanguage = language;
  }

  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  translate(key: keyof typeof translations.English): string {
    return translations[this.currentLanguage]?.[key] || translations.English[key];
  }

  getSupportedLanguages(): SupportedLanguage[] {
    return Object.keys(translations) as SupportedLanguage[];
  }

  // Translate farmer messages to English for AI processing
  async translateToEnglish(text: string, sourceLanguage: SupportedLanguage): Promise<string> {
    // In a real implementation, this would use a translation API
    // For now, return the original text
    return text;
  }

  // Translate AI responses back to farmer's language
  async translateResponse(text: string, targetLanguage: SupportedLanguage): Promise<string> {
    // In a real implementation, this would use a translation API
    // For now, return the original text
    return text;
  }
}

export const multilingualService = MultilingualService.getInstance();