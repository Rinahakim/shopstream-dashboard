import Order from '../models/order.model';
import Product from '../models/product.model';

/** Timezone for date aggregations - ensures consistent date grouping */
const TIMEZONE = 'Asia/Jerusalem';

/**
 * Service handling all analytics-related business logic.
 * Provides metrics, revenue trends, and order status distribution.
 */
export class AnalyticsService {
    /**
     * Get key dashboard metrics.
     * @returns Object containing totalRevenue, totalOrders, avgOrderValue, totalProducts
     */
    async getMetrics() {
        // Run all queries in parallel for better performance
        const [totalRevenue, totalOrders, totalProducts] = await Promise.all([
            Order.aggregate([
                { $group: { _id: null, total: { $sum: '$totalAmount' } } }
            ]),
            Order.countDocuments(),
            Product.countDocuments(),
        ]);

        const revenue = totalRevenue[0]?.total || 0;
        const avgOrderValue = totalOrders > 0 ? revenue / totalOrders : 0;

        return {
            totalRevenue: revenue,
            totalOrders,
            avgOrderValue: Math.round(avgOrderValue * 100) / 100, // Round to 2 decimals
            totalProducts,
        };
    }

    /**
     * Get revenue trend for the last 7 days.
     * Groups orders by date and sums revenue per day.
     * @returns Array of { date, revenue, orders } for each of the last 7 days
     */
    async getRevenueTrend() {
        // Calculate date range: last 7 days starting at midnight
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        // Aggregate orders by date, using timezone-aware date formatting
        const result = await Order.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: {
                        $dateToString: { 
                            format: '%Y-%m-%d', 
                            date: '$createdAt',
                            timezone: TIMEZONE // Ensures correct day grouping
                        }
                    },
                    revenue: { $sum: '$totalAmount' },
                    orders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } },
            { $project: { date: '$_id', revenue: 1, orders: 1, _id: 0 } }
        ]);

        // Fill in missing days with zero revenue (days with no orders)
        const days: { date: string; revenue: number; orders: number }[] = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toLocaleDateString('en-CA'); // YYYY-MM-DD format
            const existing = result.find((r) => r.date === dateStr);
            days.push({
                date: dateStr,
                revenue: existing?.revenue || 0,
                orders: existing?.orders || 0,
            });
        }

        return days;
    }

    /**
     * Get distribution of orders by status.
     * @returns Array of { status, count } for each order status
     */
    async getOrderStatusDistribution() {
        const result = await Order.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            },
            { $project: { status: '$_id', count: 1, _id: 0 } }
        ]);

        // Ensure all statuses are represented (even if count is 0)
        const statuses = ['Processed', 'In Delivery', 'Delivered'];
        return statuses.map(status => {
            const found = result.find(r => r.status === status);
            return { status, count: found?.count || 0 };
        });
    }
}
