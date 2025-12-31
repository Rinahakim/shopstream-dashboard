import { apiClient } from '@/lib/api-client';
import { logger } from '@/lib/logger';
import type { Metrics, RevenueTrendItem, OrderStatusItem } from '@/types';

class AnalyticsService {
  async getMetrics(): Promise<Metrics> {
    logger.debug('Fetching metrics', 'AnalyticsService');
    const response = await apiClient.get<Metrics>('/analytics/metrics');
    return response.data;
  }

  async getRevenueTrend(): Promise<RevenueTrendItem[]> {
    logger.debug('Fetching revenue trend', 'AnalyticsService');
    const response = await apiClient.get<RevenueTrendItem[]>('/analytics/revenue-trend');
    return response.data;
  }

  async getOrderStatus(): Promise<OrderStatusItem[]> {
    logger.debug('Fetching order status distribution', 'AnalyticsService');
    const response = await apiClient.get<OrderStatusItem[]>('/analytics/order-status');
    return response.data;
  }
}

export const analyticsService = new AnalyticsService();

