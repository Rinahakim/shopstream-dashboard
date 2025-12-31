import type { Context, Next } from 'hono';
import { logger } from '../utils/logger';

export async function loggerMiddleware(c: Context, next: Next) {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    logger.request(c.req.method, c.req.path, c.res.status, ms);
}



