import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@shared/constants';

interface PointsCardProps {
  points: number;
}

export const PointsCard: React.FC<PointsCardProps> = ({ points }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.light.tint, '#2980b9']}
        style={styles.gradient}
      >
        <Text style={styles.title}>Ваши баллы</Text>
        <Text style={styles.points}>{points}</Text>
        <Text style={styles.description}>
          Накапливайте баллы с каждой покупки и участия в турнирах
        </Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  points: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
});
