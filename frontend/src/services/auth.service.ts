import { apiClient, setToken, removeToken, getToken } from '@/lib/api-client';
import { logger } from '@/lib/logger';
import type { LoginRequest, LoginResponse } from '@/types';

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    logger.info('Attempting login', 'AuthService', { username: credentials.username });
    
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    const { token } = response.data;
    
    setToken(token);
    logger.info('Login successful', 'AuthService');
    
    return response.data;
  }

  logout(): void {
    logger.info('Logging out', 'AuthService');
    removeToken();
  }

  isAuthenticated(): boolean {
    const token = getToken();
    if (!token) return false;
    
    // Basic JWT expiration check
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isValid = payload.exp * 1000 > Date.now();
      if (!isValid) {
        logger.warn('Token expired', 'AuthService');
        removeToken();
      }
      return isValid;
    } catch {
      logger.error('Invalid token format', 'AuthService');
      removeToken();
      return false;
    }
  }

  getToken(): string | null {
    return getToken();
  }
}

export const authService = new AuthService();

