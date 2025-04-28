import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchProviderData,
  fetchDashboardStats,
  fetchUpcomingJobs,
  fetchProviderFeedback,
  isMockApiModeEnabled,
  toggleMockApiMode
} from '../api/providerService'; 

const ProviderContext = createContext();

// Export named as both Provider (for backward compatibility) and ProviderProvider (for clarity)
export const Provider = ({ children }) => {
  const navigate = useNavigate();
  const [providerState, setProviderState] = useState({
    provider: null,
    stats: null,
    upcomingJobs: [],
    feedback: null,
    loading: true,
    error: null,
    usingMockData: isMockApiModeEnabled()
  });

  // Check if user is authenticated
  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('authToken');
    const userData = JSON.parse(localStorage.getItem('userData') || 'null');
    
    // Skip auth check if we're using mock data (for development)
    if (providerState.usingMockData) {
      return true;
    }
    
    if (!token || !userData || userData.role !== 'provider') {
      // Redirect to login if not authenticated as provider
      navigate('/auth', { replace: true });
      return false;
    }
    return true;
  }, [navigate, providerState.usingMockData]);

  // Fetch provider dashboard data
  const fetchDashboardData = useCallback(async () => {
    if (!checkAuth()) return;

    try {
      setProviderState(prev => ({ ...prev, loading: true, error: null }));
      
      console.info('🔄 Fetching provider dashboard data...');
      
      // Get current mock mode status
      const usingMockData = isMockApiModeEnabled();
      
      // Make parallel API requests for better performance
      const [providerData, statsData, jobsData, feedbackData] = await Promise.all([
        fetchProviderData(),
        fetchDashboardStats(),
        fetchUpcomingJobs(),
        fetchProviderFeedback()
      ]);

      console.info('✅ Provider data fetched successfully');

      setProviderState({
        provider: providerData?.provider || null,
        stats: statsData?.stats || {
          pendingBookings: 0,
          upcomingBookings: 0,
          unreadMessages: 0,
          newReviews: 0
        },
        upcomingJobs: jobsData?.upcomingJobs || [],
        feedback: feedbackData || { rating: 0, totalReviews: 0, recentReviews: [] },
        loading: false,
        error: null,
        usingMockData
      });
    } catch (error) {
      console.error('Dashboard data load error:', error);
      
      // Check if it's an authentication error
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        navigate('/auth', { replace: true });
      }
      
      setProviderState(prev => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || error.message || 'Failed to load dashboard data'
      }));
    }
  }, [checkAuth, navigate]);

  // Load dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Function to manually refresh data
  const refreshData = () => {
    fetchDashboardData();
  };

  // Toggle between mock and real API data
  const toggleMockData = (enabled) => {
    toggleMockApiMode(enabled);
    setProviderState(prev => ({ ...prev, usingMockData: enabled }));
    // Refetch data with new setting
    fetchDashboardData();
  };

  return (
    <ProviderContext.Provider
      value={{
        ...providerState,
        refreshData,
        toggleMockData
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

// Also export the component as ProviderProvider for clarity
export const ProviderProvider = Provider;

export const useProvider = () => {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error('useProvider must be used within a Provider');
  }
  return context;
};