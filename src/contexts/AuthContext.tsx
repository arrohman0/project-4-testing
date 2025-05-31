import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/User';
import { api } from '../utils/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  clearError: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Check if token exists on load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Verify token and get user data
          const response = await api.get('/auth/me');
          setUser(response.data);
        } catch (err) {
          // Token invalid, remove it
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/login', { email, password });
      
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setError(null);
      
      // Redirect to home page after login
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/register', userData);
      
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setError(null);
      
      // Redirect to profile edit page to complete profile
      navigate('/profile/edit');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };
  
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error, 
        login, 
        register, 
        logout, 
        isAuthenticated: !!user, 
        clearError 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};