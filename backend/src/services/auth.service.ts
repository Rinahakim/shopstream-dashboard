import User from '../models/user.model';
import { verifyPassword } from '../utils/hash';
import { signToken } from '../utils/jwt';

/**
 * Service handling user authentication.
 */
export class AuthService {
    /**
     * Authenticate user and generate JWT token.
     * @param username - User's username
     * @param password - User's plain-text password
     * @returns Object containing JWT token
     * @throws Error if user not found or password invalid
     */
    async login(username: string, password: string) {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) throw new Error('User not found');

        // Verify password against stored hash
        const isValid = await verifyPassword(password, user.hashedPassword);
        if (!isValid) throw new Error('Invalid credentials');

        // Generate JWT with user ID as payload
        const token = signToken({ userId: user._id });
        return { token };
    }
}
