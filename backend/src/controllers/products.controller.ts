import type { Context } from 'hono';
import { ProductsService } from '../services/products.service';
import { logger } from '../utils/logger';

const productsService = new ProductsService();

export const getProducts = async (c: Context) => {
    try {
        const products = await productsService.getProducts();
        return c.json(products);
    } catch (err) {
        const message = (err as Error).message;
        logger.error(`Products failed: ${message}`);
        return c.json({ error: message }, 500);
    }
};
