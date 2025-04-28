// api/mockProviderData.js
// This file provides mock data for provider dashboard when backend is not available

// Sample provider data
export const mockProviderData = {
  provider: {
    _id: "provider123",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    profilePhoto: "/api/placeholder/200/200", // Placeholder image
    dob: "1985-05-15",
    address: "123 Main Street",
    city: "Casablanca",
    zip: "20000",
    services: ["Handyman Work", "Furniture Assembly", "Moving Services"],
    experience: "5+",
    availability: "Full-time",
    serviceAreas: ["Casablanca", "Rabat"],
    bio: "Professional handyman with over 5 years of experience in residential repairs and furniture assembly.",
    status: "approved",
    createdAt: "2023-08-15T10:30:00.000Z"
  }
};

// Sample dashboard statistics
export const mockStatsData = {
  stats: {
    pendingBookings: 3,
    upcomingBookings: 5,
    unreadMessages: 2,
    newReviews: 1
  }
};

// Sample upcoming jobs
export const mockUpcomingJobsData = {
  upcomingJobs: [
    {
      _id: "booking123",
      serviceName: "Furniture Assembly",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
      location: "15 Rue Mohammed V, Casablanca",
      price: 250,
      status: "confirmed",
      clientId: {
        _id: "client123",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah@example.com",
        phone: "987-654-3210",
        profilePhoto: "/api/placeholder/100/100" // Placeholder image
      }
    },
    {
      _id: "booking124",
      serviceName: "Handyman Work - Plumbing",
      date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
      location: "27 Avenue Hassan II, Casablanca",
      price: 350,
      status: "confirmed",
      clientId: {
        _id: "client124",
        firstName: "Michael",
        lastName: "Smith",
        email: "michael@example.com",
        phone: "555-123-4567",
        profilePhoto: "/api/placeholder/100/100" // Placeholder image
      }
    }
  ]
};

// Sample provider feedback/reviews
export const mockFeedbackData = {
  rating: 4.8,
  totalReviews: 24,
  recentReviews: [
    {
      _id: "review123",
      rating: 5,
      comment: "Excellent service! The furniture was assembled quickly and professionally.",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      clientId: {
        _id: "client125",
        firstName: "Emma",
        lastName: "Wilson",
        profilePhoto: "/api/placeholder/100/100" // Placeholder image
      }
    },
    {
      _id: "review124",
      rating: 4,
      comment: "Good work on fixing the sink. Would recommend for plumbing issues.",
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
      clientId: {
        _id: "client126",
        firstName: "David",
        lastName: "Brown",
        profilePhoto: "/api/placeholder/100/100" // Placeholder image
      }
    }
  ]
};

// Mock API response delay to simulate network request
const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const getMockProviderData = async () => {
  await mockDelay();
  return { success: true, ...mockProviderData };
};

export const getMockDashboardStats = async () => {
  await mockDelay();
  return { success: true, ...mockStatsData };
};

export const getMockUpcomingJobs = async () => {
  await mockDelay();
  return { success: true, ...mockUpcomingJobsData };
};

export const getMockProviderFeedback = async () => {
  await mockDelay();
  return { success: true, ...mockFeedbackData };
};