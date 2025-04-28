// src/pages/dashboard/client/DashboardHome.jsx
import React, { useState, useEffect } from 'react';
import { 
  FiPlus, FiClock, FiStar, FiCheckCircle, 
  FiUser, FiMail, FiPhone, FiMapPin, 
  FiCalendar, FiWatch, FiAward, FiAlertCircle, 
  FiDollarSign, FiEye, FiChevronRight, FiLoader
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { getUserBookings } from '../../../services/bookingService';
import { updateProfile } from '../../../services/authService';
import { useBooking } from '../../../context/BookingContext';
import { useAuth } from '../../../context/AuthContext';
import { getBookingStats } from '../../../services/bookingService';
import { getProviderReviews } from '../../../services/providerService';

// Constants
const PROFILE_COMPLETION_WEIGHTS = {
  fullName: 30,
  email: 20,
  phoneNumber: 20,
  password: 30
};

// Sample data for fallback
const sampleClientFeedback = {
  rating: 4.8,
  totalReviews: 12,
  recentReviews: [
    {
      id: 1,
      service: "Plumbing Repair",
      rating: 5,
      comment: "Excellent service! Fixed my leaky faucet in no time.",
      date: "2023-05-20"
    },
    {
      id: 2,
      service: "Electrical Wiring",
      rating: 4,
      comment: "Good work but arrived 15 minutes late.",
      date: "2023-04-15"
    }
  ]
};

const sampleRecentActivities = [
  {
    id: 1,
    type: "Booking Confirmed",
    service: "Deep Cleaning",
    date: "2023-06-10",
    time: "2:45 PM"
  },
  {
    id: 2,
    type: "Service Rated",
    service: "AC Maintenance",
    date: "2023-06-08",
    time: "11:30 AM"
  },
  {
    id: 3,
    type: "Payment Processed",
    service: "Furniture Assembly",
    date: "2023-06-07",
    time: "9:15 AM"
  }
];

const sampleOngoingSupportRequests = [
  {
    id: 1,
    type: "Refund Request",
    service: "Carpet Cleaning",
    dateOpened: "2023-06-05",
    status: "In Progress"
  },
  {
    id: 2,
    type: "Service Complaint",
    service: "Plumbing Repair",
    dateOpened: "2023-06-01",
    status: "Under Review"
  }
];

// Reusable Components
const ProfileInfoItem = ({ icon: Icon, label, value, isRole = false }) => (
  <div className="flex items-start">
    {isRole ? (
      <div className="w-8 h-8 bg-[#076870] rounded-full mr-3 flex items-center justify-center flex-shrink-0">
        <Icon className="text-white" size={14} />
      </div>
    ) : (
      <Icon className="text-[#076870] mr-3 mt-1 flex-shrink-0" size={18} />
    )}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value || 'Not provided'}</p>
    </div>
  </div>
);

const QuickActionButton = ({ icon: Icon, label, href }) => (
  <a 
    href={href}
    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center hover:border-[#076870]/50 group"
  >
    <div className="bg-[#E0F2F1] text-[#076870] p-3 rounded-full mb-3 group-hover:bg-[#076870] group-hover:text-white transition-colors">
      <Icon size={20} />
    </div>
    <h3 className="font-medium text-gray-800 group-hover:text-[#076870] transition-colors">{label}</h3>
  </a>
);

const BookingDetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <Icon className="text-[#076870] mt-0.5 flex-shrink-0" size={16} />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

const ReviewItem = ({ service, rating, comment, date }) => (
  <div className="p-4 hover:bg-gray-50 transition-colors">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-medium text-gray-800">{service}</h3>
      <div className="flex items-center bg-[#E0F2F1] px-2 py-1 rounded">
        <FiStar className="text-yellow-400 fill-yellow-400 mr-1" size={14} />
        <span className="text-sm font-medium">{rating}.0</span>
      </div>
    </div>
    <p className="text-gray-600 text-sm mb-2">"{comment}"</p>
    <p className="text-gray-400 text-xs">{new Date(date).toLocaleDateString()}</p>
  </div>
);

const ActivityItem = ({ type, service, date, time }) => {
  const getIcon = () => {
    switch(type) {
      case "Booking Confirmed": return <FiCheckCircle size={16} />;
      case "Service Rated": return <FiStar size={16} />;
      default: return <FiDollarSign size={16} />;
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`p-2 rounded-full mt-0.5 flex-shrink-0 ${
        type === "Booking Confirmed" ? "bg-green-100 text-green-600" : 
        type === "Service Rated" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
      }`}>
        {getIcon()}
      </div>
      <div>
        <h3 className="font-medium text-gray-800 text-sm">{type}</h3>
        <p className="text-gray-600 text-xs">{service}</p>
        <p className="text-gray-500 text-xs mt-1">
          {new Date(date).toLocaleDateString()} at {time}
        </p>
      </div>
    </div>
  );
};

const SupportRequestItem = ({ type, service, status, dateOpened }) => (
  <div className="p-3 hover:bg-gray-50 rounded-lg transition-colors">
    <div className="flex items-start gap-3 mb-2">
      <div className="p-2 rounded-full mt-0.5 flex-shrink-0 bg-[#076870] text-white">
        {type === "Refund Request" ? <FiDollarSign size={16} /> : <FiAlertCircle size={16} />}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-800 text-sm">{type}</h3>
        <p className="text-gray-600 text-xs">{service}</p>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${
        status === "In Progress" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
      }`}>
        {status}
      </span>
    </div>
    <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
      <p className="text-gray-500 text-xs">
        Opened: {new Date(dateOpened).toLocaleDateString()}
      </p>
      <button className="text-[#076870] text-xs font-medium flex items-center hover:text-[#054b52] transition-colors">
        <FiEye className="mr-1" size={12} /> View
      </button>
    </div>
  </div>
);

const DashboardHome = () => {
  const { user } = useAuth();
  const { bookings, loading: bookingsLoading } = useBooking();
  
  const [userProfile, setUserProfile] = useState(null);
  const [clientFeedback, setClientFeedback] = useState({
    rating: 0,
    totalReviews: 0,
    recentReviews: []
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [supportRequests, setSupportRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Get user profile from auth context or localStorage as fallback
        const profile = user || JSON.parse(localStorage.getItem('userData')) || {};
        setUserProfile(profile);
        
        // Try to fetch booking statistics
        try {
          const statsResult = await getBookingStats();
          if (statsResult.success) {
            // Transform stats data to recent activities
            const activities = statsResult.stats.recentActivities || [];
            setRecentActivities(activities.length > 0 ? activities : sampleRecentActivities);
            
            // Get support requests if available
            setSupportRequests(statsResult.stats.supportRequests || sampleOngoingSupportRequests);
          } else {
            // Fall back to sample data if API call wasn't successful
            setRecentActivities(sampleRecentActivities);
            setSupportRequests(sampleOngoingSupportRequests);
          }
        } catch (error) {
          console.error('Error fetching booking stats:', error);
          // Fallback to sample data
          setRecentActivities(sampleRecentActivities);
          setSupportRequests(sampleOngoingSupportRequests);
        }
        
        // Fetch reviews if client role
        if (profile.role === 'client') {
          try {
            const reviewsResult = await getProviderReviews();
            if (reviewsResult.success) {
              setClientFeedback({
                rating: reviewsResult.reviews.averageRating || 0,
                totalReviews: reviewsResult.reviews.total || 0,
                recentReviews: reviewsResult.reviews.items || []
              });
            } else {
              // Fall back to sample data
              setClientFeedback(sampleClientFeedback);
            }
          } catch (error) {
            console.error('Error fetching reviews:', error);
            // Set default values if API fails
            setClientFeedback(sampleClientFeedback);
          }
        } else {
          setClientFeedback(sampleClientFeedback);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message || 'Failed to load dashboard data');
        
        // Set fallback data
        setRecentActivities(sampleRecentActivities);
        setSupportRequests(sampleOngoingSupportRequests);
        setClientFeedback(sampleClientFeedback);
        
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const calculateProfileCompletion = () => {
    if (!userProfile) return 0;
    
    let completion = 0;
    Object.entries(PROFILE_COMPLETION_WEIGHTS).forEach(([key, value]) => {
      if (userProfile[key]) completion += value;
    });
    return Math.min(completion, 100);
  };

  const profileCompletion = calculateProfileCompletion();

  if (loading || bookingsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#076870]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Get upcoming bookings from context or use empty array if not available
  const upcomingBookings = bookings?.upcoming ? bookings.upcoming.slice(0, 2) : [];

  return (
    <>
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-[#076870] to-[#0a7c85] p-6 rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Welcome Back, {userProfile?.fullName || 'Client'}!
                </h2>
                <p className="text-white/90 mt-1 text-sm md:text-base">
                  {userProfile?.createdAt 
                    ? `Member since ${new Date(userProfile.createdAt).toLocaleDateString()}`
                    : "Welcome to your dashboard"}
                </p>
                
                {/* Profile Completion */}
                <div className="mt-4 max-w-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">Profile Completion</span>
                    <span className="text-sm font-medium text-white flex items-center">
                      {profileCompletion}% <FiCheckCircle className="ml-1" size={14} />
                    </span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {userProfile?.avatar && (
                <div className="hidden md:block">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/50">
                    <img 
                      src={userProfile.avatar} 
                      alt="User" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Client Information Section */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Your Information</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileInfoItem icon={FiUser} label="Full Name" value={userProfile?.fullName} />
              <ProfileInfoItem icon={FiMail} label="Email" value={userProfile?.email} />
              <ProfileInfoItem icon={FiPhone} label="Phone Number" value={userProfile?.phoneNumber || userProfile?.phone} />
              <ProfileInfoItem 
                icon={FiUser} 
                label="Account Type" 
                value={userProfile?.role || 'client'} 
                isRole 
              />
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="bg-[#E0F2F1] rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionButton icon={FiPlus} label="Book Service" href="/services" />
              <QuickActionButton icon={FiClock} label="Reschedule" href="/client-dashboard/bookings" />
              <QuickActionButton icon={FiStar} label="Rate Service" href="/client-dashboard/bookings?tab=past" />
            </div>
          </div>
        </div>       
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Left Column - 2/3 width */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* Upcoming Bookings */}
          <div className="bg-[#E0F2F1] rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#076870]">Upcoming Bookings</h2>
              <Link 
                to="/client-dashboard/bookings"
                className="text-[#076870] text-sm font-medium flex items-center hover:text-[#054b52] transition-colors"
              >
                View All <FiChevronRight className="ml-1" size={16} />
              </Link>
            </div>
            
            <div className="bg-white">
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map(booking => (
                  <div key={booking._id || booking.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg text-[#076870]">{booking.service}</h3>
                      <span className="text-xs font-medium bg-[#DCFCE7] text-[#076870] py-1 px-3 rounded-full">
                        Confirmed
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <BookingDetailRow 
                        icon={FiCalendar} 
                        label="Date & Time" 
                        value={`${new Date(booking.date).toLocaleDateString()} at ${booking.time}`} 
                      />
                      <BookingDetailRow 
                        icon={FiWatch} 
                        label="Duration" 
                        value={booking.duration || '1 hour'} 
                      />
                      <BookingDetailRow 
                        icon={FiMapPin} 
                        label="Address" 
                        value={booking.address || 'Not specified'} 
                      />
                      <BookingDetailRow 
                        icon={FiAward} 
                        label="Service Type" 
                        value={booking.serviceType || booking.service} 
                      />
                    </div>
                    
                    {/* Provider Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 mr-3 bg-gray-200 flex items-center justify-center">
                          {booking.provider?.image ? (
                            <img 
                              src={booking.provider.image} 
                              alt="Provider" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FiUser className="text-gray-500" size={20} />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">
                            {booking.provider?.name || booking.providerName || 'Provider'}
                          </p>
                          {booking.provider?.rating && (
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  size={14}
                                  className={`${i < booking.provider.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} mx-0.5`}
                                />
                              ))}
                              <span className="text-xs text-gray-500 ml-1">
                                ({booking.provider.reviews || 0})
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Link 
                        to={`/client-dashboard/bookings/${booking._id || booking.id}`}
                        className="text-sm text-[#076870] font-medium hover:text-[#054b52] transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <FiCalendar className="mx-auto mb-4 text-gray-300" size={40} />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">No Upcoming Bookings</h3>
                  <p className="text-gray-500 mb-4">You don't have any upcoming services scheduled.</p>
                  <Link 
                    to="/services" 
                    className="px-4 py-2 bg-[#076870] text-white rounded-lg inline-block hover:bg-[#054b52] transition-colors"
                  >
                    Book a Service
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <div className="bg-[#E0F2F1] rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-[#076870]">Recent Activity</h2>
              </div>
              <div className="bg-white p-4 space-y-2">
                {recentActivities.length > 0 ? (
                  recentActivities.map(activity => (
                    <ActivityItem key={activity.id} {...activity} />
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <FiClock className="mx-auto mb-3 text-gray-300" size={30} />
                    <p className="text-gray-500">No recent activities</p>
                  </div>
                )}
              </div>
            </div>

            {/* Support Requests */}
            <div className="bg-[#E0F2F1] rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-[#076870]">Support Requests</h2>
              </div>
              <div className="p-4 space-y-2 bg-white">
                {supportRequests.length > 0 ? (
                  supportRequests.map(request => (
                    <SupportRequestItem key={request.id} {...request} />
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <FiAlertCircle className="mx-auto mb-3 text-gray-300" size={30} />
                    <p className="text-gray-500">No active support requests</p>
                    <button className="mt-4 text-[#076870] font-medium hover:underline">
                      Need help? Create a ticket
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>        

        {/* Right Column - 1/3 width */}
        <div className="w-full h-max lg:w-1/3 space-y-6">
          {/* Feedback Card */}
          <div className="bg-[#E0F2F1] rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-[#076870] text-center">My Feedback</h2>
            </div>
            <div className="p-5">
              <div className="bg-gradient-to-r from-[#076870] to-[#0a7c85] rounded-xl p-5 text-center mb-4">
                <div className="text-4xl font-bold text-white">
                  {clientFeedback.rating ? clientFeedback.rating.toFixed(1) : '0.0'}
                </div>
                <div className="flex justify-center my-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      size={20}
                      className={`mx-0.5 ${i < Math.floor(clientFeedback.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-sm text-white/90">{clientFeedback.totalReviews} reviews</p>
              </div>

              <div className="space-y-3">
                {clientFeedback.recentReviews && clientFeedback.recentReviews.length > 0 ? (
                  clientFeedback.recentReviews.map(review => (
                    <ReviewItem key={review.id} {...review} />
                  ))
                ) : (
                  <div className="p-4 text-center bg-white rounded-lg">
                    <FiStar className="mx-auto mb-2 text-gray-300" size={24} />
                    <p className="text-gray-500">No feedback yet</p>
                  </div>
                )}
              </div>
              
              {clientFeedback.totalReviews > 0 && (
                <button className="w-full mt-4 text-[#076870] text-sm font-medium flex items-center justify-center hover:text-[#054b52] transition-colors">
                  View All Reviews <FiChevronRight className="ml-1" size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;