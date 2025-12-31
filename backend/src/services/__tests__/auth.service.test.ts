import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '../auth.service';
import User from '../../models/user.model';
import * as hashUtils from '../../utils/hash';
import * as jwtUtils from '../../utils/jwt';

vi.mock('../../models/user.model');
vi.mock('../../utils/hash');
vi.mock('../../utils/jwt');

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();
        vi.clearAllMocks();
    });

    it('should return a token for valid credentials', async () => {
        const mockUser = {
            _id: 'user123',
            username: 'testuser',
            hashedPassword: 'hashedpass',
        };

        vi.mocked(User.findOne).mockResolvedValue(mockUser as any);
        vi.mocked(hashUtils.verifyPassword).mockResolvedValue(true);
        vi.mocked(jwtUtils.signToken).mockReturnValue('mock-jwt-token');

        const result = await authService.login('testuser', 'password123');

        expect(result).toEqual({ token: 'mock-jwt-token' });
        expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
        expect(hashUtils.verifyPassword).toHaveBeenCalledWith('password123', 'hashedpass');
    });

    it('should throw error for non-existent user', async () => {
        vi.mocked(User.findOne).mockResolvedValue(null);

        await expect(authService.login('unknown', 'password'))
            .rejects.toThrow('User not found');
    });

    it('should throw error for invalid password', async () => {
        const mockUser = {
            _id: 'user123',
            username: 'testuser',
            hashedPassword: 'hashedpass',
        };

        vi.mocked(User.findOne).mockResolvedValue(mockUser as any);
        vi.mocked(hashUtils.verifyPassword).mockResolvedValue(false);

        await expect(authService.login('testuser', 'wrongpassword'))
            .rejects.toThrow('Invalid credentials');
    });
});

