import { Product } from '@entities/product/model/types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface AddToCartPayload {
  product: Product;
  quantity?: number;
}
