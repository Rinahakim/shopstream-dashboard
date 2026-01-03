/**
 * Hono Application Configuration
 * 
 * This file sets up the Hono app instance with:
 * - Global middlewares (logger, CORS)
 * - Route registrations
 * 
 * The app is exported and consumed by server.ts
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { loggerMiddleware } from './middlewares/logger.middleware';
import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import analyticsRoutes from './routes/analytics.routes';
import ordersRoutes from './routes/orders.routes';
import productsRoutes from './routes/products.routes';

const app = new Hono();

// ============================================
// MIDDLEWARES (applied to all routes)
// ============================================

/** Request/response logger - only active in development */
app.use('*', loggerMiddleware);

/** CORS - allows frontend (port 3001) to make requests */
app.use('*', cors({
    origin: ['http://localhost:3001'],
    credentials: true,
}));

// ============================================
// ROUTES
// ============================================

app.route('/', healthRoutes);           // GET /health
app.route('/auth', authRoutes);         // POST /auth/login
app.route('/analytics', analyticsRoutes); // GET /analytics/*
app.route('/orders', ordersRoutes);     // GET /orders
app.route('/products', productsRoutes); // GET /products

export default app;
