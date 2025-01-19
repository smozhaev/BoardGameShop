import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from '@shared/ui/Themed';
import { Colors } from '@shared/constants';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { CartItem as CartItemType } from '@entities/cart/model/types';
import { removeFromCart, updateQuantity } from '@entities/cart/model/slice';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (delta: number) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity >= 0) {
      dispatch(updateQuantity({ id: item.product.id, quantity: newQuantity }));
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.product.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
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
            onPress={() => handleQuantityChange(-1)}
          >
            <FontAwesome name="minus" size={16} color={Colors.light.text} />
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(1)}
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
  );
};

const styles = StyleSheet.create({
  container: {
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
  content: {
    flex: 1,
    marginLeft: 16,
  },
  header: {
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
});
