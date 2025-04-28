import React, { useState, useEffect } from 'react';
import {
  FiClock, FiCheckCircle, FiXCircle, FiCalendar,
  FiMapPin, FiUser, FiMail, FiPhone, FiAlertCircle,
  FiHome, FiTool, FiTrash2, FiCheck, FiX, FiChevronDown, FiChevronUp
} from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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
    case "Pending":
      return (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <FiClock className="mr-1" size={12} /> Pending
        </span>
      );
    case "Confirmed":
      return (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <FiCheckCircle className="mr-1" size={12} /> Confirmed
        </span>
      );
    case "Completed":
      return (
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <FiCheckCircle className="mr-1" size={12} /> Completed
        </span>
      );
    case "Rejected":
      return (
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <FiXCircle className="mr-1" size={12} /> Rejected
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

const BookingCard = ({ booking, onAccept, onReject }) => {
  const [showMap, setShowMap] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-200 bg-[#076870]">
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              {getServiceIcon(booking.serviceType)}
            </div>
            <h3 className="font-bold text-white truncate">{booking.service}</h3>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full">
            {getStatusBadge(booking.status)}
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className="p-4 border-b border-gray-200 space-y-2">
        <div className="flex items-center">
          <FiUser className="text-gray-400 mr-2 flex-shrink-0" />
          <span className="font-medium text-gray-800 truncate">{booking.client.name}</span>
        </div>
        <div className="flex items-center">
          <FiMail className="text-gray-400 mr-2 flex-shrink-0" />
          <span className="text-gray-600 truncate">{booking.client.email}</span>
        </div>
        <div className="flex items-center">
          <FiPhone className="text-gray-400 mr-2 flex-shrink-0" />
          <span className="text-gray-600 truncate">{booking.client.phone}</span>
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
                {new Date(booking.date).toLocaleDateString('en-US', { 
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
              <p className="text-sm font-medium text-gray-800">{booking.time}</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <FiClock className="text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="text-sm font-medium text-gray-800">{booking.duration}</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <FiMapPin className="text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <button 
                onClick={() => setShowMap(!showMap)}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                {showMap ? 'Hide Map' : 'View Map'}
              </button>
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
            <p className="text-sm text-gray-600">{booking.description}</p>
          </div>

          {/* Map */}
          {showMap && (
            <div className="p-4 pt-0">
              <div className="h-48 rounded-lg overflow-hidden border border-gray-200">
                <MapContainer 
                  center={booking.location.coordinates} 
                  zoom={15} 
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={booking.location.coordinates}>
                    <Popup>{booking.address}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-4 mt-auto">
        {booking.status === "Pending" ? (
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => onReject(booking._id)}
              className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg font-medium text-sm flex items-center justify-center transition-colors"
            >
              <FiX className="mr-1" /> Reject
            </button>
            <button 
              onClick={() => onAccept(booking._id)}
              className="bg-green-50 text-green-600 hover:bg-green-100 px-3 py-2 rounded-lg font-medium text-sm flex items-center justify-center transition-colors"
            >
              <FiCheck className="mr-1" /> Accept
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
            {booking.status === "Confirmed" && (
              <button className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center transition-colors">
                Reschedule
              </button>
            )}
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

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/bookings', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Organize bookings by status
        const bookingsArray = response.data.bookings || [];

        const organizedBookings = {
          pending: bookingsArray.filter(b => b.status === 'Pending'),
          upcoming: bookingsArray.filter(b => b.status === 'Confirmed'),
          completed: bookingsArray.filter(b => b.status === 'Completed')
        };
        
        setBookings(organizedBookings);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleAccept = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/bookings/${bookingId}`, 
        { status: 'Confirmed' },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Update local state
      const updatedBookings = {...bookings};
      const bookingIndex = updatedBookings.pending.findIndex(b => b._id === bookingId);
      if (bookingIndex !== -1) {
        const acceptedBooking = {...updatedBookings.pending[bookingIndex], status: "Confirmed"};
        updatedBookings.pending.splice(bookingIndex, 1);
        updatedBookings.upcoming.unshift(acceptedBooking);
        setBookings(updatedBookings);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReject = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/bookings/${bookingId}`, 
        { status: 'Rejected' },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Update local state
      const updatedBookings = {...bookings};
      updatedBookings.pending = updatedBookings.pending.filter(b => b._id !== bookingId);
      setBookings(updatedBookings);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#076870]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiAlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading bookings: {error}
              </p>
            </div>
          </div>
        </div>
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
              <p className="text-sm text-red-700">
                {error}
              </p>
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
                    key={booking._id} 
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
                    key={booking._id} 
                    booking={booking} 
                    onAccept={handleAccept}
                    onReject={handleReject}
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
                    key={booking._id} 
                    booking={booking} 
                    onAccept={handleAccept}
                    onReject={handleReject}
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