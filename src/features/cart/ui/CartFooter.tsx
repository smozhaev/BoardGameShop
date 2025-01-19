import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@shared/ui/Themed';
import { Colors } from '@shared/constants';

interface CartFooterProps {
  totalPrice: number;
  onCheckout: () => void;
}

export const CartFooter: React.FC<CartFooterProps> = ({
  totalPrice,
  onCheckout,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Итого:</Text>
        <Text style={styles.totalAmount}>{totalPrice} ₽</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
        <Text style={styles.checkoutButtonText}>Оформить заказ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    color: Colors.light.text,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  checkoutButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
