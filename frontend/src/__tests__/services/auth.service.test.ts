import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '@/services/auth.service';
import { apiClient, setToken, removeToken, getToken } from '@/lib/api-client';

// Mock the api-client module
vi.mock('@/lib/api-client', () => ({
  apiClient: {
    post: vi.fn(),
  },
  setToken: vi.fn(),
  removeToken: vi.fn(),
  getToken: vi.fn(),
}));

// Mock the logger
vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should login successfully and store token', async () => {
      const mockToken = 'mock-jwt-token';
      const mockResponse = { data: { token: mockToken } };
      
      vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse);

      const result = await authService.login({
        username: 'admin',
        password: 'admin123',
      });

      expect(apiClient.post).toHaveBeenCalledWith('/auth/login', {
        username: 'admin',
        password: 'admin123',
      });
      expect(setToken).toHaveBeenCalledWith(mockToken);
      expect(result.token).toBe(mockToken);
    });

    it('should throw error on failed login', async () => {
      const error = new Error('Invalid credentials');
      vi.mocked(apiClient.post).mockRejectedValueOnce(error);

      await expect(
        authService.login({ username: 'wrong', password: 'wrong' })
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('logout', () => {
    it('should remove token on logout', () => {
      authService.logout();
      expect(removeToken).toHaveBeenCalled();
    });
  });

  describe('isAuthenticated', () => {
    it('should return false when no token exists', () => {
      vi.mocked(getToken).mockReturnValueOnce(null);
      expect(authService.isAuthenticated()).toBe(false);
    });

    it('should return true for valid non-expired token', () => {
      // Create a valid JWT with future expiration
      const payload = { exp: Math.floor(Date.now() / 1000) + 3600 }; // 1 hour from now
      const mockToken = `header.${btoa(JSON.stringify(payload))}.signature`;
      
      vi.mocked(getToken).mockReturnValueOnce(mockToken);
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('should return false for expired token', () => {
      // Create a JWT with past expiration
      const payload = { exp: Math.floor(Date.now() / 1000) - 3600 }; // 1 hour ago
      const mockToken = `header.${btoa(JSON.stringify(payload))}.signature`;
      
      vi.mocked(getToken).mockReturnValueOnce(mockToken);
      expect(authService.isAuthenticated()).toBe(false);
      expect(removeToken).toHaveBeenCalled();
    });

    it('should return false for invalid token format', () => {
      vi.mocked(getToken).mockReturnValueOnce('invalid-token');
      expect(authService.isAuthenticated()).toBe(false);
      expect(removeToken).toHaveBeenCalled();
    });
  });

  describe('getToken', () => {
    it('should return token from storage', () => {
      const mockToken = 'stored-token';
      vi.mocked(getToken).mockReturnValueOnce(mockToken);
      expect(authService.getToken()).toBe(mockToken);
    });
  });
});

