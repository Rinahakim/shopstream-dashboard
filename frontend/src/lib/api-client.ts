import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { logger } from './logger';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const TOKEN_KEY = 'shopstream_token';

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
};

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

  // Request interceptor - add auth token
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      logger.debug(`API Request: ${config.method?.toUpperCase()} ${config.url}`, 'API');
      return config;
    },
    (error: AxiosError) => {
      logger.error('Request interceptor error', 'API', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor - handle errors
  client.interceptors.response.use(
    (response) => {
      logger.debug(`API Response: ${response.status} ${response.config.url}`, 'API');
      return response;
    },
    (error: AxiosError) => {
      const status = error.response?.status;
      const url = error.config?.url;

      logger.error(`API Error: ${status} ${url}`, 'API', error.response?.data);

      // Handle 401 - unauthorized
      if (status === 401) {
        removeToken();
        if (typeof window !== 'undefined' && !url?.includes('/auth/login')) {
          window.location.href = '/login';
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createApiClient();

