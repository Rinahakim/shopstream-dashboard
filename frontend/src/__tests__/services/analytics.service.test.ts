import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyticsService } from '@/services/analytics.service';
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

describe('AnalyticsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getMetrics', () => {
    it('should fetch and return metrics', async () => {
      const mockMetrics = {
        totalRevenue: 15420.50,
        totalOrders: 156,
        avgOrderValue: 98.85,
        totalProducts: 24,
      };

      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockMetrics });

      const result = await analyticsService.getMetrics();

      expect(apiClient.get).toHaveBeenCalledWith('/analytics/metrics');
      expect(result).toEqual(mockMetrics);
    });

    it('should throw error when API fails', async () => {
      vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Network error'));

      await expect(analyticsService.getMetrics()).rejects.toThrow('Network error');
    });
  });

  describe('getRevenueTrend', () => {
    it('should fetch and return revenue trend data', async () => {
      const mockData = [
        { date: '2024-12-24', revenue: 1250.00, orders: 12 },
        { date: '2024-12-25', revenue: 890.50, orders: 8 },
      ];

      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockData });

      const result = await analyticsService.getRevenueTrend();

      expect(apiClient.get).toHaveBeenCalledWith('/analytics/revenue-trend');
      expect(result).toEqual(mockData);
      expect(result).toHaveLength(2);
    });
  });

  describe('getOrderStatus', () => {
    it('should fetch and return order status distribution', async () => {
      const mockData = [
        { status: 'Processed', count: 45 },
        { status: 'In Delivery', count: 32 },
        { status: 'Delivered', count: 79 },
      ];

      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockData });

      const result = await analyticsService.getOrderStatus();

      expect(apiClient.get).toHaveBeenCalledWith('/analytics/order-status');
      expect(result).toEqual(mockData);
      expect(result).toHaveLength(3);
    });
  });
});

