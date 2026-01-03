import Product from '../models/product.model';

/**
 * Service handling product-related business logic.
 */
export class ProductsService {
    /**
     * Retrieve all products.
     * @returns Array of products sorted alphabetically by name (A-Z)
     */
    async getProducts() {
        const products = await Product.find()
            .sort({ name: 1 }) // Alphabetical order
            .lean();           // Return plain JS objects (faster)

        // Transform to API response format
        return products.map(product => ({
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            cost: product.cost,
            stock: product.stock,
            createdAt: product.createdAt,
        }));
    }
}
