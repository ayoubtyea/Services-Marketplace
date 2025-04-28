import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Add this import


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      const userData = JSON.parse(localStorage.getItem('userData') || null);
  
      if (token && userData) {
        try {
          const response = await axios.get('/api/auth/validate-token', {
            headers: { Authorization: `Bearer ${token}` }
          });
  
          if (response.data.valid) {
            setAuthState({
              user: userData,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
          } else {
            clearAuthData();
          }
        } catch (error) {
          console.error('Token validation error:', error);
          clearAuthData();
        }
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };
  
    initializeAuth();
  }, []);
  

  const clearAuthData = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  const login = async (credentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await axios.post('/api/auth/login', credentials);
      
      const { token, user } = response.data;
      if (!token || !user?.role) throw new Error('Invalid response from server');
      
      // Verify token before storing
      const isValid = await validateToken(token);
      if (!isValid) throw new Error('Invalid token');
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      
      return { success: true };
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMsg
      }));
      return { success: false, error: errorMsg };
    }
  };

  const logout = () => {
    clearAuthData();
    // Navigation should be handled in components where Router is available
  };

  const getDashboardPath = () => {
    if (!authState.user?.role) {
      console.error('No user role available', authState.user);
      return '/';
    }

    switch(authState.user.role) {
      case 'admin': return '/admin-dashboard';
      case 'provider': return '/provider-dashboard';
      case 'client': return '/client-dashboard';
      default:
        console.warn('Unknown role:', authState.user.role);
        return '/';
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      getDashboardPath
    }}>
      {!authState.isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};