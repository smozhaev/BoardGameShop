import { Product } from '@entities/product/model/types';
import { products } from '../constants/products';

// Имитация API-запроса
export const getProducts = async (): Promise<Product[]> => {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // В реальном приложении здесь был бы fetch запрос к серверу
  return products;
};

// Получение продукта по ID
export const getProductById = async (id: string): Promise<Product | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const product = products.find(p => p.id === id);
  return product || null;
};

// Поиск продуктов по тексту
export const searchProducts = async (query: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.title.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Фильтрация продуктов
export const filterProducts = async (params: {
  categories?: string[];
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return products.filter(product => {
    if (params.categories?.length && !params.categories.includes(product.category)) {
      return false;
    }
    
    if (params.inStock !== undefined && product.inStock !== params.inStock) {
      return false;
    }
    
    if (params.minPrice !== undefined && product.price < params.minPrice) {
      return false;
    }
    
    if (params.maxPrice !== undefined && product.price > params.maxPrice) {
      return false;
    }
    
    return true;
  });
};
