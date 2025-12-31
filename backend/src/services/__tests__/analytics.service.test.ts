import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AnalyticsService } from '../analytics.service';
import Order from '../../models/order.model';
import Product from '../../models/product.model';

vi.mock('../../models/order.model');
vi.mock('../../models/product.model');

describe('AnalyticsService', () => {
    let analyticsService: AnalyticsService;

    beforeEach(() => {
        analyticsService = new AnalyticsService();
        vi.clearAllMocks();
    });

    describe('getMetrics', () => {
        it('should return correct metrics', async () => {
            vi.mocked(Order.aggregate).mockResolvedValue([{ total: 5000 }]);
            vi.mocked(Order.countDocuments).mockResolvedValue(50);
            vi.mocked(Product.countDocuments).mockResolvedValue(10);

            const metrics = await analyticsService.getMetrics();

            expect(metrics).toEqual({
                totalRevenue: 5000,
                totalOrders: 50,
                avgOrderValue: 100,
                totalProducts: 10,
            });
        });

        it('should handle zero orders', async () => {
            vi.mocked(Order.aggregate).mockResolvedValue([]);
            vi.mocked(Order.countDocuments).mockResolvedValue(0);
            vi.mocked(Product.countDocuments).mockResolvedValue(5);

            const metrics = await analyticsService.getMetrics();

            expect(metrics).toEqual({
                totalRevenue: 0,
                totalOrders: 0,
                avgOrderValue: 0,
                totalProducts: 5,
            });
        });
    });

    describe('getOrderStatusDistribution', () => {
        it('should return distribution for all statuses', async () => {
            vi.mocked(Order.aggregate).mockResolvedValue([
                { status: 'Processed', count: 10 },
                { status: 'Delivered', count: 25 },
            ]);

            const distribution = await analyticsService.getOrderStatusDistribution();

            expect(distribution).toEqual([
                { status: 'Processed', count: 10 },
                { status: 'In Delivery', count: 0 },
                { status: 'Delivered', count: 25 },
            ]);
        });
    });
});

