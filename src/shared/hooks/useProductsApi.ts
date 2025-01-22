import { useState, useEffect, useCallback } from 'react';
import { Product } from '@entities/product/model/types';
import { getProducts, getProductById, searchProducts, filterProducts } from '@shared/api/products/products';


export const useProductsApi = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка всех продуктов
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке продуктов');
    } finally {
      setLoading(false);
    }
  }, []);

  // Загрузка продукта по ID
  const fetchProductById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const product = await getProductById(id);
      setError(null);
      return product;
    } catch (err) {
      setError('Ошибка при загрузке продукта');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Поиск продуктов
  const searchProductsByQuery = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const results = await searchProducts(query);
      setProducts(results);
      setError(null);
    } catch (err) {
      setError('Ошибка при поиске продуктов');
    } finally {
      setLoading(false);
    }
  }, []);

  // Фильтрация продуктов
  const filterProductsByParams = useCallback(async (params: {
    categories?: string[];
    inStock?: boolean;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    setLoading(true);
    try {
      const results = await filterProducts(params);
      setProducts(results);
      setError(null);
    } catch (err) {
      setError('Ошибка при фильтрации продуктов');
    } finally {
      setLoading(false);
    }
  }, []);

  // Загрузка продуктов при монтировании
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    searchProducts: searchProductsByQuery,
    filterProducts: filterProductsByParams,
  };
};
