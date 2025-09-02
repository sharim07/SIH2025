import AsyncStorage from '@react-native-async-storage/async-storage';

interface OfflineData {
  recommendations: any[];
  soilData: any;
  weatherData: any;
  marketData: any[];
  chatHistory: any[];
  lastUpdated: string;
}

export class OfflineStorageService {
  private static instance: OfflineStorageService;
  private storageKey = '@FarmApp:OfflineData';

  static getInstance(): OfflineStorageService {
    if (!OfflineStorageService.instance) {
      OfflineStorageService.instance = new OfflineStorageService();
    }
    return OfflineStorageService.instance;
  }

  async saveData(data: Partial<OfflineData>): Promise<void> {
    try {
      const existingData = await this.getData();
      const updatedData = {
        ...existingData,
        ...data,
        lastUpdated: new Date().toISOString(),
      };
      
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error saving offline data:', error);
    }
  }

  async getData(): Promise<OfflineData> {
    try {
      const data = await AsyncStorage.getItem(this.storageKey);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error retrieving offline data:', error);
    }
    
    // Return default data structure
    return {
      recommendations: [],
      soilData: {},
      weatherData: {},
      marketData: [],
      chatHistory: [],
      lastUpdated: new Date().toISOString(),
    };
  }

  async clearData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('Error clearing offline data:', error);
    }
  }

  async saveChatMessage(message: any): Promise<void> {
    try {
      const data = await this.getData();
      data.chatHistory.push(message);
      
      // Keep only last 100 messages
      if (data.chatHistory.length > 100) {
        data.chatHistory = data.chatHistory.slice(-100);
      }
      
      await this.saveData({ chatHistory: data.chatHistory });
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  }

  async getChatHistory(): Promise<any[]> {
    try {
      const data = await this.getData();
      return data.chatHistory || [];
    } catch (error) {
      console.error('Error retrieving chat history:', error);
      return [];
    }
  }
}

export const offlineStorage = OfflineStorageService.getInstance();