const isDev = process.env.NODE_ENV !== 'production';

export const logger = {
    info: (...args: unknown[]) => {
        if (isDev) console.log('[INFO]', ...args);
    },
    error: (...args: unknown[]) => {
        if (isDev) console.error('[ERROR]', ...args);
    },
    debug: (...args: unknown[]) => {
        if (isDev) console.log('[DEBUG]', ...args);
    },
    request: (method: string, path: string, status: number, ms: number) => {
        if (isDev) console.log(`[${method}] ${path} → ${status} (${ms}ms)`);
    },
};



