import 'dotenv/config';
import { serve } from '@hono/node-server';
import { connectMongo } from './config/db';
import { logger } from './utils/logger';
import app from './index';

const PORT = Number(process.env.PORT) || 8787; // prase to num because serve func is server function that needs a number not a string 

async function main() {
    await connectMongo();
    //serve- serve is a server function that listens for incoming requests and forwards them to the Hono app
    serve({ 
        fetch: app.fetch,
        port: PORT,
    });

    logger.info(`Server running on http://localhost:${PORT}`);
}

main().catch((err) => logger.error('Server failed to start:', err));
