import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from '@shared/ui/Themed';
import { Colors } from '@shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@app/store/types';
import { removeFromCart, updateQuantity } from '@entities/cart/model/slice';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items } = useSelector((state: RootState) => state.cart);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: string, delta: number) => {
    const item = items.find((item) => item.product.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity >= 0) {
        dispatch(updateQuantity({ id, quantity: newQuantity }));
      }
    }
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <FontAwesome name="shopping-cart" size={64} color="#ccc" />
        <Text style={styles.emptyText}>Корзина пуста</Text>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push('/(tabs)/shop')}
        >
          <Text style={styles.continueButtonText}>Продолжить покупки</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {items.map((item) => (
          <View key={item.product.id} style={styles.cartItem}>
            <Image
              source={{ uri: item.product.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
            
            <View style={styles.itemContent}>
              <View style={styles.itemHeader}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.product.title}
                </Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeFromCart(item.product.id))}
                  style={styles.removeButton}
                >
                  <FontAwesome name="trash" size={20} color="#ff6b6b" />
                </TouchableOpacity>
              </View>

              <Text style={styles.price}>
                <Text>{item.product.price}</Text>
                <Text> ₽</Text>
              </Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.product.id, -1)}
                >
                  <FontAwesome name="minus" size={16} color={Colors.light.text} />
                </TouchableOpacity>

                <Text style={styles.quantity}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleQuantityChange(item.product.id, 1)}
                >
                  <FontAwesome name="plus" size={16} color={Colors.light.text} />
                </TouchableOpacity>

                <Text style={styles.totalPrice}>
                  <Text>{item.product.price * item.quantity}</Text>
                  <Text> ₽</Text>
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Итого:</Text>
          <Text style={styles.totalAmount}>
            <Text>{totalPrice}</Text>
            <Text> ₽</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Оформить заказ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  continueButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Colors.light.tint,
    borderRadius: 24,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
    marginLeft: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  price: {
    fontSize: 16,
    color: Colors.light.text,
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: 'center',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  footer: {
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