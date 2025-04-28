// src/pages/dashboard/provider/DashboardHome.jsx
import React, { useState, useEffect } from 'react';
import { 
  FiPlus, FiClock, FiStar, FiCheckCircle, 
  FiUser, FiMail, FiPhone, FiMapPin, 
  FiCalendar, FiWatch, FiAward, FiAlertCircle, 
  FiDollarSign, FiEye, FiChevronRight, FiMessageSquare,
  FiBookmark, FiBell, FiUsers, FiBriefcase, FiLoader
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getProviderStats, getProviderProfile, getProviderReviews } from '../../../services/providerService';
import { getUserBookings } from '../../../services/bookingService';

// Constants
const PROFILE_COMPLETION_WEIGHTS = {
  businessName: 30,
  email: 20,
  phoneNumber: 20,
  services: 20,
  description: 10
};

// Sample data as fallback
const sampleStats = [
  {
    id: 1,
    title: "Today's Bookings",
    value: 8,
    icon: FiCalendar,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    id: 2,
    title: "Pending Requests",
    value: 3,
    icon: FiBookmark,
    color: "text-amber-600",
    bgColor: "bg-amber-100"
  },
  {
    id: 3,
    title: "Unread Messages",
    value: 5,
    icon: FiMessageSquare,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    id: 4,
    title: "New Reviews",
    value: 2,
    icon: FiStar,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  }
];

const sampleUpcomingJobs = [
  {
    id: 1,
    service: "Deep Cleaning",
    client: "Sarah Johnson",
    date: "2023-06-15",
    time: "10:00 AM",
    duration: "2 hours",
    address: "123 Main St, Apt 4B, New York, NY 10001",
    serviceType: "Regular Cleaning",
    clientImage: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4
  },
  {
    id: 2,
    service: "AC Maintenance",
    client: "Michael Brown",
    date: "2023-06-18",
    time: "2:30 PM",
    duration: "1.5 hours",
    address: "456 Oak Ave, Unit 12, Brooklyn, NY 11201",
    serviceType: "Appliance Repair",
    clientImage: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  }
];

const sampleProviderFeedback = {
  rating: 4.7,
  totalReviews: 24,
  recentReviews: [
    {
      id: 1,
      client: "Sarah Johnson",
      service: "Plumbing Repair",
      rating: 5,
      comment: "Excellent service! Fixed my leaky faucet in no time.",
      date: "2023-05-20"
    },
    {
      id: 2,
      client: "Michael Brown",
      service: "Electrical Wiring",
      rating: 4,
      comment: "Good work but arrived 15 minutes late.",
      date: "2023-04-15"
    }
  ]
};

// Component for displaying stats cards
const StatCard = ({ icon: Icon, title, value, color, bgColor }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${bgColor} ${color}`}>
        <Icon size={20} />
      </div>
    </div>
  </div>
);

// Component for job detail row
const JobDetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <Icon className="text-[#076870] mt-0.5 flex-shrink-0" size={16} />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

// Component for review item
const ReviewItem = ({ client, service, rating, comment, date }) => (
  <div className="p-4 hover:bg-gray-50 transition-colors">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-medium text-gray-800">{service}</h3>
      <div className="flex items-center bg-[#E0F2F1] px-2 py-1 rounded">
        <FiStar className="text-yellow-400 fill-yellow-400 mr-1" size={14} />
        <span className="text-sm font-medium">{rating}.0</span>
      </div>
    </div>
    <p className="text-gray-600 text-sm mb-2">"{comment}"</p>
    <div className="flex justify-between">
      <p className="text-gray-500 text-xs">From: {client}</p>
      <p className="text-gray-400 text-xs">{new Date(date).toLocaleDateString()}</p>
    </div>
  </div>
);

const DashboardHome = () => {
  const [providerData, setProviderData] = useState({});
  const [stats, setStats] = useState(sampleStats);
  const [upcomingJobs, setUpcomingJobs] = useState([]);
  const [feedbackData, setFeedbackData] = useState({
    rating: 0,
    totalReviews: 0,
    recentReviews: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get provider data from localStorage or from API
        const storedProviderData = JSON.parse(localStorage.getItem('userData')) || {};
        
        // Try to fetch fresh provider data from API
        const profileResult = await getProviderProfile();
        if (profileResult.success) {
          setProviderData(profileResult.profile);
        } else {
          setProviderData(storedProviderData);
        }

        // Fetch provider statistics
        const statsResult = await getProviderStats();
        if (statsResult.success && statsResult.stats) {
          // Transform API stats to our format
          const formattedStats = [
            {
              id: 1,
              title: "Today's Bookings",
              value: statsResult.stats.todayBookings || 0,
              icon: FiCalendar,
              color: "text-blue-600",
              bgColor: "bg-blue-100"
            },
            {
              id: 2,
              title: "Pending Requests",
              value: statsResult.stats.pendingRequests || 0,
              icon: FiBookmark,
              color: "text-amber-600",
              bgColor: "bg-amber-100"
            },
            {
              id: 3,
              title: "Unread Messages",
              value: statsResult.stats.unreadMessages || 0,
              icon: FiMessageSquare,
              color: "text-green-600",
              bgColor: "bg-green-100"
            },
            {
              id: 4,
              title: "New Reviews",
              value: statsResult.stats.newReviews || 0,
              icon: FiStar,
              color: "text-purple-600",
              bgColor: "bg-purple-100"
            }
          ];
          setStats(formattedStats);
        }

        // Fetch upcoming bookings
        const bookingsResult = await getUserBookings('upcoming');
        if (bookingsResult.success && bookingsResult.bookings) {
          setUpcomingJobs(bookingsResult.bookings);
        } else {
          setUpcomingJobs(sampleUpcomingJobs);
        }

        // Fetch provider reviews
        const reviewsResult = await getProviderReviews();
        if (reviewsResult.success && reviewsResult.reviews) {
          const formattedFeedback = {
            rating: reviewsResult.reviews.averageRating || 0,
            totalReviews: reviewsResult.reviews.totalCount || 0,
            recentReviews: reviewsResult.reviews.items || []
          };
          setFeedbackData(formattedFeedback);
        } else {
          setFeedbackData(sampleProviderFeedback);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching provider dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
        
        // Use sample data as fallback
        setProviderData(JSON.parse(localStorage.getItem('userData')) || {});
        setStats(sampleStats);
        setUpcomingJobs(sampleUpcomingJobs);
        setFeedbackData(sampleProviderFeedback);
        
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateProfileCompletion = () => {
    let completion = 0;
    Object.entries(PROFILE_COMPLETION_WEIGHTS).forEach(([key, value]) => {
      if (providerData[key]) completion += value;
    });
    return Math.min(completion, 100);
  };

  const profileCompletion = calculateProfileCompletion();

  // Profile Info Item Component
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

  // Quick Action Button Component
  const QuickActionButton = ({ icon: Icon, label, href }) => (
    <Link 
      to={href}
      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center hover:border-[#076870]/50 group"
    >
      <div className="bg-[#E0F2F1] text-[#076870] p-3 rounded-full mb-3 group-hover:bg-[#076870] group-hover:text-white transition-colors">
        <Icon size={20} />
      </div>
      <h3 className="font-medium text-gray-800 group-hover:text-[#076870] transition-colors">{label}</h3>
    </Link>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#076870]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
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
                  Welcome Back, {providerData.businessName || providerData.fullName || 'Provider'}!
                </h2>
                <p className="text-white/90 mt-1 text-sm md:text-base">
                  {providerData.createdAt 
                    ? `Member since ${new Date(providerData.createdAt).toLocaleDateString()}`
                    : "Welcome to your provider dashboard"}
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
              
              {providerData.avatar && (
                <div className="hidden md:block">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/50">
                    <img 
                      src={providerData.avatar} 
                      alt="Provider" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(stat => (
              <StatCard 
                key={stat.id}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                color={stat.color}
                bgColor={stat.bgColor}
              />
            ))}
          </div>

          {/* Provider Information Section */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Your Business Information</h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileInfoItem icon={FiBriefcase} label="Business Name" value={providerData.businessName || providerData.fullName} />
              <ProfileInfoItem icon={FiMail} label="Email" value={providerData.email} />
              <ProfileInfoItem icon={FiPhone} label="Phone Number" value={providerData.phoneNumber} />
              <ProfileInfoItem 
                icon={FiUsers} 
                label="Account Type" 
                value={providerData.role || 'provider'} 
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
              <QuickActionButton icon={FiPlus} label="Add New Service" href="/provider-dashboard/manage-services" />
              <QuickActionButton icon={FiClock} label="Manage Schedule" href="/provider-dashboard/settings" />
              <QuickActionButton icon={FiStar} label="View Reviews" href="/provider-dashboard/profile" />
              <QuickActionButton icon={FiMessageSquare} label="Customer Messages" href="/provider-dashboard/messages" />
            </div>
          </div>
        </div>       
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Left Column - 2/3 width */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* Upcoming Jobs */}
          <div className="bg-[#E0F2F1] rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#076870]">Upcoming Bookings</h2>
              <Link to="/provider-dashboard/bookings" className="text-[#076870] text-sm font-medium flex items-center hover:text-[#054b52] transition-colors">
                View All <FiChevronRight className="ml-1" size={16} />
              </Link>
            </div>
            
            <div className="bg-white">
              {upcomingJobs.length > 0 ? (
                upcomingJobs.map(job => (
                  <div key={job.id || job._id} className="p-5 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                    {/* Client Profile and Confirmed Button */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#076870]/20 mr-3">
                          <img 
                            src={job.clientImage || "https://randomuser.me/api/portraits/lego/1.jpg"} 
                            alt="Client" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{job.client || 'Client'}</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                size={14}
                                className={`${i < (job.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} mx-0.5`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="bg-[#DCFCE7] text-[#166534] text-xs font-medium py-1 px-3 rounded-full flex items-center">
                        <FiCheckCircle className="mr-1" size={12} /> {job.status || "Confirmed"}
                      </span>
                    </div>

                    {/* Service Details */}
                    <div className="mb-4">
                      <h3 className="font-bold text-lg text-[#076870] mb-3">{job.service}</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <JobDetailRow 
                          icon={FiCalendar} 
                          label="Date" 
                          value={new Date(job.date).toLocaleDateString()} 
                        />
                        <JobDetailRow 
                          icon={FiClock} 
                          label="Time" 
                          value={job.time} 
                        />
                        <JobDetailRow 
                          icon={FiWatch} 
                          label="Duration" 
                          value={job.duration} 
                        />
                        <JobDetailRow 
                          icon={FiAward} 
                          label="Service Type" 
                          value={job.serviceType} 
                        />
                        <div className="sm:col-span-2">
                          <JobDetailRow 
                            icon={FiMapPin} 
                            label="Address" 
                            value={job.address} 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-3 border-t border-gray-200">
                      <Link 
                        to={`/provider-dashboard/bookings/${job.id || job._id}`}
                        className="text-[#076870] border border-[#076870] hover:bg-[#076870]/10 text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
                      >
                        <FiEye className="mr-2" size={14} /> View Details
                      </Link>
                      <Link 
                        to={`/provider-dashboard/bookings/${job.id || job._id}/reschedule`}
                        className="bg-[#076870] text-white hover:bg-[#054b52] text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
                      >
                        <FiCalendar className="mr-2" size={14} /> Reschedule
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FiCalendar className="text-gray-400" size={24} />
                  </div>
                  <h3 className="font-medium text-gray-700 mb-1">No Upcoming Bookings</h3>
                  <p className="text-gray-500 text-sm">You don't have any scheduled bookings at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>        

        {/* Right Column - 1/3 width */}
        <div className="w-full h-max lg:w-1/3 space-y-6">
          {/* Feedback Card */}
          <div className="bg-[#E0F2F1] rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-[#076870] text-center">Your Ratings</h2>
            </div>
            <div className="p-5">
              <div className="bg-gradient-to-r from-[#076870] to-[#0a7c85] rounded-xl p-5 text-center mb-4">
                <div className="text-4xl font-bold text-white">{feedbackData.rating}</div>
                <div className="flex justify-center my-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      size={20}
                      className={`mx-0.5 ${i < Math.floor(feedbackData.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-sm text-white/90">{feedbackData.totalReviews} reviews</p>
              </div>

              {feedbackData.recentReviews && feedbackData.recentReviews.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {feedbackData.recentReviews.slice(0, 3).map(review => (
                    <ReviewItem 
                      key={review.id || review._id} 
                      client={review.client || review.clientName || 'Client'}
                      service={review.service} 
                      rating={review.rating} 
                      comment={review.comment || review.text} 
                      date={review.date || review.createdAt} 
                    />
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-gray-500">No reviews received yet.</p>
                </div>
              )}
              
              <Link to="/provider-dashboard/profile" className="w-full mt-4 text-[#076870] text-sm font-medium flex items-center justify-center hover:text-[#054b52] transition-colors">
                View All Reviews <FiChevronRight className="ml-1" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;