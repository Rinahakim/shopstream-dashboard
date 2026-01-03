import type { Context, Next } from 'hono';
import { verifyToken } from '../utils/jwt';
import { logger } from '../utils/logger';

/**
 * JWT Authentication Middleware.
 * 
 * Validates Bearer token from Authorization header.
 * On success: attaches decoded user payload to context and calls next().
 * On failure: returns 401 Unauthorized response.
 * 
 * @example
 * // Apply to protected routes:
 * app.use('/protected/*', authMiddleware);
 */
export async function authMiddleware(c: Context, next: Next) {
    const authHeader = c.req.header('Authorization');

    // Check for Bearer token format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        logger.error(`Auth failed: Missing token | ${c.req.method} ${c.req.path}`);
        return c.json({ error: 'Missing or invalid Authorization header' }, 401);
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.substring(7);

    try {
        // Verify token and extract payload
        const payload = verifyToken(token);
        c.set('user', payload); // Attach user info to request context
        await next();
    } catch {
        logger.error(`Auth failed: Invalid/expired token | ${c.req.method} ${c.req.path}`);
        return c.json({ error: 'Invalid or expired token' }, 401);
    }
}
