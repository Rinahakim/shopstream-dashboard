import { Hono } from 'hono';
import { loginHandler } from '../controllers/auth.controller';

const auth = new Hono();

auth.post('/login', loginHandler);

export default auth;