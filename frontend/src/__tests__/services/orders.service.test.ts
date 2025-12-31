import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ordersService } from '@/services/orders.service';
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

describe('OrdersService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getOrders', () => {
    const mockOrders = [
      {
        id: '507f1f77bcf86cd799439011',
        customerName: 'Alice Johnson',
        product: 'Wireless Headphones',
        quantity: 2,
        totalAmount: 299.98,
        status: 'Delivered',
        createdAt: '2024-12-28T14:30:00.000Z',
      },
      {
        id: '507f1f77bcf86cd799439012',
        customerName: 'Bob Smith',
        product: 'USB-C Hub',
        quantity: 1,
        totalAmount: 49.99,
        status: 'In Delivery',
        createdAt: '2024-12-29T09:15:00.000Z',
      },
    ];

    it('should fetch all orders without filter', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockOrders });

      const result = await ordersService.getOrders();

      expect(apiClient.get).toHaveBeenCalledWith('/orders', { params: {} });
      expect(result).toEqual(mockOrders);
    });

    it('should fetch orders with status filter', async () => {
      const filteredOrders = [mockOrders[0]];
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: filteredOrders });

      const result = await ordersService.getOrders('Delivered');

      expect(apiClient.get).toHaveBeenCalledWith('/orders', { params: { status: 'Delivered' } });
      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('Delivered');
    });

    it('should handle In Delivery status filter', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: [mockOrders[1]] });

      const result = await ordersService.getOrders('In Delivery');

      expect(apiClient.get).toHaveBeenCalledWith('/orders', { params: { status: 'In Delivery' } });
      expect(result[0].status).toBe('In Delivery');
    });

    it('should throw error when API fails', async () => {
      vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Server error'));

      await expect(ordersService.getOrders()).rejects.toThrow('Server error');
    });
  });
});

