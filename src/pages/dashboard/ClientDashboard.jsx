import React from 'react';
import DashboardLayout from '../DashboardLayout';
import { 
  FiPlus, FiClock, FiStar, FiCreditCard, 
  FiCheckCircle, FiUser, FiMail, FiPhone,
  FiMapPin, FiCalendar, FiWatch, FiAward
} from 'react-icons/fi';

// Constants for better maintainability
const PROFILE_COMPLETION_WEIGHTS = {
  fullName: 30,
  email: 20,
  phoneNumber: 20,
  password: 30
};

const ClientDashboard = () => {
  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  
  // Calculate profile completion
  const calculateProfileCompletion = () => {
    let completion = 0;
    Object.entries(PROFILE_COMPLETION_WEIGHTS).forEach(([key, value]) => {
      if (userData[key]) completion += value;
    });
    return Math.min(completion, 100);
  };

  // Sample data - in a real app, these would likely come from API calls
  const upcomingBookings = [
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

  const clientFeedback = {
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

  const profileCompletion = calculateProfileCompletion();

  // Helper components for better organization
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

  const QuickActionButton = ({ icon: Icon, label, onClick, href }) => (
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
    <div className="flex items-center">
      <Icon className="text-[#076870] mr-2" />
      <div className="flex gap-12">
        <p className="text-sm text-gray-500">{label}</p>
        <p>{value}</p>
      </div>
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

  return (
    <DashboardLayout>
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
              <QuickActionButton 
                icon={FiPlus} 
                label="Book a New Service" 
                href="/services" 
              />
              <QuickActionButton 
                icon={FiClock} 
                label="Reschedule Booking" 
                href="/bookings" 
              />
              <QuickActionButton 
                icon={FiStar} 
                label="Rate Last Service" 
                href="/reviews" 
              />
              <QuickActionButton 
                icon={FiCreditCard} 
                label="Manage Payments" 
                href="/payment-methods" 
              />
            </div>
          </div>
        </div>       
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-4 w-full">
  {/* Upcoming Bookings */}
  <div className="w-full lg:w-2/3 bg-[#E0F2F1] rounded-xl border border-gray-200 overflow-hidden">
  <div className="p-5 border-b border-gray-200 flex items-center justify-between">
    <h2 className="text-xl font-semibold text-gray-800">Upcoming Bookings</h2>
    <h2 className="text-[#076870] text-sm cursor-pointer">View All</h2>
  </div>
  <div className="bg-white">
    {upcomingBookings.map(booking => (
      <div key={booking.id} className="p-5 hover:bg-gray-50 transition-colors">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-[#076870]">{booking.service}</h3>
          <button className="text-[#076870] bg-[#DCFCE7] rounded text-sm py-2 px-2 cursor-pointer">
            Confirmed
          </button>
        </div>
        
        {/* Booking Details */}
        <div className="grid grid-cols-1 gap-6">
          {/* Date & Time */}
          <div className="flex items-center gap-2">
            <FiCalendar className="text-[#076870]" />
            <p className="text-sm text-gray-500">Date & Time:</p>
            <p className="text-md font-medium">{booking.date} at {booking.time}</p>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2">
            <FiWatch className="text-[#076870]" />
            <p className="text-sm text-gray-500">Duration:</p>
            <p className="text-md font-medium">{booking.duration}</p>
          </div>

          {/* Address */}
          <div className="flex items-center gap-2">
            <FiMapPin className="text-[#076870]" />
            <p className="text-sm text-gray-500">Address:</p>
            <p className="text-md font-medium">{booking.address}</p>
          </div>

          {/* Service Type */}
          <div className="flex items-center gap-2">
            <FiAward className="text-[#076870]" />
            <p className="text-sm text-gray-500">Service Type:</p>
            <p className="text-md font-medium">{booking.serviceType}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


  {/* Feedback Section */}
  <div className="w-full lg:w-1/3 space-y-6 bg-[#E0F2F1] py-4 px-4 rounded">
    <h2 className="text-2xl font-semibold text-[#076870] mb-4 text-center">My Feedback</h2>

    <div className="bg-[#076870] rounded-xl border border-gray-200 p-5 text-center">
      <div className="text-4xl font-bold text-white">{clientFeedback.rating}</div>
      <div className="flex justify-center">
        {[...Array(5)].map((_, i) => (
          <FiStar 
            key={i} 
            className={`${i < Math.floor(clientFeedback.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      <p className="text-sm text-white">{clientFeedback.totalReviews} reviews</p>
    </div>

    {/* Recent Reviews */}
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Recent Reviews</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {clientFeedback.recentReviews.map(review => (
          <ReviewItem key={review.id} {...review} />
        ))}
      </div>
    </div>
  </div>
</div>


    </DashboardLayout>
  );
};

export default ClientDashboard;