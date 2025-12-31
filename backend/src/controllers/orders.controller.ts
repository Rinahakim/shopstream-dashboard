import type { Context } from 'hono';
import { OrdersService } from '../services/orders.service';
import { logger } from '../utils/logger';

type OrderStatus = 'Processed' | 'In Delivery' | 'Delivered';

const ordersService = new OrdersService();
const VALID_STATUSES = ['Processed', 'In Delivery', 'Delivered'];

export const getOrders = async (c: Context) => {
    try {
        const status = c.req.query('status') as OrderStatus | undefined;

        if (status && !VALID_STATUSES.includes(status)) {
            logger.error(`Orders failed: Invalid status filter | status: ${status}`);
            return c.json({ error: 'Invalid status. Must be: Processed, In Delivery, or Delivered' }, 400);
        }

        const orders = await ordersService.getOrders(status);
        return c.json(orders);
    } catch (err) {
        const message = (err as Error).message;
        logger.error(`Orders failed: ${message}`);
        return c.json({ error: message }, 500);
    }
};
