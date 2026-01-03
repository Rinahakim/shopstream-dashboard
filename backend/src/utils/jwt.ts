import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';

/** JWT secret key - should be set via JWT_SECRET env variable */
const SECRET = process.env.JWT_SECRET || 'supersecret';

/**
 * Generate a signed JWT token.
 * @param payload - Data to encode in the token (e.g., { userId })
 * @param expiresIn - Token expiration time (default: '1h')
 * @returns Signed JWT string
 */
export function signToken(payload: object, expiresIn: SignOptions['expiresIn'] = '1h') {
    return jwt.sign(payload as jwt.JwtPayload, SECRET, { expiresIn });
}

/**
 * Verify and decode a JWT token.
 * @param token - JWT string to verify
 * @returns Decoded payload if valid
 * @throws Error if token is invalid or expired
 */
export function verifyToken(token: string) {
    return jwt.verify(token, SECRET);
}
