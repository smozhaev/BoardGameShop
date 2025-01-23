import { renderHook, act } from '@testing-library/react';
import { useProductsApi } from '@shared/hooks/useProductsApi';
import {jest} from "@jest/globals";
import {afterEach, describe, it} from "@jest/globals";
import * as api from '../src/shared/api/products/products';
import expect from "expect";

jest.mock('../src/shared/api/products/products');

describe('useProductsApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all products', async () => {
    const mockProducts = [
      { id: '1', name: 'Product 1' },
      { id: '2', name: 'Product 2' },
    ];
    (api.getProducts as jest.Mock).mockImplementation(async () => mockProducts);

    const { result, waitFor } = renderHook(() => useProductsApi());

    await waitFor(() => !result.current.loading);

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
    expect(api.getProducts).toHaveBeenCalledTimes(1);
  });

  it('should fetch a product by ID', async () => {
    const mockProduct = { id: '1', name: 'Product 1' };
    (api.getProductById as jest.Mock).mockImplementation(async (id: string) => {
      if (id === '1') {
        return mockProduct;
      }
      return null;
    });

    const { result, waitFor } = renderHook(() => useProductsApi());

    const product = await result.current.fetchProductById('1');

    expect(product).toEqual(mockProduct);
    expect(result.current.error).toBeNull();
    expect(api.getProductById).toHaveBeenCalledWith('1');
  });

  it('should search for products', async () => {
    const mockProducts = [
      { id: '1', name: 'Product 1' },
      { id: '2', name: 'Product 2' },
    ];
    (api.searchProducts as jest.Mock).mockImplementation(async (query: string) => {
      if (query === 'query') {
        return mockProducts;
      }
      return [];
    });

    const { result, waitFor } = renderHook(() => useProductsApi());

    await act(async () => {
      await result.current.searchProducts('query');
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
    expect(api.searchProducts).toHaveBeenCalledWith('query');
  });

  it('should filter products', async () => {
    const mockProducts = [
      { id: '1', name: 'Product 1', price: 10, inStock: true },
      { id: '2', name: 'Product 2', price: 20, inStock: false },
    ];
    (api.filterProducts as jest.Mock).mockImplementation(async (params: {
      categories?: string[];
      inStock?: boolean;
      minPrice?: number;
      maxPrice?: number;
    }) => {
      return mockProducts.filter(product => {
        if (params.minPrice !== undefined && product.price < params.minPrice) {
          return false;
        }
        if (params.maxPrice !== undefined && product.price > params.maxPrice) {
          return false;
        }
        if (params.inStock !== undefined && product.inStock !== params.inStock) {
          return false;
        }
        return true;
      });
    });

    const { result, waitFor } = renderHook(() => useProductsApi());

    await act(async () => {
      await result.current.filterProducts({
        minPrice: 5,
        maxPrice: 15,
        inStock: true,
      });
    });

    expect(result.current.products).toEqual(mockProducts.filter(product => product.price >= 5 && product.price <= 15 && product.inStock));
    expect(result.current.error).toBeNull();
    expect(api.filterProducts).toHaveBeenCalledWith({
      minPrice: 5,
      maxPrice: 15,
      inStock: true,
    });
  });

  it('should handle errors when fetching products', async () => {
    (api.getProducts as jest.Mock).mockImplementation(async () => {
      throw new Error('Network error');
    });

    const { result, waitFor } = renderHook(() => useProductsApi());

    await waitFor(() => !result.current.loading);

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe('Ошибка при загрузке продуктов');
    expect(api.getProducts).toHaveBeenCalledTimes(1);
  });

  it('should handle errors when fetching a product by ID', async () => {
    (api.getProductById as jest.Mock).mockImplementation(async () => {
      throw new Error('Network error');
    });

    const { result, waitFor } = renderHook(() => useProductsApi());

    const product = await result.current.fetchProductById('1');

    expect(product).toBeNull();
    expect(result.current.error).toBe('Ошибка при загрузке продукта');
    expect(api.getProductById).toHaveBeenCalledWith('1');
  });

  it('should handle errors when searching for products', async () => {
    (api.searchProducts as jest.Mock).mockImplementation(async () => {
      throw new Error('Network error');
    });

    const { result, waitFor } = renderHook(() => useProductsApi());

    await act(async () => {
      await result.current.searchProducts('query');
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe('Ошибка при поиске продуктов');
    expect(api.searchProducts).toHaveBeenCalledWith('query');
  });

  it('should handle errors when filtering products', async () => {
    (api.filterProducts as jest.Mock).mockImplementation(async () => {
      throw new Error('Network error');
    });

    const { result, waitFor } = renderHook(() => useProductsApi());

    await act(async () => {
      await result.current.filterProducts({
        minPrice: 5,
        maxPrice: 15,
        inStock: true,
      });
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe('Ошибка при фильтрации продуктов');
    expect(api.filterProducts).toHaveBeenCalledWith({
      minPrice: 5,
      maxPrice: 15,
      inStock: true,
    });
  });
});
