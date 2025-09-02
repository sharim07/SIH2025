import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import {
  Camera,
  FlipHorizontal,
  Scan,
  Upload,
  Zap,
  CheckCircle,
} from 'lucide-react-native';
import { AnalysisResults } from '../../components/AnalysisResults';

export default function Analyze() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Camera size={64} color="#22C55E" />
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionSubtitle}>
            We need camera access to analyze your crops and detect diseases
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResults({
        disease: 'Leaf Blight',
        confidence: 87,
        severity: 'Moderate',
        treatment: 'Apply copper-based fungicide',
        recommendation: 'Treat within 2-3 days for best results',
      });
      setIsAnalyzing(false);
      setShowCamera(false);
    }, 3000);
  };

  if (showCamera) {
    return (
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing}>
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraHeader}>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => setShowCamera(false)}
              >
                <Text style={styles.cameraButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraFacing}>
                <FlipHorizontal size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.scanFrame} />
            
            <View style={styles.cameraFooter}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={analyzeImage}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <Zap size={32} color="#FFFFFF" />
                ) : (
                  <Scan size={32} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Crop Analysis</Text>
          <Text style={styles.subtitle}>AI-powered disease detection and health monitoring</Text>
        </View>

        {analysisResults ? (
          <AnalysisResults 
            results={analysisResults} 
            onNewAnalysis={() => {
              setAnalysisResults(null);
              setShowCamera(true);
            }}
          />
        ) : (
          <View style={styles.analyzeContainer}>
            {/* Analysis Options */}
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.primaryOption}
                onPress={() => setShowCamera(true)}
              >
                <Camera size={32} color="#FFFFFF" />
                <Text style={styles.primaryOptionText}>Take Photo</Text>
                <Text style={styles.primaryOptionSubtext}>
                  Capture crop image for AI analysis
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryOption}>
                <Upload size={24} color="#22C55E" />
                <Text style={styles.secondaryOptionText}>Upload Image</Text>
              </TouchableOpacity>
            </View>

            {/* Features */}
            <View style={styles.featuresContainer}>
              <Text style={styles.featuresTitle}>What we can detect:</Text>
              <View style={styles.featuresList}>
                <View style={styles.featureItem}>
                  <CheckCircle size={20} color="#22C55E" />
                  <Text style={styles.featureText}>Disease identification</Text>
                </View>
                <View style={styles.featureItem}>
                  <CheckCircle size={20} color="#22C55E" />
                  <Text style={styles.featureText}>Nutrient deficiencies</Text>
                </View>
                <View style={styles.featureItem}>
                  <CheckCircle size={20} color="#22C55E" />
                  <Text style={styles.featureText}>Pest infestations</Text>
                </View>
                <View style={styles.featureItem}>
                  <CheckCircle size={20} color="#22C55E" />
                  <Text style={styles.featureText}>Growth stage assessment</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  cameraButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cameraButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  scanFrame: {
    alignSelf: 'center',
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#22C55E',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  cameraFooter: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  captureButton: {
    backgroundColor: '#22C55E',
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  analyzeContainer: {
    flex: 1,
    padding: 20,
  },
  optionsContainer: {
    marginBottom: 32,
  },
  primaryOption: {
    backgroundColor: '#22C55E',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryOptionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 12,
  },
  primaryOptionSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 4,
    textAlign: 'center',
  },
  secondaryOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  secondaryOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22C55E',
    marginLeft: 12,
  },
  featuresContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    fontWeight: '500',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  permissionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});