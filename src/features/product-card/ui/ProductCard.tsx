import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@shared/ui/Themed';
import { Colors } from '@shared/constants';
import { Product } from '@entities/product/model/types';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '@entities/cart/model/slice';
import { Images } from '../../../../assets/images/games'

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    dispatch(addToCart({ product }));
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(product)}
    >
      <Image
        source={Images[product.imageUrl]}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{product.rating}</Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        <View style={styles.footer}>
          <View>
            <Text style={styles.price}>{product.price} ₽</Text>
            {!product.inStock && (
              <Text style={styles.outOfStock}>Нет в наличии</Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.addButton,
              !product.inStock && styles.addButtonDisabled,
            ]}
            onPress={handleAddToCart}
            disabled={!product.inStock}
          >
            <FontAwesome 
              name="shopping-cart"
              size={20} 
              color={product.inStock ? '#fff' : '#999'} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    color: Colors.light.text,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  outOfStock: {
    fontSize: 12,
    color: '#ff6b6b',
    marginTop: 4,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
});
