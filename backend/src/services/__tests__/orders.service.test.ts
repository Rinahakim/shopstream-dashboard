import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrdersService } from '../orders.service';
import Order from '../../models/order.model';

vi.mock('../../models/order.model');

describe('OrdersService', () => {
    let ordersService: OrdersService;

    beforeEach(() => {
        ordersService = new OrdersService();
        vi.clearAllMocks();
    });

    it('should return all orders when no filter is provided', async () => {
        const mockOrders = [
            {
                _id: 'order1',
                customerName: 'Alice',
                productId: { name: 'Product A' },
                quantity: 2,
                totalAmount: 100,
                status: 'Processed',
                createdAt: new Date('2024-01-01'),
            },
        ];

        const mockQuery = {
            populate: vi.fn().mockReturnThis(),
            sort: vi.fn().mockReturnThis(),
            lean: vi.fn().mockResolvedValue(mockOrders),
        };

        vi.mocked(Order.find).mockReturnValue(mockQuery as any);

        const orders = await ordersService.getOrders();

        expect(Order.find).toHaveBeenCalledWith({});
        expect(orders).toHaveLength(1);
        expect(orders[0]).toEqual({
            id: 'order1',
            customerName: 'Alice',
            product: 'Product A',
            quantity: 2,
            totalAmount: 100,
            status: 'Processed',
            createdAt: new Date('2024-01-01'),
        });
    });

    it('should filter orders by status', async () => {
        const mockQuery = {
            populate: vi.fn().mockReturnThis(),
            sort: vi.fn().mockReturnThis(),
            lean: vi.fn().mockResolvedValue([]),
        };

        vi.mocked(Order.find).mockReturnValue(mockQuery as any);

        await ordersService.getOrders('Delivered');

        expect(Order.find).toHaveBeenCalledWith({ status: 'Delivered' });
    });

    it('should handle orders with missing product reference', async () => {
        const mockOrders = [
            {
                _id: 'order1',
                customerName: 'Bob',
                productId: null,
                quantity: 1,
                totalAmount: 50,
                status: 'In Delivery',
                createdAt: new Date(),
            },
        ];

        const mockQuery = {
            populate: vi.fn().mockReturnThis(),
            sort: vi.fn().mockReturnThis(),
            lean: vi.fn().mockResolvedValue(mockOrders),
        };

        vi.mocked(Order.find).mockReturnValue(mockQuery as any);

        const orders = await ordersService.getOrders();

        expect(orders[0].product).toBe('Unknown');
    });
});

