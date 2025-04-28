// src/services/providerService.jsx
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get provider profile
export const getProviderProfile = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.get(`${API_URL}/providers/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, profile: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch provider profile'
    };
  }
};

// Update provider profile
export const updateProviderProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.put(`${API_URL}/providers/profile`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Update stored provider data
    localStorage.setItem('providerData', JSON.stringify(response.data));
    
    return { success: true, profile: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to update profile'
    };
  }
};

// Get provider services
export const getProviderServices = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.get(`${API_URL}/providers/services`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, services: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch services'
    };
  }
};

// Add a new service
export const addService = async (serviceData) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.post(`${API_URL}/providers/services`, serviceData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, service: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to add service'
    };
  }
};

// Update a service
export const updateService = async (serviceId, serviceData) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.put(`${API_URL}/providers/services/${serviceId}`, serviceData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, service: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to update service'
    };
  }
};

// Delete a service
export const deleteService = async (serviceId) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    await axios.delete(`${API_URL}/providers/services/${serviceId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to delete service'
    };
  }
};

// Get provider earnings
export const getProviderEarnings = async (period = 'month') => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.get(`${API_URL}/providers/earnings?period=${period}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, earnings: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch earnings'
    };
  }
};

// Get provider reviews
export const getProviderReviews = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.get(`${API_URL}/providers/reviews`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, reviews: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch reviews'
    };
  }
};

// Update availability schedule
export const updateAvailability = async (availabilityData) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.put(`${API_URL}/providers/availability`, availabilityData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, availability: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to update availability'
    };
  }
};

// Get dashboard statistics
export const getProviderStats = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.get(`${API_URL}/providers/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, stats: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch statistics'
    };
  }
};

export default {
  getProviderProfile,
  updateProviderProfile,
  getProviderServices,
  addService,
  updateService,
  deleteService,
  getProviderEarnings,
  getProviderReviews,
  updateAvailability,
  getProviderStats
};