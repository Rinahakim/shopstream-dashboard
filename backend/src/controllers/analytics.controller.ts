import type { Context } from 'hono';
import { AnalyticsService } from '../services/analytics.service';
import { logger } from '../utils/logger';

const analyticsService = new AnalyticsService();

export const getMetrics = async (c: Context) => {
    try {
        const metrics = await analyticsService.getMetrics();
        return c.json(metrics);
    } catch (err) {
        const message = (err as Error).message;
        logger.error(`Analytics metrics failed: ${message}`);
        return c.json({ error: message }, 500);
    }
};

export const getRevenueTrend = async (c: Context) => {
    try {
        const trend = await analyticsService.getRevenueTrend();
        return c.json(trend);
    } catch (err) {
        const message = (err as Error).message;
        logger.error(`Analytics revenue-trend failed: ${message}`);
        return c.json({ error: message }, 500);
    }
};

export const getOrderStatusDistribution = async (c: Context) => {
    try {
        const distribution = await analyticsService.getOrderStatusDistribution();
        return c.json(distribution);
    } catch (err) {
        const message = (err as Error).message;
        logger.error(`Analytics order-status failed: ${message}`);
        return c.json({ error: message }, 500);
    }
};
