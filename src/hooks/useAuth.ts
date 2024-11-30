import { useState, useCallback } from 'react';
import { AuthState } from '../types/auth';
import { mockUser } from '../services/mockData';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>(initialState);

  const handleAuthSuccess = useCallback(async () => {
    try {
      setAuth(prev => ({ ...prev, loading: true, error: null }));
      
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAuth({
        isAuthenticated: true,
        user: mockUser,
        accessToken: 'demo-token',
        loading: false,
        error: null,
      });

      sessionStorage.setItem('email_sanitizer_token', 'demo-token');
    } catch (error) {
      console.error('Authentication error:', error);
      setAuth(prev => ({
        ...initialState,
        error: 'Failed to authenticate. Please try again.',
      }));
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('email_sanitizer_token');
    setAuth(initialState);
  }, []);

  return {
    auth,
    handleAuthSuccess,
    logout,
  };
};