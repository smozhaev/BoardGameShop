import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@shared/constants';
import { EmptyCart } from '@widgets/cart/ui/EmptyCart';
import { CartList } from '@widgets/cart/ui/CartList';
import { CartFooter } from '@widgets/cart/ui/CartFooter';
import { useCart } from '@widgets/cart/model/useCart';

export default function CartPage() {
  const { isEmpty } = useCart();

  if (isEmpty) {
    return <EmptyCart />;
  }

  return (
    <View style={styles.container}>
      <CartList />
      <CartFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});