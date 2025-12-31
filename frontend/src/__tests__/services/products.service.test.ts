import { describe, it, expect, vi, beforeEach } from 'vitest';
import { productsService } from '@/services/products.service';
import { apiClient } from '@/lib/api-client';

// Mock the api-client module
vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

// Mock the logger
vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('ProductsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getProducts', () => {
    const mockProducts = [
      {
        id: '507f1f77bcf86cd799439001',
        name: 'Wireless Headphones',
        description: 'Bluetooth over-ear headphones',
        price: 149.99,
        cost: 75.00,
        stock: 45,
        createdAt: '2024-12-01T10:00:00.000Z',
      },
      {
        id: '507f1f77bcf86cd799439002',
        name: 'Smart Watch Pro',
        description: 'Fitness tracking smartwatch',
        price: 299.99,
        cost: 150.00,
        stock: 30,
        createdAt: '2024-12-01T10:00:00.000Z',
      },
    ];

    it('should fetch and return products', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockProducts });

      const result = await productsService.getProducts();

      expect(apiClient.get).toHaveBeenCalledWith('/products');
      expect(result).toEqual(mockProducts);
      expect(result).toHaveLength(2);
    });

    it('should return correct product properties', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockProducts });

      const result = await productsService.getProducts();

      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('description');
      expect(result[0]).toHaveProperty('price');
      expect(result[0]).toHaveProperty('cost');
      expect(result[0]).toHaveProperty('stock');
    });

    it('should throw error when API fails', async () => {
      vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Network error'));

      await expect(productsService.getProducts()).rejects.toThrow('Network error');
    });

    it('should handle empty product list', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: [] });

      const result = await productsService.getProducts();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });
});

