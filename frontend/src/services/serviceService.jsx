// src/services/serviceService.jsx
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get all available services
export const getAllServices = async (category = '') => {
  try {
    const url = category ? `${API_URL}/services?category=${category}` : `${API_URL}/services`;
    const response = await axios.get(url);
    return { success: true, services: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch services'
    };
  }
};

// Get service details by ID
export const getServiceById = async (serviceId) => {
  try {
    const response = await axios.get(`${API_URL}/services/${serviceId}`);
    return { success: true, service: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch service details'
    };
  }
};

// Search for services
export const searchServices = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/services/search?q=${query}`);
    return { success: true, services: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to search services'
    };
  }
};

// Get service categories
export const getServiceCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/services/categories`);
    return { success: true, categories: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch service categories'
    };
  }
};

// Admin: Get pending service approvals
export const getPendingServices = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    const response = await axios.get(`${API_URL}/admin/services/pending`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { success: true, services: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch pending services'
    };
  }
};

// Admin: Approve a service
export const approveService = async (serviceId) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    const response = await axios.post(`${API_URL}/admin/services/${serviceId}/approve`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { success: true, service: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to approve service'
    };
  }
};

// Admin: Reject a service
export const rejectService = async (serviceId, reason) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    const response = await axios.post(`${API_URL}/admin/services/${serviceId}/reject`, { reason }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { success: true, service: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to reject service'
    };
  }
};

export default {
  getAllServices,
  getServiceById,
  searchServices,
  getServiceCategories,
  getPendingServices,
  approveService,
  rejectService
};