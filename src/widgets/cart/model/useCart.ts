import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@app/store/types';
import { removeFromCart, updateQuantity } from '@entities/cart/model/slice';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: string, delta: number) => {
    const item = items.find((item) => item.product.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity >= 0) {
        dispatch(updateQuantity({ id, quantity: newQuantity }));
      }
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return {
    items,
    totalPrice,
    handleQuantityChange,
    handleRemoveItem,
    isEmpty: items.length === 0,
  };
};
