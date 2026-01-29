const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, ...fetchOptions } = options;

    let url = `${this.baseUrl}${endpoint}`;
    
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      credentials: 'include',
    });

    if (response.status === 401) {
      this.setToken(null);
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient(API_BASE_URL);

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ access_token: string; user: User; permissions: string[] }>('/auth/login', { email, password }),
  
  verify2FA: (userId: number, code: string) =>
    api.post<{ access_token: string; user: User }>('/auth/2fa/verify', { user_id: userId, code }),
  
  logout: () => api.post('/auth/logout'),
  
  me: () => api.get<{ user: User; permissions: string[] }>('/auth/me'),
  
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, email: string, password: string, password_confirmation: string) =>
    api.post('/auth/reset-password', { token, email, password, password_confirmation }),
};

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  status: 'active' | 'inactive' | 'suspended';
  role_id: number | null;
  branch_id: number | null;
  role?: Role;
  branch?: Branch;
  client?: Client;
  rider?: Rider;
  created_at: string;
  last_login_at: string | null;
}

export interface Role {
  id: number;
  name: string;
  display_name: string;
  permissions: string[];
}

export interface Branch {
  id: number;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  country: string;
  type: string;
  is_active: boolean;
}

export interface Warehouse {
  id: number;
  branch_id: number;
  name: string;
  code: string;
  address: string;
  capacity_sqft: number | null;
  used_capacity_sqft: number;
  type: string;
  is_active: boolean;
  branch?: Branch;
}

export interface Client {
  id: number;
  user_id: number;
  company_name: string;
  business_type: string | null;
  wallet_balance: number;
  credit_limit: number;
  billing_cycle: string;
  is_verified: boolean;
  is_active: boolean;
}

export interface Rider {
  id: number;
  user_id: number;
  vehicle_type: string;
  vehicle_plate: string | null;
  availability: 'available' | 'busy' | 'offline';
  rating: number;
  total_deliveries: number;
  successful_deliveries: number;
  wallet_balance: number;
  is_active: boolean;
}

export interface InventoryItem {
  id: number;
  client_id: number;
  warehouse_id: number;
  sku: string;
  name: string;
  description: string | null;
  barcode: string | null;
  quantity: number;
  reserved_quantity: number;
  weight_kg: number | null;
  declared_value: number;
  status: string;
  condition: string;
  expiry_date: string | null;
  client?: Client;
  warehouse?: Warehouse;
}

export interface Waybill {
  id: number;
  waybill_number: string;
  client_id: number;
  branch_id: number;
  sender_name: string;
  sender_phone: string;
  sender_address: string;
  sender_city: string;
  receiver_name: string;
  receiver_phone: string;
  receiver_address: string;
  receiver_city: string;
  total_items: number;
  total_weight_kg: number;
  declared_value: number;
  total_amount: number;
  payment_status: 'unpaid' | 'partial' | 'paid';
  service_type: 'standard' | 'express' | 'same_day' | 'next_day';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: string;
  created_at: string;
  estimated_delivery_at: string | null;
  client?: Client;
  branch?: Branch;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
