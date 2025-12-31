import type { Context, Next } from 'hono';
import { verifyToken } from '../utils/jwt';
import { logger } from '../utils/logger';

export async function authMiddleware(c: Context, next: Next) {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        logger.error(`Auth failed: Missing token | ${c.req.method} ${c.req.path}`);
        return c.json({ error: 'Missing or invalid Authorization header' }, 401);
    }

    const token = authHeader.substring(7);

    try {
        const payload = verifyToken(token);
        c.set('user', payload);
        await next();
    } catch {
        logger.error(`Auth failed: Invalid/expired token | ${c.req.method} ${c.req.path}`);
        return c.json({ error: 'Invalid or expired token' }, 401);
    }
}
