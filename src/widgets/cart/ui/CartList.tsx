import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CartItem } from './CartItem';
import { useCart } from '../model/useCart';

export const CartList: React.FC = () => {
  const { items, handleQuantityChange, handleRemoveItem } = useCart();

  return (
    <ScrollView style={styles.scrollView}>
      {items.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemoveItem}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});
