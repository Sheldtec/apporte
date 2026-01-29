'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api, authApi, User } from '@/lib/api/client';

interface AuthContextType {
  user: User | null;
  permissions: string[];
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ requires2FA?: boolean; userId?: number }>;
  verify2FA: (userId: number, code: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = api.getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await authApi.me();
      setUser(response.user);
      setPermissions(response.permissions || []);
    } catch {
      api.setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    
    if ('requires_2fa' in response && response.requires_2fa) {
      return { requires2FA: true, userId: (response as { user_id: number }).user_id };
    }

    api.setToken(response.access_token);
    setUser(response.user);
    setPermissions(response.permissions || []);
    return {};
  };

  const verify2FA = async (userId: number, code: string) => {
    const response = await authApi.verify2FA(userId, code);
    api.setToken(response.access_token);
    setUser(response.user);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore logout errors
    }
    api.setToken(null);
    setUser(null);
    setPermissions([]);
  };

  const hasPermission = (permission: string) => {
    if (user?.role?.name === 'super_admin') return true;
    return permissions.includes(permission);
  };

  const hasRole = (role: string) => {
    if (!user?.role) return false;
    if (user.role.name === 'super_admin') return true;
    return user.role.name === role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        permissions,
        isLoading,
        isAuthenticated: !!user,
        login,
        verify2FA,
        logout,
        hasPermission,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
