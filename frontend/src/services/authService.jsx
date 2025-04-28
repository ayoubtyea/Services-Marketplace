// src/services/authService.jsx
import axios from 'axios';

// For React apps using Vite, use import.meta.env instead of process.env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    const { token, user } = response.data;
    
    // Store token and user data in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(user));
    
    // Configure axios header for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    return { success: true, user };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Login failed. Please check your credentials.'
    };
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    const { token, user } = response.data;
    
    // Store token and user data in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(user));
    
    // Configure axios header for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    return { success: true, user };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Registration failed. Please try again.'
    };
  }
};

export const logout = () => {
  // Remove stored data
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  
  // Remove authorization header
  delete axios.defaults.headers.common['Authorization'];
  
  return { success: true };
};

export const validateToken = async () => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      return { valid: false };
    }
    
    // Configure axios header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    const response = await axios.get(`${API_URL}/auth/validate-token`);
    return { valid: true, user: response.data.user };
  } catch (error) {
    // Clear invalid token
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    delete axios.defaults.headers.common['Authorization'];
    
    return { valid: false, error: error.response?.data?.message || 'Invalid token' };
  }
};

export const updateProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.put(`${API_URL}/users/profile`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Update stored user data
    localStorage.setItem('userData', JSON.stringify(response.data.user));
    
    return { success: true, user: response.data.user };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to update profile'
    };
  }
};

export const changePassword = async (passwordData) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.put(`${API_URL}/users/change-password`, passwordData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, message: response.data.message };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to change password'
    };
  }
};

// Set up axios interceptor to handle token expiration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      delete axios.defaults.headers.common['Authorization'];
      window.location.href = '/auth'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

// Initialize auth header if token exists
const token = localStorage.getItem('authToken');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default {
  login,
  register,
  logout,
  validateToken,
  updateProfile,
  changePassword
};