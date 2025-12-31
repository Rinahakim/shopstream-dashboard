import { apiClient } from '@/lib/api-client';
import { logger } from '@/lib/logger';
import type { Order, OrderStatus } from '@/types';

class OrdersService {
  async getOrders(status?: OrderStatus): Promise<Order[]> {
    logger.debug('Fetching orders', 'OrdersService', { status });
    
    const params = status ? { status } : {};
    const response = await apiClient.get<Order[]>('/orders', { params });
    
    return response.data;
  }
}

export const ordersService = new OrdersService();

