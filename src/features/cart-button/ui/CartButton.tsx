import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from '@shared/ui/Themed';
import { Colors } from '@shared/constants';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store/types';
import { useRouter } from 'expo-router';

interface CartButtonProps {
  onPress?: () => void;
}

export const CartButton: React.FC<CartButtonProps> = ({ onPress }) => {
  const router = useRouter();
  const items = useSelector((state: RootState) => state.cart.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push('/cart');
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <FontAwesome name="shopping-cart" size={24} color="#fff" />
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.tint,
    justifyContent: 'end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 24,
    right: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ff6b6b',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
