import React, { useState } from 'react';
import { 
  FiStar, FiCheckCircle, FiClock, FiPhone, 
  FiMapPin, FiUser, FiMessageSquare, FiCalendar,
  FiX, FiTool, FiHome, FiAlertCircle, FiChevronRight
} from 'react-icons/fi';

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const bookingsData = {
    upcoming: [
      {
        id: 1,
        service: "Premium Cleaning",
        date: "2023-06-15",
        time: "10:00 AM",
        status: "confirmed",
        provider: {
          name: "Sara Lopez",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          rating: 4.8,
          reviews: 124,
          phone: "+1 (555) 123-4567"
        },
        details: {
          duration: "2 hours",
          address: "123 Main St, Apt 4B, New York, NY 10001",
          price: "$120",
          request: "Focus on kitchen and bathrooms, cleaning products",
          serviceType: "Deep Cleaning"
        }
      },
      {
        id: 2,
        service: "AC Maintenance",
        date: "2023-06-18",
        time: "2:30 PM",
        status: "confirmed",
        provider: {
          name: "Mike Team",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
          rating: 4.5,
          reviews: 89,
          phone: "+1 (555) 987-6543"
        },
        details: {
          duration: "1.5 hours",
          address: "456 Oak Ave, Unit 12, Brooklyn, NY 11201",
          price: "$90",
          request: "Check refrigerant levels and clean filters",
          serviceType: "HVAC Service"
        }
      },
      {
        id: 3,
        service: "Plumbing Repair",
        date: "2023-06-20",
        time: "9:00 AM",
        status: "pending",
        provider: {
          name: "Carlos Bob",
          image: "https://randomuser.me/api/portraits/men/45.jpg",
          rating: 4.9,
          reviews: 215,
          phone: "+1 (555) 456-7890"
        },
        details: {
          duration: "3 hours",
          address: "789 Pine St, Floor 3, Queens, NY 11354",
          price: "$150",
          request: "Kitchen sink is leaking under the cabinet",
          serviceType: "Emergency Plumbing"
        }
      }
    ],
    past: [
      {
        id: 4,
        service: "Furniture Assembly",
        date: "2023-05-10",
        time: "11:00 AM",
        status: "completed",
        provider: {
          name: "Sam Amanda",
          image: "https://randomuser.me/api/portraits/women/68.jpg",
          rating: 4.7,
          reviews: 178,
          phone: "+1 (555) 789-0123"
        },
        details: {
          duration: "2.5 hours",
          address: "123 Main St, Apt 4B, New York, NY 10001",
          price: "$85",
          request: "Assemble 2 bookshelves and 1 bed frame",
          serviceType: "Furniture Installation"
        }
      }
    ]
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-sm";
    switch(status) {
      case 'confirmed':
        return <span className={`${baseClasses} bg-green-50 text-green-700 border border-green-100`}>
          <FiCheckCircle className="mr-1.5" size={14} /> Confirmed
        </span>;
      case 'pending':
        return <span className={`${baseClasses} bg-amber-50 text-amber-700 border border-amber-100`}>
          <FiClock className="mr-1.5" size={14} /> Pending
        </span>;
      case 'completed':
        return <span className={`${baseClasses} bg-blue-50 text-blue-700 border border-blue-100`}>
          <FiCheckCircle className="mr-1.5" size={14} /> Completed
        </span>;
      default:
        return <span className={`${baseClasses} bg-gray-50 text-gray-700 border border-gray-100`}>
          Scheduled
        </span>;
    }
  };

  const getServiceIcon = (serviceType) => {
    const iconClass = "text-white p-3 rounded-xl flex-shrink-0 shadow-md";
    switch(serviceType) {
      case 'Deep Cleaning':
        return <div className={`${iconClass} bg-gradient-to-br from-teal-500 to-emerald-600`}><FiHome size={22} /></div>;
      case 'HVAC Service':
        return <div className={`${iconClass} bg-gradient-to-br from-blue-500 to-indigo-600`}><FiTool size={22} /></div>;
      case 'Emergency Plumbing':
        return <div className={`${iconClass} bg-gradient-to-br from-red-500 to-rose-600`}><FiAlertCircle size={22} /></div>;
      case 'Furniture Installation':
        return <div className={`${iconClass} bg-gradient-to-br from-purple-500 to-fuchsia-600`}><FiHome size={22} /></div>;
      default:
        return <div className={`${iconClass} bg-gradient-to-br from-indigo-500 to-violet-600`}><FiCheckCircle size={22} /></div>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#076870]">Service Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your upcoming and completed services</p>
          </div>
          <div className="flex space-x-2 bg-white p-1 rounded-xl shadow-sm mt-4 md:mt-0 border border-gray-200">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'upcoming' 
                  ? 'bg-[#076870] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Upcoming ({bookingsData.upcoming.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'past' 
                  ? 'bg-[#076870] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Past ({bookingsData.past.length})
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Current Bookings */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="w-1.5 h-7 bg-[#076870] rounded-full mr-3"></span>
              {activeTab === 'upcoming' ? 'Upcoming Services' : 'Service History'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookingsData[activeTab].map((booking) => (
                <div key={booking.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-200">
                  {/* Service Header */}
                  <div className="bg-[#076870] p-5 rounded-t-xl">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        {getServiceIcon(booking.details.serviceType)}
                        <h3 className="text-white font-bold">{booking.service}</h3>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Provider Info */}
                    <div className="flex items-center space-x-3 mb-5 p-3 bg-gray-50 rounded-xl">
                      <div className="relative">
                        <img 
                          src={booking.provider.image} 
                          alt={booking.provider.name}
                          className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                          <FiStar className="text-yellow-400 fill-yellow-400" size={12} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-[#076870]">{booking.provider.name}</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FiStar className="text-yellow-400 fill-yellow-400 mr-1" size={14} />
                            <span className="text-sm font-medium mr-1">{booking.provider.rating}</span>
                            <span className="text-xs text-gray-500">({booking.provider.reviews})</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">({booking.provider.phone})</span>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-3 mb-5">
                      <div className="flex items-center text-sm bg-gray-50 p-3 rounded-lg">
                        <div className="bg-[#076870] p-2 rounded-lg mr-3">
                          <FiCalendar className="text-white" size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">DATE & TIME</p>
                          <p className="text-gray-700 font-medium">
                            {new Date(booking.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })} • {booking.time}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start text-sm bg-gray-50 p-3 rounded-lg">
                        <div className="bg-[#076870] p-2 rounded-lg mr-3">
                          <FiMapPin className="text-white" size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">ADDRESS</p>
                          <p className="text-gray-700 font-medium">{booking.details.address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Client Request */}
                    {booking.details.request && (
                      <div className="mb-5">
                        <p className="text-xs text-gray-500 mb-2">YOUR NOTES</p>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                          "{booking.details.request}"
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center space-x-2 bg-white border border-[#076870] text-[#076870] py-2.5 rounded-lg text-sm font-medium hover:bg-[#E0F2F1] transition-all">
                        <FiCalendar size={16} />
                        <span>Reschedule</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 bg-white border border-red-500 text-red-500 py-2.5 rounded-lg text-sm font-medium hover:bg-red-50 transition-all">
                        <FiX size={16} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;