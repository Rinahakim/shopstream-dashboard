import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services';

export const ANALYTICS_KEYS = {
  metrics: ['analytics', 'metrics'] as const,
  revenueTrend: ['analytics', 'revenue-trend'] as const,
  orderStatus: ['analytics', 'order-status'] as const,
};

export function useMetrics() {
  return useQuery({
    queryKey: ANALYTICS_KEYS.metrics,
    queryFn: () => analyticsService.getMetrics(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useRevenueTrend() {
  return useQuery({
    queryKey: ANALYTICS_KEYS.revenueTrend,
    queryFn: () => analyticsService.getRevenueTrend(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useOrderStatus() {
  return useQuery({
    queryKey: ANALYTICS_KEYS.orderStatus,
    queryFn: () => analyticsService.getOrderStatus(),
    staleTime: 1000 * 60 * 5,
  });
}

