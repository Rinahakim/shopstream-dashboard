import { Hono } from 'hono';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getOrders } from '../controllers/orders.controller';

const orders = new Hono();

orders.use('*', authMiddleware);

orders.get('/', getOrders);

export default orders;

