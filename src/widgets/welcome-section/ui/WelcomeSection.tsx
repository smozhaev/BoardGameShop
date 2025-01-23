import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Colors } from '@shared/constants';

const { height: screenHeight } = Dimensions.get('window');

export const WelcomeSection = () => {
  const router = useRouter();

  return (
    <View style={styles.fullScreenSection}>
      <ImageBackground
        source={require('../../../../assets/images/board-game-intro.jpg')}
        style={styles.headerBackground}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Animated.Text style={styles.headerTitle}>
              Добро пожаловать в BoardGameShop!
            </Animated.Text>
            <Animated.Text style={styles.headerDescription}>
              Открывайте лучшие настольные игры, следите за турнирами и покупайте любимые настолки!
            </Animated.Text>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.push('/(tabs)/shop')}
            >
              <LinearGradient
                colors={[Colors.light.tint, '#2980b9']}
                style={styles.headerButtonGradient}
              >
                <Text style={styles.headerButtonText}>Начать покупки</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={styles.scrollIndicator}>
          <Text style={styles.scrollText}>Листайте вниз</Text>
          <Animated.View
            style={styles.arrow}
            entering={FadeIn.delay(500).duration(1000)}
          >
            <Text>
                ↓
            </Text>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenSection: {
    height: screenHeight - 100,
    width: '100%',
  },
  headerBackground: {
    flex: 1,
    width: '100%',
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 120,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  headerDescription: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  headerButton: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  headerButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 40,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scrollText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  arrow: {
    color: '#fff',
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
