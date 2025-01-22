import React from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text } from '@shared/ui/Themed';
import { Colors } from '@shared/constants';
import { Product } from '@entities/product/model/types';
import { ProductCard } from '@features/product-card/ui/ProductCard';
import { useProductList } from '../model/useProductList';

interface ProductListProps {
  onProductPress: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ onProductPress }) => {
  const { products, loading, error } = useProductList();

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.productsContainer}
      showsVerticalScrollIndicator={false}
    >
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onPress={() => onProductPress(product)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  productsContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ff6b6b',
    textAlign: 'center',
  },
});
