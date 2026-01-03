import Order from '../models/order.model';
import type { OrderStatus } from '../models/order.model';

/**
 * Service handling order-related business logic.
 */
export class OrdersService {
    /**
     * Retrieve orders with optional status filter.
     * @param status - Optional filter: 'Processed' | 'In Delivery' | 'Delivered'
     * @returns Array of orders sorted by creation date (newest first)
     */
    async getOrders(status?: OrderStatus) {
        const filter = status ? { status } : {};
        
        const orders = await Order.find(filter)
            .populate('productId', 'name') // Join product name from Product collection
            .sort({ createdAt: -1 })       // Newest orders first
            .lean();                       // Return plain JS objects (faster)

        // Transform to API response format
        return orders.map(order => ({
            id: order._id,
            customerName: order.customerName,
            product: (order.productId as any)?.name || 'Unknown',
            quantity: order.quantity,
            totalAmount: order.totalAmount,
            status: order.status,
            createdAt: order.createdAt,
        }));
    }
}
