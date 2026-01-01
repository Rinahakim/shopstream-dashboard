import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export function signToken(payload: object, expiresIn: SignOptions['expiresIn'] = '1h') {
    return jwt.sign(payload as jwt.JwtPayload, SECRET, { expiresIn });
}

export function verifyToken(token: string) {
    return jwt.verify(token, SECRET);
}
