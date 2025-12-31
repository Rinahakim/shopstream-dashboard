import { useQuery } from '@tanstack/react-query';
import { ordersService } from '@/services';
import type { OrderStatus } from '@/types';

export const ORDERS_KEYS = {
  all: ['orders'] as const,
  list: (status?: OrderStatus) => ['orders', { status }] as const,
};

export function useOrders(status?: OrderStatus) {
  return useQuery({
    queryKey: ORDERS_KEYS.list(status),
    queryFn: () => ordersService.getOrders(status),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

