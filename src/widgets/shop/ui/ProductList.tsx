import React, { useCallback, memo } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text } from '@shared/ui/Themed';
import { Colors } from '@shared/constants';
import { Product } from '@entities/product/model/types';
import { ProductCard } from '@features/product-card/ui/ProductCard';
import { useProductList } from '../model/useProductList';

interface ProductListProps {
  onProductPress: (product: Product) => void;
}

const ProductItem = memo(({ item, onPress }: { 
  item: Product; 
  onPress: (product: Product) => void; 
}) => (
  <View style={styles.productContainer}>
    <ProductCard
      product={item}
      onPress={() => onPress(item)}
    />
  </View>
));

export const ProductList: React.FC<ProductListProps> = ({ onProductPress }) => {
  const { products, loading, error } = useProductList();

  const renderItem = useCallback(({ item }: { item: Product }) => (
    <ProductItem item={item} onPress={onProductPress} />
  ), [onProductPress]);

  const keyExtractor = useCallback((item: Product) => item.id, []);

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
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      maxToRenderPerBatch={8}
      updateCellsBatchingPeriod={50}
      initialNumToRender={6}
      windowSize={5}
      getItemLayout={(data, index) => ({
        length: 200, // Примерная высота элемента
        offset: 200 * index,
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  productContainer: {
    marginBottom: 16,
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
