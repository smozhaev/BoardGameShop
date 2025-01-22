import { useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store/types';
import { useProductsApi } from '@shared/hooks/useProductsApi';

export const useProductList = () => {
  const { products, loading, error, filterProducts, searchProducts } = useProductsApi();
  const { searchQuery, categories, inStock, sortBy } = useSelector(
    (state: RootState) => state.filter,
    (prev, next) => {
      return prev.searchQuery === next.searchQuery &&
        prev.categories.join(',') === next.categories.join(',') &&
        prev.inStock === next.inStock &&
        prev.sortBy === next.sortBy;
    }
  );

  const handleFilter = useCallback(() => {
    if (searchQuery) {
      searchProducts(searchQuery);
    } else {
      filterProducts({
        categories: categories.length > 0 ? categories : undefined,
        inStock: inStock === null ? undefined : inStock,
      });
    }
  }, [filterProducts, searchProducts, searchQuery, categories, inStock]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  const sortedProducts = useMemo(() => {
    if (!products.length) return [];
    
    return [...products].sort((a, b) => {
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
  }, [products, sortBy]);

  return {
    products: sortedProducts,
    loading,
    error,
  };
};
