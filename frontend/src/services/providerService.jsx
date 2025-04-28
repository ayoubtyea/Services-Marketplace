import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';  // Ensure to set this to your backend URL

// Fetch provider data
export const fetchProviderData = async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get(`${API_BASE_URL}/provider/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.provider;
};

// Fetch dashboard stats
export const fetchDashboardStats = async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get(`${API_BASE_URL}/provider/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.stats;
};

// Fetch upcoming jobs
export const fetchUpcomingJobs = async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get(`${API_BASE_URL}/provider/dashboard/upcomingJobs`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.upcomingJobs;
};

// Fetch provider feedback
export const fetchProviderFeedback = async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get(`${API_BASE_URL}/provider/dashboard/reviews`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.feedback;
};
