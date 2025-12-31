import Order from '../models/order.model';
import Product from '../models/product.model';

// Israel timezone (or use process.env.TZ)
const TIMEZONE = 'Asia/Jerusalem';

export class AnalyticsService {
    async getMetrics() {
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
            avgOrderValue: Math.round(avgOrderValue * 100) / 100,
            totalProducts,
        };
    }

    async getRevenueTrend() {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const result = await Order.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: {
                        $dateToString: { 
                            format: '%Y-%m-%d', 
                            date: '$createdAt',
                            timezone: TIMEZONE
                        }
                    },
                    revenue: { $sum: '$totalAmount' },
                    orders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } },
            { $project: { date: '$_id', revenue: 1, orders: 1, _id: 0 } }
        ]);

        // Fill in missing days with zero revenue (using local timezone)
        const days: { date: string; revenue: number; orders: number }[] = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            // Format date in local timezone
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

        // Ensure all statuses are represented
        const statuses = ['Processed', 'In Delivery', 'Delivered'];
        return statuses.map(status => {
            const found = result.find(r => r.status === status);
            return { status, count: found?.count || 0 };
        });
    }
}
