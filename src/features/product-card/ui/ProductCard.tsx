import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Text } from '@shared/ui/Themed';
import { Product } from '@entities/product/model/types';
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import { hapticFeedback } from '@shared/lib/platform/haptics';
import { shareProduct } from '@shared/lib/platform/share';
import { Colors } from '@shared/constants';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const handlePress = useCallback(async () => {
    await hapticFeedback.light();
    onPress();
  }, [onPress]);

  const handleShare = useCallback(async () => {
    try {
      await hapticFeedback.medium();
      await shareProduct(product.id, product.title);
    } catch (error) {
      console.error('Error sharing product:', error);
    }
  }, [product]);

  return (
    <TouchableOpacity
      style={[styles.container, Platform.select({
        ios: styles.containerIOS,
        android: styles.containerAndroid,
      })]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: product.imageUrl }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <FontAwesome
              name={Platform.OS === 'ios' ? 'share' : 'share-alt'}
              size={20}
              color={Colors.light.text}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.price}>{product.price} ₽</Text>
        {!product.inStock && (
          <Text style={styles.outOfStock}>Нет в наличии</Text>
        )}
        <View style={styles.footer}>
          <Text style={styles.info}>{product.players}</Text>
          <Text style={styles.info}>{product.playTime}</Text>
          <View style={styles.rating}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>
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
  },
  containerIOS: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  containerAndroid: {
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  shareButton: {
    padding: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginTop: 8,
  },
  outOfStock: {
    color: '#ff6b6b',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
