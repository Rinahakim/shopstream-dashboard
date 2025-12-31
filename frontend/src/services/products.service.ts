import { apiClient } from '@/lib/api-client';
import { logger } from '@/lib/logger';
import type { Product } from '@/types';

class ProductsService {
  async getProducts(): Promise<Product[]> {
    logger.debug('Fetching products', 'ProductsService');
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  }
}

export const productsService = new ProductsService();

