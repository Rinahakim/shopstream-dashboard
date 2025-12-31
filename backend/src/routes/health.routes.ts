import { Hono } from 'hono';
import mongoose from 'mongoose';

const health = new Hono();

health.get('/', (c) => c.text('Welcome to ShopStream API'));

health.get('/health', async (c) => {
    try {
        const state = mongoose.connection.readyState;
        const isConnected = state === 1;
        return c.json({ 
            status: isConnected ? 'OK' : 'ERROR', 
            db: isConnected ? 'connected' : 'disconnected' 
        });
    } catch (err) {
        return c.json({
            status: 'ERROR',
            db: 'disconnected',
            error: err instanceof Error ? err.message : String(err),
        }, 500);
    }
});

export default health;
