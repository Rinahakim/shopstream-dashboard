// Auth Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthError {
  error: string;
}

// Analytics Types
export interface Metrics {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  totalProducts: number;
}

export interface RevenueTrendItem {
  date: string;
  revenue: number;
  orders: number;
}

export interface OrderStatusItem {
  status: OrderStatus;
  count: number;
}

// Order Types
export type OrderStatus = 'Processed' | 'In Delivery' | 'Delivered';

export interface Order {
  id: string;
  customerName: string;
  product: string;
  quantity: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  createdAt: string;
}

// API Types
export interface ApiError {
  error: string;
  status?: number;
}

