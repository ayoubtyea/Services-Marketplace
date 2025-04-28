import React from 'react';
import { 
  FiRefreshCw, FiClock, FiStar, FiCheckCircle, 
  FiUser, FiCalendar, FiDollarSign, FiMessageSquare,
  FiAlertCircle, FiChevronRight, FiBell
} from 'react-icons/fi';
import { useProvider } from '../../../context/ProviderContext';
import { formatDate, formatCurrency } from '../../../utils/formatters'; // Correct import

const DashboardHome = () => {
  const { provider, stats, upcomingJobs, feedback, loading, error, refreshData, usingMockData } = useProvider();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#076870]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading dashboard data</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={refreshData}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FiRefreshCw className="-ml-0.5 mr-2 h-4 w-4" /> Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    if (!provider) return 0;
    
    const fields = [
      'firstName', 'lastName', 'email', 'phone', 
      'address', 'city', 'zip', 'profilePhoto',
      'bio', 'services', 'experience', 'availability',
      'serviceAreas'
    ];
    
    const totalFields = fields.length;
    const completedFields = fields.filter(field => {
      const value = provider[field];
      if (Array.isArray(value)) return value.length > 0;
      return !!value;
    }).length;
    
    return Math.round((completedFields / totalFields) * 100);
  };

  const profileCompletionPercentage = calculateProfileCompletion();
  
  // Format provider name
  const providerName = provider ? `${provider.firstName || ''} ${provider.lastName || ''}`.trim() : 'Provider';
  
  // Create stat cards data
  const statCards = [
    {
      id: 'pending',
      title: 'Pending Bookings',
      value: stats?.pendingBookings || 0,
      icon: FiClock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 'upcoming',
      title: 'Upcoming Jobs',
      value: stats?.upcomingBookings || 0,
      icon: FiCalendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'messages',
      title: 'Unread Messages',
      value: stats?.unreadMessages || 0,
      icon: FiMessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 'reviews',
      title: 'New Reviews',
      value: stats?.newReviews || 0,
      icon: FiStar,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#076870] to-[#0a7c85] p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Welcome Back, {providerName}!
            </h2>
            <p className="text-white/90 mt-1 text-sm md:text-base">
              {provider?.createdAt 
                ? `Member since ${formatDate(provider.createdAt)}`
                : "Welcome to your provider dashboard"}
            </p>
            
            {/* Account Status */}
            <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
              Account Status: {provider?.status === 'approved' ? 'Active' : (provider?.status || 'Pending')}
            </div>
            
            {/* Profile Completion */}
            <div className="mt-4 max-w-md">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-white">Profile Completion</span>
                <span className="text-sm font-medium text-white flex items-center">
                  {profileCompletionPercentage}% <FiCheckCircle className="ml-1" size={14} />
                </span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${profileCompletionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {provider?.profilePhoto && (
            <div className="hidden md:block">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/50">
                <img 
                  src={provider.profilePhoto} 
                  alt="Provider" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = '/default-avatar.png';
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(stat => (
          <div 
            key={stat.id}
            className={`${stat.bgColor} p-4 rounded-lg shadow-sm flex items-center`}
          >
            <div className="p-3 rounded-full bg-white mr-3">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Jobs Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 px-4 py-3 flex justify-between items-center">
          <h3 className="font-medium text-gray-800">Upcoming Jobs</h3>
          {upcomingJobs?.length > 0 && (
            <a href="/provider-dashboard/bookings" className="text-[#076870] hover:text-[#054a52] text-sm font-medium flex items-center">
              View All <FiChevronRight className="ml-1" size={16} />
            </a>
          )}
        </div>
        
        <div className="divide-y divide-gray-100">
          {upcomingJobs?.length > 0 ? (
            upcomingJobs.map((job, index) => (
              <div key={job._id || index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium text-gray-800">{job.serviceName || 'Unnamed Service'}</h4>
                  <span className="text-sm text-gray-500">
                    {job.date ? formatDate(job.date) : 'Date not set'}
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3 flex-shrink-0">
                    {job.clientId?.profilePhoto ? (
                      <img 
                        src={job.clientId.profilePhoto} 
                        alt={job.clientId.firstName || 'Client'} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = '/default-avatar.png';
                        }}
                      />
                    ) : (
                      <FiUser className="w-full h-full text-gray-400 p-2" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-gray-700">
                      Client: {job.clientId ? `${job.clientId.firstName || ''} ${job.clientId.lastName || ''}`.trim() : 'Unknown Client'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {job.location || 'Location not provided'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#076870]">
                      {job.price ? formatCurrency(job.price) : 'Price not set'}
                    </p>
                    <div className={`inline-flex items-center px-2 py-1 mt-1 rounded text-xs font-medium 
                      ${job.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        job.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {job.status || 'Pending'}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <FiCalendar className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 mb-1">No upcoming jobs</p>
              <p className="text-sm text-gray-400">New bookings will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Notifications and Reviews Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Notifications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full">
          <div className="border-b border-gray-100 px-4 py-3 flex justify-between items-center">
            <h3 className="font-medium text-gray-800">Recent Notifications</h3>
            <a href="/provider-dashboard/notifications" className="text-[#076870] hover:text-[#054a52] text-sm font-medium flex items-center">
              View All <FiChevronRight className="ml-1" size={16} />
            </a>
          </div>
          
          <div className="divide-y divide-gray-100">
            {/* Placeholder for notifications - Replace with actual data when available */}
            <div className="p-6 text-center">
              <FiBell className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 mb-1">No new notifications</p>
              <p className="text-sm text-gray-400">Updates will appear here</p>
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full">
          <div className="border-b border-gray-100 px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <h3 className="font-medium text-gray-800">Recent Reviews</h3>
              {feedback?.rating > 0 && (
                <div className="ml-2 flex items-center">
                  <FiStar className="text-yellow-400 w-4 h-4 fill-current" />
                  <span className="text-sm font-medium ml-1">{feedback.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            <span className="text-sm text-gray-500">
              {feedback?.totalReviews || 0} total
            </span>
          </div>
          
          <div className="divide-y divide-gray-100">
            {feedback?.recentReviews?.length > 0 ? (
              feedback.recentReviews.map((review, index) => (
                <div key={review._id || index} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-3 flex-shrink-0">
                      {review.clientId?.profilePhoto ? (
                        <img 
                          src={review.clientId.profilePhoto} 
                          alt={review.clientId.firstName || 'Client'} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = '/default-avatar.png';
                          }}
                        />
                      ) : (
                        <FiUser className="w-full h-full text-gray-400 p-1.5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <p className="text-sm font-medium text-gray-700 mr-2">
                          {review.clientId ? `${review.clientId.firstName || ''} ${review.clientId.lastName || ''}`.trim() : 'Anonymous Client'}
                        </p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i} 
                              className={`w-3.5 h-3.5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment || 'No comment provided'}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {review.createdAt ? formatDate(review.createdAt) : ''}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <FiStar className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 mb-1">No reviews yet</p>
                <p className="text-sm text-gray-400">Complete jobs to receive reviews</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;