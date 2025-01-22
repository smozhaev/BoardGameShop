import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store/types';
import { useProductsApi } from '@shared/hooks/useProductsApi';

export const useProductList = () => {
  const { products, loading, error, filterProducts, searchProducts } = useProductsApi();
  const { searchQuery, categories, inStock, sortBy } = useSelector(
    (state: RootState) => state.filter
  );

  useEffect(() => {
    if (searchQuery) {
      searchProducts(searchQuery);
    } else {
      filterProducts({
        categories: categories.length > 0 ? categories : undefined,
        inStock: inStock === null ? undefined : inStock,
      });
    }
  }, [filterProducts, searchProducts, searchQuery, categories, inStock]);

  const sortedProducts = [...products].sort((a, b) => {
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

  return {
    products: sortedProducts,
    loading,
    error,
  };
};
