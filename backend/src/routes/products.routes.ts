import { Hono } from 'hono';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getProducts } from '../controllers/products.controller';

const products = new Hono();

products.use('*', authMiddleware);

products.get('/', getProducts);

export default products;

