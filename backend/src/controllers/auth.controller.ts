import type { Context } from 'hono';
import { AuthService } from '../services/auth.service';
import { logger } from '../utils/logger';

const authService = new AuthService();

export const loginHandler = async (c: Context) => {
    const body = await c.req.json();
    const { username, password } = body;

    if (!username || !password) {
        logger.error(`Login failed: Missing credentials | username: ${username || 'empty'}`);
        return c.json({ error: 'Username and password are required' }, 400);
    }

    try {
        const result = await authService.login(username, password);
        logger.info(`Login success: ${username}`);
        return c.json(result);
    } catch (err) {
        const message = (err as Error).message;
        logger.error(`Login failed: ${message} | username: ${username}`);
        return c.json({ error: message }, 401);
    }
};
