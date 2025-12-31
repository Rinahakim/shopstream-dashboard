import Order from '../models/order.model';
import type { OrderStatus } from '../models/order.model';

export class OrdersService {
    async getOrders(status?: OrderStatus) {
        const filter = status ? { status } : {};
        
        const orders = await Order.find(filter)
            .populate('productId', 'name')
            .sort({ createdAt: -1 })
            .lean();

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

