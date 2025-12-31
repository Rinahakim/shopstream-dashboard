import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export function signToken(payload: object, expiresIn = '1h') {
    return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyToken(token: string) {
    return jwt.verify(token, SECRET);
}

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export async function verifyPassword(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
}