import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export async function connectMongo() {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('Missing MONGO_URI in .env');

    await mongoose.connect(uri, {
        dbName: process.env.MONGO_DB_NAME || 'shopstream',
    });

    logger.info('MongoDB connected via Mongoose');
}
