import React from 'react';
import DashboardLayout from '../DashboardLayout';
import { 
  FiPlus, FiClock, FiStar, FiCreditCard, 
  FiCheckCircle, FiUser, FiMail, FiPhone,
  FiMapPin, FiCalendar, FiWatch, FiAward,
  FiAlertCircle, FiDollarSign, FiEye
} from 'react-icons/fi';

// Constants for better maintainability
const PROFILE_COMPLETION_WEIGHTS = {
  fullName: 30,
  email: 20,
  phoneNumber: 20,
  password: 30
};

// Sample data - would typically come from API calls
const sampleUpcomingBookings = [
  {
    id: 1,
    service: "Deep Cleaning",
    date: "2023-06-15",
    time: "10:00 AM",
    duration: "2 hours",
    address: "123 Main St, Apt 4B",
    serviceType: "Home Cleaning",
    provider: "CleanPro Team"
  },
  {
    id: 2,
    service: "AC Maintenance",
    date: "2023-06-18",
    time: "2:30 PM",
    duration: "1.5 hours",
    address: "123 Main St, Apt 4B",
    serviceType: "Appliance Repair",
    provider: "CoolAir Experts"
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
    type: "Payment Received",
    service: "AC Maintenance",
    date: "2023-06-08",
    time: "11:30 AM"
  }
];

const sampleOngoingSupportRequests = [
  {
    id: 1,
    type: "Refund Request",
    service: "Carpet Cleaning",
    dateOpened: "2023-06-05",
    status: "In Progress",
    details: "Requesting refund for cancelled service"
  },
  {
    id: 2,
    type: "Service Complaint",
    service: "Plumbing Repair",
    dateOpened: "2023-06-01",
    status: "Under Review",
    details: "Issue with pipe leakage after repair"
  }
];

// Reusable Components
const ProfileInfoItem = ({ icon: Icon, label, value, isRole = false }) => (
  <div className="flex items-center">
    {isRole ? (
      <div className="w-5 h-5 bg-[#076870] rounded-full mr-3 flex items-center justify-center">
        <Icon className="text-white" size={12} />
      </div>
    ) : (
      <Icon className="text-[#076870] mr-3" size={18} />
    )}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || 'Not provided'}</p>
    </div>
  </div>
);

const QuickActionButton = ({ icon: Icon, label, href }) => (
  <button 
    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center"
    onClick={() => window.location.href = href}
  >
    <div className="bg-[#E0F2F1] text-[#076870] p-3 rounded-full mb-3">
      <Icon size={20} />
    </div>
    <h3 className="font-medium text-gray-800">{label}</h3>
  </button>
);

const BookingDetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2">
    <Icon className="text-[#076870]" />
    <p className="text-sm text-gray-500">{label}:</p>
    <p className="text-md font-medium">{value}</p>
  </div>
);

const ReviewItem = ({ service, rating, comment, date }) => (
  <div className="p-4">
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-medium">{service}</h3>
      <div className="flex items-center">
        <FiStar className="text-yellow-400 fill-yellow-400 mr-1" />
        <span>{rating}.0</span>
      </div>
    </div>
    <p className="text-gray-600 text-sm mb-2">"{comment}"</p>
    <p className="text-gray-400 text-xs">{new Date(date).toLocaleDateString()}</p>
  </div>
);

const ActivityItem = ({ type, service, date, time }) => {
  const isBooking = type === "Booking Confirmed";
  return (
    <div className="bg-white p-3 rounded-lg border border-gray-200">
      <div className="flex items-start">
        <div className={`p-2 rounded-full mr-3 ${
          isBooking ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
        }`}>
          {isBooking ? <FiCheckCircle size={16} /> : <FiDollarSign size={16} />}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-800">{type}</h3>
          <p className="text-sm text-gray-600">{service}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(date).toLocaleDateString()} at {time}
          </p>
        </div>
      </div>
    </div>
  );
};

const SupportRequestItem = ({ type, service, status, dateOpened }) => (
  <div className="bg-white p-3 rounded-lg border border-gray-200">
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center">
        <div className="p-2 rounded-full mr-3 bg-yellow-100 text-yellow-600">
          <FiAlertCircle size={16} />
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{type}</h3>
          <p className="text-sm text-gray-600">{service}</p>
        </div>
      </div>
      <span className={`text-xs px-2 py-1 rounded ${
        status === "In Progress" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
      }`}>
        {status}
      </span>
    </div>
    <div className="flex justify-between items-center mt-2">
      <p className="text-xs text-gray-500">
        Opened: {new Date(dateOpened).toLocaleDateString()}
      </p>
      <button className="text-xs text-[#076870] flex items-center">
        <FiEye className="mr-1" size={14} /> View Details
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
          <div className="bg-[#076870] p-6 rounded-xl border border-blue-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Welcome Back, {userData.fullName || 'Client'}!
                </h2>
                <p className="text-white mt-1">
                  {userData.createdAt 
                    ? `Member since ${new Date(userData.createdAt).toLocaleDateString()}`
                    : "Welcome to your dashboard"}
                </p>
                
                {/* Profile Completion */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">Profile Completion</span>
                    <span className="text-sm font-medium text-white flex items-center">
                      {profileCompletion}% <FiCheckCircle className="ml-1 text-white" />
                    </span>
                  </div>
                  <div className="w-full bg-gray-400 rounded-full h-2.5">
                    <div 
                      className="bg-white h-2.5 rounded-full" 
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Client Information Section */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
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
          <div className="bg-[#E0F2F1] px-4 py-4 rounded-xl">
            <h1 className='mb-6 text-xl text-[#076870] font-semibold'>Quick Actions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionButton icon={FiPlus} label="Book a New Service" href="/services" />
              <QuickActionButton icon={FiClock} label="Reschedule Booking" href="/bookings" />
              <QuickActionButton icon={FiStar} label="Rate Last Service" href="/reviews" />
              <QuickActionButton icon={FiCreditCard} label="Manage Payments" href="/payment-methods" />
            </div>
          </div>
        </div>       
      </div>

      {/* Bottom Section */}
      <div  className="flex flex-col lg:flex-row gap-6 mt-4 w-full">
        {/* Upcoming Bookings */}
        <div className="w-full lg:w-2/3 rounded-xl border border-gray-200 overflow-hidden bg-[#E0F2F1]">
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Upcoming Bookings</h2>
            <h2 className="text-[#076870] text-sm cursor-pointer">View All</h2>
          </div>
          <div className="bg-white">
            {sampleUpcomingBookings.map(booking => (
              <div key={booking.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-[#076870]">{booking.service}</h3>
                  <button className="text-[#076870] bg-[#DCFCE7] rounded-full text-sm py-2 px-2 cursor-pointer">
                    Confirmed
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <BookingDetailRow 
                    icon={FiCalendar} 
                    label="Date & Time" 
                    value={`${booking.date} at ${booking.time}`} 
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
              </div>
            ))}
          </div>
          
        {/* Upcoming Bookings */}
        <div className="flex flex-col lg:flex-row gap-3 bg-white mt-18">
  {/* Recent Activity */}
  <div className="bg-[#E0F2F1] p-6 rounded-xl border border-[#076870]/10 shadow-sm w-full">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-[#076870] flex items-center">
        Recent Activity
      </h2>
    </div>
    <div className="space-y-4">
      {sampleRecentActivities.map(activity => (
        <div key={activity.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
          <div className="flex items-start">
            <div className={`p-3 rounded-full mr-3 ${
              activity.type === "Booking Confirmed" 
                ? "bg-[#E0F2F1] text-[#076870]" 
                : activity.type === "Service Rated"
                ? "bg-[#E0F2F1] text-[#076870]"
                : "bg-[#E0F2F1] text-[#076870]"
            }`}>
              {activity.type === "Booking Confirmed" ? (
                <FiCheckCircle size={18} />
              ) : activity.type === "Service Rated" ? (
                <FiStar size={18} />
              ) : (
                <FiDollarSign size={18} />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{activity.type}</h3>
              <p className="text-sm text-gray-600">{activity.service}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(activity.date).toLocaleDateString()} at {activity.time}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Ongoing Support */}
  <div className="bg-[#E0F2F1] p-6 rounded-xl border border-[#076870]/10 shadow-sm w-full">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-[#076870] flex items-center">
      Ongoing Support Requests
      </h2>
    </div>
    <div className="space-y-4">
      {sampleOngoingSupportRequests.map(request => (
        <div key={request.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
          <div className="justify-between items-start mb-2">
            <div className="flex items-center">
              <div className="p-3 rounded-full mr-3 bg-[#076870] text-[#E0F2F1]">
                {request.type === "Refund Request" ? (
                  <FiDollarSign size={18} />
                ) : (
                  <FiAlertCircle size={18} />
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{request.type}</h3>
                <p className="text-sm text-gray-600">{request.service}</p>
              </div>
            </div>
           
            <p className="text-xs text-gray-500">
              Opened: {new Date(request.dateOpened).toLocaleDateString()}
            </p>
          </div>
          <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
          <span className={`text-xs px-3 py-1 rounded-full ${
              request.status === "In Progress" 
                ? "bg-blue-100 text-blue-800" 
                : "bg-gray-100 text-gray-800"
            }`}>
              {request.status}
            </span>
            <button className="text-xs text-[#076870] font-medium flex items-center hover:text-[#054b52]">
              <FiEye className="mr-1" size={14} /> View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
          </div>
          
        </div>

        {/* Right Sidebar */}
        <div className="lg:w-80 space-y-6 w-full 
">
          {/* Feedback */}
          <div className="bg-[#E0F2F1] p-4 rounded-xl h-full
">
            <h2 className="text-2xl font-semibold text-[#076870] mb-4 text-center">My Feedback</h2>
            <div className="bg-[#076870] rounded-xl border border-gray-200 p-5 text-center">
              <div className="text-4xl font-bold text-white">{sampleClientFeedback.rating}</div>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    className={`${i < Math.floor(sampleClientFeedback.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-sm text-white">{sampleClientFeedback.totalReviews} reviews</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mt-4">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Recent Reviews</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {sampleClientFeedback.recentReviews.map(review => (
                  <ReviewItem key={review.id} {...review} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mt-4">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Recent Reviews</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {sampleClientFeedback.recentReviews.map(review => (
                  <ReviewItem key={review.id} {...review} />
                ))}
              </div>
            </div>

            
          </div>
        </div>
        
      </div>
      
    </DashboardLayout>
  );
};

export default ClientDashboard;