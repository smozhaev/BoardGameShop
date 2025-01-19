import { useSelector } from 'react-redux';
import { RootState } from '@app/store/types';
import { CartItem } from '@entities/cart/model/types';

export const useCart = () => {
  const { items } = useSelector((state: RootState) => state.cart);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const getItemById = (id: string): CartItem | undefined => 
    items.find(item => item.product.id === id);

  return {
    items,
    totalItems,
    totalPrice,
    getItemById,
    isEmpty: items.length === 0,
  };
};
