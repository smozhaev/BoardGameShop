import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@shared/constants';
import { FilterPanel } from '@features/filter-panel/ui/FilterPanel';
import { ShopHeader } from '@widgets/shop/ui/ShopHeader';
import { ProductList } from '@widgets/shop/ui/ProductList';
import { ActiveFilters } from '@widgets/shop/ui/ActiveFilters';
import { useActiveFilters } from '@widgets/shop/model/useActiveFilters';
import { useShopPage } from './model/useShopPage';

export default function ShopPage() {
  const { isFilterVisible, handleProductPress, handleFilterPress, handleFilterClose } = useShopPage();
  const { hasActiveFilters } = useActiveFilters();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ShopHeader onFilterPress={handleFilterPress} />
        {hasActiveFilters && <ActiveFilters />}
      </View>

      <ProductList onProductPress={handleProductPress} />

      <FilterPanel 
        isVisible={isFilterVisible}
        onClose={handleFilterClose}
      />
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
});