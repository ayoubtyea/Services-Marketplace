// api/providerService.js
import axios from 'axios';
import { 
  getMockProviderData, 
  getMockDashboardStats, 
  getMockUpcomingJobs, 
  getMockProviderFeedback 
} from './mockProviderData';

// Configuration
const CONFIG = {
  // Set to false to use real API by default
  useMockApi: false, 
  
  // Show console logs for API calls
  enableLogging: true,
  
  // Base URL for API calls
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
};

// Logger utility
const logInfo = (...args) => {
  if (CONFIG.enableLogging) console.info('📊 Provider API:', ...args);
};

const logError = (...args) => {
  if (CONFIG.enableLogging) console.error('❌ Provider API Error:', ...args);
};

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: CONFIG.baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to inject auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function to handle API calls with mock fallback
const apiWithMockFallback = async (apiCall, mockDataCall) => {
  // If explicitly using mock API, just return mock data
  if (CONFIG.useMockApi) {
    logInfo('Using mock data for', apiCall.name);
    return mockDataCall();
  }
  
  try {
    // Try real API call
    logInfo('Calling real API for', apiCall.name);
    const response = await apiCall();
    logInfo('Real API response for', apiCall.name, response.data);
    return response.data;
  } catch (error) {
    logError(`${apiCall.name} failed:`, error.message);
    
    // If API call fails, fall back to mock data as a last resort
    logInfo(`Falling back to mock data for ${apiCall.name}`);
    return mockDataCall();
  }
};

// API Functions

// Provider dashboard data
export const fetchProviderData = async () => {
  const apiCall = async () => await apiClient.get('/provider/dashboard');
  return apiWithMockFallback(apiCall, getMockProviderData);
};

// Dashboard statistics
export const fetchDashboardStats = async () => {
  const apiCall = async () => await apiClient.get('/provider/dashboard/stats');
  return apiWithMockFallback(apiCall, getMockDashboardStats);
};

// Upcoming jobs/bookings
export const fetchUpcomingJobs = async () => {
  const apiCall = async () => await apiClient.get('/provider/bookings/upcoming');
  return apiWithMockFallback(apiCall, getMockUpcomingJobs);
};

// Provider feedback/reviews
export const fetchProviderFeedback = async () => {
  const apiCall = async () => await apiClient.get('/provider/reviews');
  return apiWithMockFallback(apiCall, getMockProviderFeedback);
};

// Fetch all bookings with optional status filter
export const fetchBookings = async (status = null) => {
  const url = status ? `/provider/bookings?status=${status}` : '/provider/bookings';
  
  const apiCall = async () => await apiClient.get(url);
  
  try {
    logInfo('Fetching bookings with status:', status || 'all');
    const response = await apiCall();
    return response.data;
  } catch (error) {
    logError('Fetch bookings error:', error);
    // Fall back to mock data as a last resort
    return {
      success: true,
      bookings: [...getMockUpcomingJobs().upcomingJobs]
    };
  }
};

// Update booking status
export const updateBookingStatus = async (bookingId, status) => {
  try {
    logInfo('Updating booking status:', bookingId, status);
    const response = await apiClient.put(`/provider/bookings/${bookingId}/status`, { status });
    return response.data;
  } catch (error) {
    logError('Update booking status error:', error);
    throw error; // Let the caller handle this error instead of falling back to mock
  }
};

// Get provider services
export const fetchServices = async (status = null) => {
  try {
    const url = status ? `/provider/services?status=${status}` : '/provider/services';
    logInfo('Fetching services with status:', status || 'all');
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    logError('Fetch services error:', error);
    throw error; // Let the caller handle this error
  }
};

// Add new service
export const addService = async (serviceData) => {
  try {
    logInfo('Adding new service:', serviceData.name);
    const response = await apiClient.post('/provider/services', serviceData);
    return response.data;
  } catch (error) {
    logError('Add service error:', error);
    throw error; // Let the caller handle this error
  }
};

// Error handler utility
export const handleApiError = (error) => {
  logError('API Error:', error);
  const message = error.response?.data?.message || error.message || 'An error occurred';
  return { success: false, message };
};

// Toggle mock API mode
export const toggleMockApiMode = (enabled) => {
  CONFIG.useMockApi = enabled;
  localStorage.setItem('useMockApi', enabled.toString());
  logInfo(`Mock API mode ${enabled ? 'enabled' : 'disabled'}`);
  return enabled;
};

// Check if mock API mode is enabled
export const isMockApiModeEnabled = () => {
  return CONFIG.useMockApi;
};