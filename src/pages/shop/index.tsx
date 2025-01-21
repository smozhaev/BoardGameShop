import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Colors } from '@shared/constants';
import { ProductCard } from '@features/product-card/ui/ProductCard';
import { Product } from '@entities/product/model/types';
import { products } from '@entities/product/model/constants';
import { FilterPanel } from '@features/filter-panel/ui/FilterPanel';
import { RootState } from '@app/store/types';
import { setSearchQuery } from '@app/store/filterSlice';
import { SearchBar } from '@shared/ui/SearchBar';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from '@shared/ui/Themed';
import { CartButton } from '@features/cart-button/ui/CartButton';

export default function ShopPage() {
  const dispatch = useDispatch();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const { searchQuery, categories, inStock, sortBy } = useSelector(
    (state: RootState) => state.filter
  );

  // Фильтрация товаров
  const filteredProducts = products.filter(product => {
    // Поиск по тексту
    const matchesSearch = 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Фильтр по категориям
    const matchesCategory = categories.length === 0 || categories.includes(product.category);

    // Фильтр по наличию
    const matchesStock = inStock === null || product.inStock === inStock;

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Сортировка товаров
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleProductPress = (product: Product) => {
    // Здесь будет навигация к детальной странице товара
    console.log('Открываем товар:', product.title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchRow}>
          <SearchBar
            value={searchQuery}
            onChangeText={(text) => dispatch(setSearchQuery(text))}
            placeholder="Поиск игр..."
            style={styles.searchBar}
          />
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setIsFilterVisible(true)}
          >
            <FontAwesome name="sliders" size={20} color={Colors.light.text} />
          </TouchableOpacity>
        </View>
        
        {categories.length > 0 && (
          <View style={styles.activeFilters}>
            <Text style={styles.activeFiltersText}>
              Выбрано категорий: {categories.length}
            </Text>
          </View>
        )}
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.productsContainer}
        showsVerticalScrollIndicator={false}
      >
        {sortedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={handleProductPress}
          />
        ))}
      </ScrollView>

      <FilterPanel 
        isVisible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
      />

      {/* <CartButton /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    backgroundColor: Colors.light.background,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    zIndex: 1,
    paddingBottom: 8,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBar: {
    flex: 1,
    marginRight: 8,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilters: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  activeFiltersText: {
    fontSize: 12,
    color: Colors.light.tint,
  },
  scrollView: {
    flex: 1,
  },
  productsContainer: {
    padding: 16,
    paddingBottom: 32,
  },
});