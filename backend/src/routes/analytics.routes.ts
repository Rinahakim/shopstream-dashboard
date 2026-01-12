import { Hono } from 'hono';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getMetrics, getRevenueTrend, getOrderStatusDistribution } from '../controllers/analytics.controller';

const analytics = new Hono();

analytics.use('*', authMiddleware); // apply auth middleware to all routes in this file

analytics.get('/metrics', getMetrics);
analytics.get('/revenue-trend', getRevenueTrend);
analytics.get('/order-status', getOrderStatusDistribution);

export default analytics;

