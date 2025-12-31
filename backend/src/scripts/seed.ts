import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/user.model';
import Product from '../models/product.model';
import Order from '../models/order.model';
import { hashPassword } from '../utils/hash';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'shopstream';

const products = [
    { name: 'Wireless Headphones', description: 'Bluetooth over-ear headphones', price: 149.99, cost: 75, stock: 45 },
    { name: 'Smart Watch Pro', description: 'Fitness tracking smartwatch', price: 299.99, cost: 150, stock: 30 },
    { name: 'USB-C Hub', description: '7-in-1 USB-C adapter', price: 49.99, cost: 20, stock: 100 },
    { name: 'Mechanical Keyboard', description: 'RGB gaming keyboard', price: 129.99, cost: 65, stock: 60 },
    { name: 'Portable Charger', description: '20000mAh power bank', price: 39.99, cost: 18, stock: 80 },
    { name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 59.99, cost: 25, stock: 70 },
    { name: 'Monitor Stand', description: 'Adjustable monitor riser', price: 79.99, cost: 35, stock: 40 },
    { name: 'Webcam HD', description: '1080p webcam with mic', price: 89.99, cost: 40, stock: 55 },
];

const customerNames = [
    'Alice Johnson', 'Bob Smith', 'Carol White', 'David Brown', 
    'Emma Davis', 'Frank Miller', 'Grace Wilson', 'Henry Taylor',
    'Ivy Anderson', 'Jack Thomas', 'Kate Martinez', 'Leo Garcia'
];

const statuses: Array<'Processed' | 'In Delivery' | 'Delivered'> = ['Processed', 'In Delivery', 'Delivered'];

function randomDate(daysBack: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    return date;
}

async function seed() {
    await mongoose.connect(MONGO_URI, { dbName: MONGO_DB_NAME });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
        User.deleteMany({}),
        Product.deleteMany({}),
        Order.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // Create admin user
    const hashedPassword = await hashPassword('admin123');
    await User.create({
        username: 'admin',
        hashedPassword,
    });
    console.log('Created admin user (username: admin, password: admin123)');

    // Create products
    const createdProducts = await Product.insertMany(products);
    console.log(`Created ${createdProducts.length} products`);

    // Create orders (50 orders over the last 10 days)
    const orders = [];
    for (let i = 0; i < 50; i++) {
        const product = createdProducts[Math.floor(Math.random() * createdProducts.length)];
        const quantity = Math.floor(Math.random() * 3) + 1;
        orders.push({
            customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
            productId: product._id,
            quantity,
            totalAmount: product.price * quantity,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            createdAt: randomDate(10),
        });
    }
    await Order.insertMany(orders);
    console.log(`Created ${orders.length} orders`);

    await mongoose.disconnect();
    console.log('Seed completed successfully!');
}

seed().catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
});

