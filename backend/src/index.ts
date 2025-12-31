import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { loggerMiddleware } from './middlewares/logger.middleware';
import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import analyticsRoutes from './routes/analytics.routes';
import ordersRoutes from './routes/orders.routes';
import productsRoutes from './routes/products.routes';

const app = new Hono();

// Logger middleware (dev only)
app.use('*', loggerMiddleware);

// CORS middleware
app.use('*', cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
}));

// Routes
app.route('/', healthRoutes);
app.route('/auth', authRoutes);
app.route('/analytics', analyticsRoutes);
app.route('/orders', ordersRoutes);
app.route('/products', productsRoutes);

export default app;
