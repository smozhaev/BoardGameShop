import { useState } from 'react';
import { Product } from '@entities/product/model/types';

export const useShopPage = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleProductPress = (product: Product) => {
    // Здесь будет навигация к детальной странице товара
    console.log('Открываем товар:', product.title);
  };

  const handleFilterPress = () => {
    setIsFilterVisible(true);
  };

  const handleFilterClose = () => {
    setIsFilterVisible(false);
  };

  return {
    isFilterVisible,
    handleProductPress,
    handleFilterPress,
    handleFilterClose,
  };
};
