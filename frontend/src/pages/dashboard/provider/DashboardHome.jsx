import React from 'react';
import { 
  FiPlus, FiClock, FiStar, FiCheckCircle, 
  FiUser, FiMail, FiPhone, FiMapPin, 
  FiCalendar, FiWatch, FiAward, FiAlertCircle, 
  FiDollarSign, FiEye, FiChevronRight, FiMessageSquare,
  FiBookmark, FiBell, FiUsers, FiBriefcase
} from 'react-icons/fi';

// Constants
const PROFILE_COMPLETION_WEIGHTS = {
  businessName: 30,
  email: 20,
  phoneNumber: 20,
  services: 20,
  description: 10
};

// Sample Data
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
    address: "123 Main St, Apt 4B",
    serviceType: "Home Cleaning",
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
    address: "456 Oak Ave, Unit 12",
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
    type: "Review Received",
    service: "AC Maintenance",
    date: "2023-06-08",
    time: "11:30 AM"
  },
  {
    id: 3,
    type: "Payment Received",
    service: "Furniture Assembly",
    date: "2023-06-07",
    time: "9:15 AM"
  }
];

const sampleOngoingSupportRequests = [
  {
    id: 1,
    type: "Service Inquiry",
    service: "Carpet Cleaning",
    dateOpened: "2023-06-05",
    status: "In Progress"
  },
  {
    id: 2,
    type: "Reschedule Request",
    service: "Plumbing Repair",
    dateOpened: "2023-06-01",
    status: "Pending Response"
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

const JobDetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <Icon className="text-[#076870] mt-0.5 flex-shrink-0" size={16} />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

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
    <p className="text-gray-400 text-xs">{new Date(date).toLocaleDateString()}</p>
  </div>
);

const ActivityItem = ({ type, service, date, time }) => {
  const getIcon = () => {
    switch(type) {
      case "Booking Confirmed": return <FiCheckCircle size={16} />;
      case "Review Received": return <FiStar size={16} />;
      default: return <FiDollarSign size={16} />;
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`p-2 rounded-full mt-0.5 flex-shrink-0 ${
        type === "Booking Confirmed" ? "bg-green-100 text-green-600" : 
        type === "Review Received" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
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
        {type === "Service Inquiry" ? <FiMessageSquare size={16} /> : <FiAlertCircle size={16} />}
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

const DashboardHome = () => {
  const providerData = JSON.parse(localStorage.getItem('providerData')) || {};
  
  const calculateProfileCompletion = () => {
    let completion = 0;
    Object.entries(PROFILE_COMPLETION_WEIGHTS).forEach(([key, value]) => {
      if (providerData[key]) completion += value;
    });
    return Math.min(completion, 100);
  };

  const profileCompletion = calculateProfileCompletion();

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
                  Welcome Back, {providerData.businessName || 'Provider'}!
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
            {sampleStats.map(stat => (
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
              <ProfileInfoItem icon={FiBriefcase} label="Business Name" value={providerData.businessName} />
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
              <QuickActionButton icon={FiPlus} label="Add New Service" href="/services/new" />
              <QuickActionButton icon={FiClock} label="Manage Schedule" href="/schedule" />
              <QuickActionButton icon={FiStar} label="View Reviews" href="/reviews" />
              <QuickActionButton icon={FiMessageSquare} label="Customer Messages" href="/messages" />
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
              <button className="text-[#076870] text-sm font-medium flex items-center hover:text-[#054b52] transition-colors">
                View All <FiChevronRight className="ml-1" size={16} />
              </button>
            </div>
            
            <div className="bg-white">
              {sampleUpcomingJobs.map(job => (
                <div key={job.id} className="p-5 hover:bg-gray-50 transition-colors">
                  
                  {/* Client Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 mr-3">
                        <img 
                          src={job.clientImage} 
                          alt="Client" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{job.client}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              size={14}
                              className={`${i < job.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} mx-0.5`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-[#DCFCE7] text-[#076870] py-1 px-3 rounded-full">
                      Confirmed
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-[#076870]">{job.service}</h3>
                   
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <JobDetailRow 
                      icon={FiCalendar} 
                      label="Date & Time" 
                      value={`${new Date(job.date).toLocaleDateString()} at ${job.time}`} 
                    />
                    <JobDetailRow 
                      icon={FiWatch} 
                      label="Duration" 
                      value={job.duration} 
                    />
                    <JobDetailRow 
                      icon={FiMapPin} 
                      label="Address" 
                      value={job.address} 
                    />
                    <JobDetailRow 
                      icon={FiAward} 
                      label="Service Type" 
                      value={job.serviceType} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-10">
            {/* Recent Activities */}
            <div className="bg-[#E0F2F1] rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-[#076870]">Recent Activity</h2>
              </div>
              <div className="bg-white p-4 space-y-2">
                {sampleRecentActivities.map(activity => (
                  <ActivityItem key={activity.id} {...activity} />
                ))}
              </div>
            </div>

            {/* Support Requests */}
            <div className="bg-[#E0F2F1] rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-[#076870]">Customer Requests</h2>
              </div>
              <div className="p-4 space-y-2 bg-white">
                {sampleOngoingSupportRequests.map(request => (
                  <SupportRequestItem key={request.id} {...request} />
                ))}
              </div>
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
                <div className="text-4xl font-bold text-white">{sampleProviderFeedback.rating}</div>
                <div className="flex justify-center my-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      size={20}
                      className={`mx-0.5 ${i < Math.floor(sampleProviderFeedback.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-sm text-white/90">{sampleProviderFeedback.totalReviews} reviews</p>
              </div>

              <div className="space-y-3">
                {sampleProviderFeedback.recentReviews.map(review => (
                  <ReviewItem key={review.id} {...review} />
                ))}
              </div>
              
              <button className="w-full mt-4 text-[#076870] text-sm font-medium flex items-center justify-center hover:text-[#054b52] transition-colors">
                View All Reviews <FiChevronRight className="ml-1" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
