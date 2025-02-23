import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@shared/ui/Themed';
import { Colors } from '@shared/constants';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export const EmptyCart: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FontAwesome name="shopping-cart" size={64} color="#ccc" />
      <Text style={styles.text}>Корзина пуста</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/shop')}
      >
        <Text style={styles.buttonText}>Продолжить покупки</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Colors.light.tint,
    borderRadius: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
