import Product from '../models/product.model';

export class ProductsService {
    async getProducts() {
        const products = await Product.find()
            .sort({ name: 1 })
            .lean();

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

