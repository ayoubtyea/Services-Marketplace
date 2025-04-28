import React from 'react';
import DashboardLayout from './DashboardLayout';
import { 
  FiPlus, FiClock, FiStar, FiCheckCircle, 
  FiUser, FiMail, FiPhone, FiMapPin, 
  FiCalendar, FiWatch, FiAward, FiAlertCircle, 
  FiDollarSign, FiEye, FiChevronRight 
} from 'react-icons/fi';

// Constants
const PROFILE_COMPLETION_WEIGHTS = {
  fullName: 30,
  email: 20,
  phoneNumber: 20,
  password: 30
};

// Sample Data
const sampleUpcomingBookings = [
  {
    id: 1,
    service: "Deep Cleaning",
    date: "2023-06-15",
    time: "10:00 AM",
    duration: "2 hours",
    address: "123 Main St, Apt 4B",
    serviceType: "Home Cleaning",
    providerName: "CleanPro Team",
    providerImage: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4
  },
  {
    id: 2,
    service: "AC Maintenance",
    date: "2023-06-18",
    time: "2:30 PM",
    duration: "1.5 hours",
    address: "123 Main St, Apt 4B",
    serviceType: "Appliance Repair",
    providerName: "CoolAir Experts",
    providerImage: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  }
];

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

const ClientDashboard = () => {
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  
  const calculateProfileCompletion = () => {
    let completion = 0;
    Object.entries(PROFILE_COMPLETION_WEIGHTS).forEach(([key, value]) => {
      if (userData[key]) completion += value;
    });
    return Math.min(completion, 100);
  };

  const profileCompletion = calculateProfileCompletion();

  return (
    <DashboardLayout>
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-[#076870] to-[#0a7c85] p-6 rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Welcome Back, {userData.fullName || 'Client'}!
                </h2>
                <p className="text-white/90 mt-1 text-sm md:text-base">
                  {userData.createdAt 
                    ? `Member since ${new Date(userData.createdAt).toLocaleDateString()}`
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
              
              {userData.avatar && (
                <div className="hidden md:block">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/50">
                    <img 
                      src={userData.avatar} 
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
              <ProfileInfoItem icon={FiUser} label="Full Name" value={userData.fullName} />
              <ProfileInfoItem icon={FiMail} label="Email" value={userData.email} />
              <ProfileInfoItem icon={FiPhone} label="Phone Number" value={userData.phoneNumber} />
              <ProfileInfoItem 
                icon={FiUser} 
                label="Account Type" 
                value={userData.role || 'client'} 
                isRole 
              />
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="bg-[#E0F2F1] rounded-xl border border-gray-200 overflow-hidden shadow-sm ">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionButton icon={FiPlus} label="Book Service" href="/services" />
              <QuickActionButton icon={FiClock} label="Reschedule" href="/bookings" />
              <QuickActionButton icon={FiStar} label="Rate Service" href="/reviews" />
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
              <button className="text-[#076870] text-sm font-medium flex items-center hover:text-[#054b52] transition-colors">
                View All <FiChevronRight className="ml-1" size={16} />
              </button>
            </div>
            
            <div className="bg-white">
              {sampleUpcomingBookings.map(booking => (
                <div key={booking.id} className="p-5 hover:bg-gray-50 transition-colors">
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
                      value={booking.duration} 
                    />
                    <BookingDetailRow 
                      icon={FiMapPin} 
                      label="Address" 
                      value={booking.address} 
                    />
                    <BookingDetailRow 
                      icon={FiAward} 
                      label="Service Type" 
                      value={booking.serviceType} 
                    />
                  </div>
                  
                  {/* Provider Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 mr-3">
                        <img 
                          src={booking.providerImage} 
                          alt="Provider" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{booking.providerName}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              size={14}
                              className={`${i < booking.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} mx-0.5`}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">({sampleClientFeedback.totalReviews})</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-sm text-[#076870] font-medium hover:text-[#054b52] transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10">
        {/* Recent Activite And in Going Support */}
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
              <h2 className="text-xl font-semibold text-[#076870]">Support Requests</h2>
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
              <h2 className="text-2xl font-semibold text-[#076870] text-center">My Feedback</h2>
            </div>
            <div className="p-5">
              <div className="bg-gradient-to-r from-[#076870] to-[#0a7c85] rounded-xl p-5 text-center mb-4">
                <div className="text-4xl font-bold text-white">{sampleClientFeedback.rating}</div>
                <div className="flex justify-center my-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      size={20}
                      className={`mx-0.5 ${i < Math.floor(sampleClientFeedback.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-sm text-white/90">{sampleClientFeedback.totalReviews} reviews</p>
              </div>

              <div className="space-y-3">
                {sampleClientFeedback.recentReviews.map(review => (
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

      
    </DashboardLayout>
  );
};

export default ClientDashboard;