import 'dotenv/config';
import { serve } from '@hono/node-server';
import { connectMongo } from './config/db';
import { logger } from './utils/logger';
import app from './index';

const PORT = Number(process.env.PORT) || 3000;

async function main() {
    await connectMongo();
    
    serve({
        fetch: app.fetch,
        port: PORT,
    });

    logger.info(`Server running on http://localhost:${PORT}`);
}

main().catch((err) => logger.error('Server failed to start:', err));
