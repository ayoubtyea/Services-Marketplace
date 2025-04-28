// src/pages/dashboard/provider/Bookings.jsx
import React, { useState, useEffect } from 'react';
import {
  FiClock, FiCheckCircle, FiXCircle, FiCalendar,
  FiMapPin, FiUser, FiMail, FiPhone, FiAlertCircle,
  FiHome, FiTool, FiTrash2, FiCheck, FiX, FiChevronDown, FiChevronUp
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getUserBookings, updateBookingStatus, completeBooking } from '../../../services/bookingService';
import axios from 'axios';

const getServiceIcon = (serviceType) => {
  switch(serviceType) {
    case "Regular Cleaning": return <FiHome className="text-blue-500 text-xl" />;
    case "Appliance Repair": return <FiTool className="text-green-500 text-xl" />;
    case "Plumbing": return <FiTool className="text-purple-500 text-xl" />;
    case "Electrical": return <FiTool className="text-orange-500 text-xl" />;
    default: return <FiHome className="text-gray-500 text-xl" />;
  }
};

const getStatusBadge = (status) => {
  switch(status) {
    case "pending":
    case "Pending":
      return (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <FiClock className="mr-1" size={12} /> Pending
        </span>
      );
    case "confirmed":
    case "Confirmed":
      return (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <FiCheckCircle className="mr-1" size={12} /> Confirmed
        </span>
      );
    case "completed":
    case "Completed":
      return (
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <FiCheckCircle className="mr-1" size={12} /> Completed
        </span>
      );
    case "rejected":
    case "Rejected":
    case "cancelled":
    case "Cancelled":
      return (
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <FiXCircle className="mr-1" size={12} /> {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    default:
      return (
        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {status}
        </span>
      );
  }
};

const BookingCard = ({ booking, onAccept, onReject, onComplete }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Format booking object from API for display
  const formattedBooking = {
    id: booking._id || booking.id,
    service: booking.service || 'Service',
    serviceType: booking.serviceType || 'Service',
    status: booking.status || 'pending',
    date: booking.date || new Date().toISOString(),
    time: booking.time || '12:00 PM',
    duration: booking.duration || '1 hour',
    address: booking.address || 'No address provided',
    client: {
      name: booking.client?.name || booking.clientName || 'Client',
      email: booking.client?.email || booking.clientEmail || 'client@example.com',
      phone: booking.client?.phone || booking.clientPhone || 'No phone provided'
    },
    description: booking.description || booking.notes || ''
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-200 bg-[#076870]">
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              {getServiceIcon(formattedBooking.serviceType)}
            </div>
            <h3 className="font-bold text-white truncate">{formattedBooking.service}</h3>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full">
            {getStatusBadge(formattedBooking.status)}
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className="p-4 border-b border-gray-200 space-y-2">
        <div className="flex items-center">
          <FiUser className="text-gray-400 mr-2 flex-shrink-0" />
          <span className="font-medium text-gray-800 truncate">{formattedBooking.client.name}</span>
        </div>
        <div className="flex items-center">
          <FiMail className="text-gray-400 mr-2 flex-shrink-0" />
          <span className="text-gray-600 truncate">{formattedBooking.client.email}</span>
        </div>
        <div className="flex items-center">
          <FiPhone className="text-gray-400 mr-2 flex-shrink-0" />
          <span className="text-gray-600 truncate">{formattedBooking.client.phone}</span>
        </div>
      </div>

      {/* Booking Details */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start space-x-2">
            <FiCalendar className="text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm font-medium text-gray-800">
                {new Date(formattedBooking.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <FiClock className="text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Time</p>
              <p className="text-sm font-medium text-gray-800">{formattedBooking.time}</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <FiClock className="text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="text-sm font-medium text-gray-800">{formattedBooking.duration}</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <FiMapPin className="text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-medium text-gray-800 truncate">
                {formattedBooking.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Details */}
      {showDetails && (
        <div className="border-b border-gray-200">
          {/* Description */}
          <div className="p-4">
            <h4 className="text-xs font-medium text-gray-500 mb-1">Description</h4>
            <p className="text-sm text-gray-600">
              {formattedBooking.description || "No additional details provided."}
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-4 mt-auto">
        {(formattedBooking.status === "pending" || formattedBooking.status === "Pending") ? (
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => onReject(formattedBooking.id)}
              className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg font-medium text-sm flex items-center justify-center transition-colors"
            >
              <FiX className="mr-1" /> Reject
            </button>
            <button 
              onClick={() => onAccept(formattedBooking.id)}
              className="bg-green-50 text-green-600 hover:bg-green-100 px-3 py-2 rounded-lg font-medium text-sm flex items-center justify-center transition-colors"
            >
              <FiCheck className="mr-1" /> Accept
            </button>
          </div>
        ) : formattedBooking.status === "confirmed" || formattedBooking.status === "Confirmed" ? (
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
            >
              {showDetails ? (
                <>
                  <FiChevronUp className="mr-1" /> Hide Details
                </>
              ) : (
                <>
                  <FiChevronDown className="mr-1" /> View Details
                </>
              )}
            </button>
            <button 
              onClick={() => onComplete(formattedBooking.id)} 
              className="bg-green-50 text-green-600 hover:bg-green-100 px-3 py-2 rounded-lg font-medium text-sm flex items-center justify-center transition-colors"
            >
              <FiCheckCircle className="mr-1" /> Mark Complete
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
            >
              {showDetails ? (
                <>
                  <FiChevronUp className="mr-1" /> Hide Details
                </>
              ) : (
                <>
                  <FiChevronDown className="mr-1" /> View Details
                </>
              )}
            </button>
            
            <Link 
              to={`/provider-dashboard/bookings/${formattedBooking.id}`}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center transition-colors"
            >
              View Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [bookings, setBookings] = useState({
    pending: [],
    upcoming: [],
    completed: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        // Fetch all bookings
        const result = await getUserBookings();
        
        if (result.success) {
          // Organize bookings by status
          const bookingsData = result.bookings || [];
          
          const organized = {
            pending: bookingsData.filter(b => b.status === 'pending' || b.status === 'Pending'),
            upcoming: bookingsData.filter(b => b.status === 'confirmed' || b.status === 'Confirmed'),
            completed: bookingsData.filter(b => b.status === 'completed' || b.status === 'Completed')
          };
          
          setBookings(organized);
        } else {
          throw new Error(result.error || 'Failed to fetch bookings');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err.message || 'Failed to load bookings. Please try again later.');
        
        // Set empty arrays as fallback
        setBookings({
          pending: [],
          upcoming: [],
          completed: []
        });
        
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleAccept = async (bookingId) => {
    try {
      const result = await updateBookingStatus(bookingId, 'confirmed');
      
      if (result.success) {
        // Update local state by moving the booking from pending to upcoming
        setBookings(prev => {
          const updatedBooking = prev.pending.find(b => b._id === bookingId || b.id === bookingId);
          if (!updatedBooking) return prev;
          
          updatedBooking.status = 'confirmed';
          
          return {
            pending: prev.pending.filter(b => b._id !== bookingId && b.id !== bookingId),
            upcoming: [...prev.upcoming, updatedBooking],
            completed: prev.completed
          };
        });
        
        setSuccessMessage('Booking accepted successfully!');
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        throw new Error(result.error || 'Failed to accept booking');
      }
    } catch (err) {
      console.error('Error accepting booking:', err);
      setError(err.message || 'Failed to accept booking. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleReject = async (bookingId) => {
    try {
      const result = await updateBookingStatus(bookingId, 'rejected');
      
      if (result.success) {
        // Update local state by removing the booking from pending
        setBookings(prev => ({
          pending: prev.pending.filter(b => b._id !== bookingId && b.id !== bookingId),
          upcoming: prev.upcoming,
          completed: prev.completed
        }));
        
        setSuccessMessage('Booking rejected successfully!');
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        throw new Error(result.error || 'Failed to reject booking');
      }
    } catch (err) {
      console.error('Error rejecting booking:', err);
      setError(err.message || 'Failed to reject booking. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleComplete = async (bookingId) => {
    try {
      const result = await completeBooking(bookingId);
      
      if (result.success) {
        // Update local state by moving the booking from upcoming to completed
        setBookings(prev => {
          const updatedBooking = prev.upcoming.find(b => b._id === bookingId || b.id === bookingId);
          if (!updatedBooking) return prev;
          
          updatedBooking.status = 'completed';
          
          return {
            pending: prev.pending,
            upcoming: prev.upcoming.filter(b => b._id !== bookingId && b.id !== bookingId),
            completed: [...prev.completed, updatedBooking]
          };
        });
        
        setSuccessMessage('Booking marked as completed!');
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        throw new Error(result.error || 'Failed to complete booking');
      }
    } catch (err) {
      console.error('Error completing booking:', err);
      setError(err.message || 'Failed to complete booking. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#076870]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiAlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiCheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide border-b border-gray-200">
        <button
          className={`py-3 px-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors ${activeTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('pending')}
        >
          <FiAlertCircle className="mr-2" />
          Pending Requests
          {bookings.pending.length > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {bookings.pending.length}
            </span>
          )}
        </button>
        <button
          className={`py-3 px-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors ${activeTab === 'upcoming' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          <FiCalendar className="mr-2" />
          Upcoming Bookings
          {bookings.upcoming.length > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {bookings.upcoming.length}
            </span>
          )}
        </button>
        <button
          className={`py-3 px-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors ${activeTab === 'completed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('completed')}
        >
          <FiCheckCircle className="mr-2" />
          Completed Bookings
          {bookings.completed.length > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {bookings.completed.length}
            </span>
          )}
        </button>
      </div>
      
      {/* Booking Cards Grid */}
      <div>
        {activeTab === 'pending' && (
          <div>
            {bookings.pending.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.pending.map(booking => (
                  <BookingCard 
                    key={booking._id || booking.id} 
                    booking={booking} 
                    onAccept={handleAccept}
                    onReject={handleReject}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center max-w-2xl mx-auto">
                <FiClock className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-700 mb-1">No Pending Requests</h3>
                <p className="text-gray-500">You don't have any pending booking requests at the moment.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div>
            {bookings.upcoming.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.upcoming.map(booking => (
                  <BookingCard 
                    key={booking._id || booking.id} 
                    booking={booking} 
                    onComplete={handleComplete}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center max-w-2xl mx-auto">
                <FiCalendar className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-700 mb-1">No Upcoming Bookings</h3>
                <p className="text-gray-500">You don't have any upcoming bookings scheduled.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'completed' && (
          <div>
            {bookings.completed.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.completed.map(booking => (
                  <BookingCard 
                    key={booking._id || booking.id} 
                    booking={booking}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center max-w-2xl mx-auto">
                <FiCheckCircle className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-700 mb-1">No Completed Bookings</h3>
                <p className="text-gray-500">Your completed bookings will appear here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;