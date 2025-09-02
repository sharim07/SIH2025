import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Send,
  Mic,
  Bot,
  User,
  Globe,
  Leaf,
  MessageSquare,
} from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  language?: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI farming assistant. I can help you with crop recommendations, disease diagnosis, weather advice, and farming best practices. How can I assist you today?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const scrollViewRef = useRef<ScrollView>(null);

  const languages = ['English', 'हिंदी', 'मराठी', 'தமிழ்', 'తెలుగు', 'ಕನ್ನಡ'];

  const cropRecommendations = {
    'soil analysis': 'Based on your soil conditions, I recommend:\n\n🌾 **Rice**: pH 6.0-7.0, high water retention\n🌽 **Maize**: pH 6.0-6.8, well-drained soil\n🥔 **Potato**: pH 5.8-6.2, loose, fertile soil\n\nWould you like specific planting schedules for any of these?',
    'weather': 'Current weather analysis for your region:\n\n🌡️ **Temperature**: Ideal for Kharif crops\n🌧️ **Rainfall**: Expected 150mm this month\n💨 **Humidity**: 70% - monitor for fungal diseases\n\nRecommendation: Plant heat-resistant varieties and ensure proper drainage.',
    'disease': 'For crop disease management:\n\n🔬 **Prevention**: Use certified seeds, proper spacing\n🌿 **Organic**: Neem oil, copper fungicide\n💊 **Chemical**: Consult local agricultural officer\n\nTake a photo using the Analyze tab for specific disease identification.',
    'market': 'Current market insights:\n\n📈 **Trending**: Pulses showing 15% price increase\n💰 **High Demand**: Organic vegetables, quinoa\n📊 **Stable**: Rice, wheat maintaining steady prices\n\nConsider diversifying with high-value crops for better profits.',
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('soil') || lowerMessage.includes('recommend') || lowerMessage.includes('crop')) {
      return cropRecommendations['soil analysis'];
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('temperature')) {
      return cropRecommendations['weather'];
    } else if (lowerMessage.includes('disease') || lowerMessage.includes('pest') || lowerMessage.includes('fungus')) {
      return cropRecommendations['disease'];
    } else if (lowerMessage.includes('market') || lowerMessage.includes('price') || lowerMessage.includes('sell')) {
      return cropRecommendations['market'];
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! I\'m here to help you with all your farming needs. You can ask me about:\n\n🌱 Crop recommendations\n🌡️ Weather advice\n🦠 Disease diagnosis\n💰 Market prices\n\nWhat would you like to know?';
    } else {
      return 'I understand you\'re asking about farming. Here are some ways I can help:\n\n🌾 **Crop Selection**: "What crops should I plant?"\n🌡️ **Weather Advice**: "How will weather affect my crops?"\n🦠 **Disease Help**: "My plants look sick"\n💰 **Market Info**: "What are current crop prices?"\n\nPlease feel free to ask me anything specific!';
    }
  };

  const sendMessage = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        isBot: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      setIsTyping(true);

      // Simulate AI response delay
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: generateBotResponse(userMessage.text),
          isBot: true,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Bot size={24} color="#22C55E" />
            <Text style={styles.title}>AI Farm Assistant</Text>
          </View>
          <TouchableOpacity style={styles.languageButton}>
            <Globe size={20} color="#22C55E" />
            <Text style={styles.languageText}>{selectedLanguage}</Text>
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.isBot ? styles.botMessage : styles.userMessage,
              ]}
            >
              <View style={styles.messageHeader}>
                {message.isBot ? (
                  <Bot size={16} color="#22C55E" />
                ) : (
                  <User size={16} color="#3B82F6" />
                )}
                <Text style={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}
          
          {isTyping && (
            <View style={[styles.messageContainer, styles.botMessage]}>
              <View style={styles.messageHeader}>
                <Bot size={16} color="#22C55E" />
                <Text style={styles.messageTime}>typing...</Text>
              </View>
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={[styles.typingDot, { animationDelay: '0.2s' }]} />
                <View style={[styles.typingDot, { animationDelay: '0.4s' }]} />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => setInputText('What crops should I plant this season?')}
            >
              <Leaf size={16} color="#22C55E" />
              <Text style={styles.quickActionText}>Crop Advice</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => setInputText('What are current market prices?')}
            >
              <Text style={styles.quickActionIcon}>💰</Text>
              <Text style={styles.quickActionText}>Market Prices</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => setInputText('How is the weather affecting my crops?')}
            >
              <Text style={styles.quickActionIcon}>🌤️</Text>
              <Text style={styles.quickActionText}>Weather Impact</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => setInputText('My plants look sick, what should I do?')}
            >
              <Text style={styles.quickActionIcon}>🦠</Text>
              <Text style={styles.quickActionText}>Disease Help</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me anything about farming..."
              placeholderTextColor="#9CA3AF"
              multiline
              returnKeyType="send"
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity style={styles.micButton}>
              <Mic size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  languageText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22C55E',
    marginLeft: 4,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  messageTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 6,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    color: '#374151',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  typingIndicator: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginHorizontal: 2,
  },
  quickActions: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quickActionIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-end',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    maxHeight: 100,
  },
  micButton: {
    padding: 4,
    marginLeft: 8,
  },
  sendButton: {
    backgroundColor: '#22C55E',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
});