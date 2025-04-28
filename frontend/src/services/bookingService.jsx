// src/services/bookingService.jsx
import axios from 'axios';

// For React apps using Vite, use import.meta.env instead of process.env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get all bookings for the current user
export const getUserBookings = async (status = '') => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const url = status ? `${API_URL}/bookings?status=${status}` : `${API_URL}/bookings`;
    
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, bookings: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch bookings'
    };
  }
};

// Get a specific booking by ID
export const getBooking = async (bookingId) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.get(`${API_URL}/bookings/${bookingId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, booking: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch booking details'
    };
  }
};

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.post(`${API_URL}/bookings`, bookingData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, booking: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to create booking'
    };
  }
};

// Update booking status
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.patch(`${API_URL}/bookings/${bookingId}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, booking: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to update booking status'
    };
  }
};

// Cancel a booking
export const cancelBooking = async (bookingId, reason) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.post(`${API_URL}/bookings/${bookingId}/cancel`, { reason }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, booking: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to cancel booking'
    };
  }
};

// Reschedule a booking
export const rescheduleBooking = async (bookingId, newDateTime) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.post(`${API_URL}/bookings/${bookingId}/reschedule`, newDateTime, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, booking: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to reschedule booking'
    };
  }
};

// Complete a booking (provider only)
export const completeBooking = async (bookingId) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.post(`${API_URL}/bookings/${bookingId}/complete`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, booking: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to complete booking'
    };
  }
};

// Submit a review for a booking
export const submitReview = async (bookingId, reviewData) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.post(`${API_URL}/bookings/${bookingId}/reviews`, reviewData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, review: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to submit review'
    };
  }
};

// Get statistics for dashboard
export const getBookingStats = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { success: false, error: 'Authentication required' };
    }
    
    const response = await axios.get(`${API_URL}/bookings/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { success: true, stats: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch booking statistics'
    };
  }
};

export default {
  getUserBookings,
  getBooking,
  createBooking,
  updateBookingStatus,
  cancelBooking,
  rescheduleBooking,
  completeBooking,
  submitReview,
  getBookingStats
};