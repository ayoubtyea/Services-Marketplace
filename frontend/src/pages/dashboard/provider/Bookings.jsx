import React, { useState } from 'react';
import {
  FiClock, FiCheckCircle, FiXCircle, FiCalendar,
  FiMapPin, FiUser, FiMail, FiPhone, FiAlertCircle,
  FiHome, FiTool, FiTrash2, FiCheck, FiX, FiChevronDown, FiChevronUp
} from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Enhanced sample data for bookings
const sampleBookings = {
  pending: [
    {
      id: 1,
      service: "Deep Cleaning",
      client: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 (555) 123-4567",
      date: "2023-06-20",
      time: "10:00 AM",
      duration: "2 hours",
      address: "123 Main St, New York, NY 10001",
      description: "Need deep cleaning for my 2-bedroom apartment before moving in.",
      coordinates: [40.7128, -74.0060],
      status: "Pending",
      serviceType: "Regular Cleaning",
      requestedOn: "2023-06-10"
    },
    {
      id: 4,
      service: "Carpet Cleaning",
      client: "Emma Watson",
      email: "emma@example.com",
      phone: "+1 (555) 765-4321",
      date: "2023-06-21",
      time: "1:00 PM",
      duration: "3 hours",
      address: "321 Elm St, Jersey City, NJ 07302",
      description: "Deep carpet cleaning for entire house after renovation.",
      coordinates: [40.7178, -74.0431],
      status: "Pending",
      serviceType: "Regular Cleaning",
      requestedOn: "2023-06-11"
    },
    {
      id: 5,
      service: "Window Cleaning",
      client: "Robert Downey",
      email: "robert@example.com",
      phone: "+1 (555) 321-6547",
      date: "2023-06-23",
      time: "11:00 AM",
      duration: "1.5 hours",
      address: "654 Maple Ave, Hoboken, NJ 07030",
      description: "Exterior window cleaning for 3-story townhouse.",
      coordinates: [40.7439, -74.0324],
      status: "Pending",
      serviceType: "Regular Cleaning",
      requestedOn: "2023-06-12"
    }
  ],
  upcoming: [
    {
      id: 2,
      service: "AC Maintenance",
      client: "Michael Brown",
      email: "michael@example.com",
      phone: "+1 (555) 987-6543",
      date: "2023-06-22",
      time: "2:30 PM",
      duration: "1.5 hours",
      address: "456 Oak Ave, Brooklyn, NY 11201",
      description: "Annual AC maintenance check before summer season.",
      coordinates: [40.6782, -73.9442],
      status: "Confirmed",
      serviceType: "Appliance Repair",
      requestedOn: "2023-06-05"
    },
    {
      id: 6,
      service: "Plumbing Inspection",
      client: "Jennifer Lopez",
      email: "jennifer@example.com",
      phone: "+1 (555) 456-1234",
      date: "2023-06-24",
      time: "9:30 AM",
      duration: "2 hours",
      address: "987 Cedar Ln, Staten Island, NY 10301",
      description: "Full plumbing system inspection for potential leaks.",
      coordinates: [40.5834, -74.1496],
      status: "Confirmed",
      serviceType: "Plumbing",
      requestedOn: "2023-06-08"
    },
    {
      id: 7,
      service: "Electrical Wiring",
      client: "Tom Cruise",
      email: "tom@example.com",
      phone: "+1 (555) 789-1234",
      date: "2023-06-25",
      time: "3:00 PM",
      duration: "4 hours",
      address: "753 Pine St, Bronx, NY 10451",
      description: "Rewiring of kitchen outlets and light fixtures.",
      coordinates: [40.8222, -73.9217],
      status: "Confirmed",
      serviceType: "Electrical",
      requestedOn: "2023-06-09"
    }
  ],
  completed: [
    {
      id: 3,
      service: "Plumbing Repair",
      client: "David Wilson",
      email: "david@example.com",
      phone: "+1 (555) 456-7890",
      date: "2023-06-15",
      time: "9:00 AM",
      duration: "1 hour",
      address: "789 Pine Rd, Queens, NY 11375",
      description: "Fixed leaky kitchen faucet and replaced washers.",
      coordinates: [40.7282, -73.7949],
      status: "Completed",
      serviceType: "Plumbing",
      requestedOn: "2023-06-01"
    },
    {
      id: 8,
      service: "Appliance Installation",
      client: "Chris Evans",
      email: "chris@example.com",
      phone: "+1 (555) 123-7890",
      date: "2023-06-14",
      time: "10:30 AM",
      duration: "2.5 hours",
      address: "159 Birch Blvd, Manhattan, NY 10016",
      description: "Installed new dishwasher and garbage disposal.",
      coordinates: [40.7456, -73.9784],
      status: "Completed",
      serviceType: "Appliance Repair",
      requestedOn: "2023-05-28"
    },
    {
      id: 9,
      service: "Deep Cleaning",
      client: "Scarlett Johansson",
      email: "scarlett@example.com",
      phone: "+1 (555) 789-4561",
      date: "2023-06-12",
      time: "1:00 PM",
      duration: "3 hours",
      address: "357 Walnut Dr, Brooklyn, NY 11215",
      description: "Post-renovation deep cleaning of entire apartment.",
      coordinates: [40.6770, -73.9712],
      status: "Completed",
      serviceType: "Regular Cleaning",
      requestedOn: "2023-05-25"
    }
  ]
};

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
          <span className="font-medium text-gray-800 truncate">{booking.client}</span>
        </div>
        <div className="flex items-center">
          <FiMail className="text-gray-400 mr-2 flex-shrink-0" />
          <span className="text-gray-600 truncate">{booking.email}</span>
        </div>
        <div className="flex items-center">
          <FiPhone className="text-gray-400 mr-2 flex-shrink-0" />
          <span className="text-gray-600 truncate">{booking.phone}</span>
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
                  center={booking.coordinates} 
                  zoom={15} 
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={booking.coordinates}>
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
              onClick={() => onReject(booking.id)}
              className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg font-medium text-sm flex items-center justify-center transition-colors"
            >
              <FiX className="mr-1" /> Reject
            </button>
            <button 
              onClick={() => onAccept(booking.id)}
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
  const [bookings, setBookings] = useState(sampleBookings);

  const handleAccept = (bookingId) => {
    const updatedBookings = {...bookings};
    const bookingIndex = updatedBookings.pending.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
      const acceptedBooking = {...updatedBookings.pending[bookingIndex], status: "Confirmed"};
      updatedBookings.pending.splice(bookingIndex, 1);
      updatedBookings.upcoming.unshift(acceptedBooking);
      setBookings(updatedBookings);
    }
  };

  const handleReject = (bookingId) => {
    const updatedBookings = {...bookings};
    const bookingIndex = updatedBookings.pending.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
      const rejectedBooking = {...updatedBookings.pending[bookingIndex], status: "Rejected"};
      updatedBookings.pending.splice(bookingIndex, 1);
      setBookings(updatedBookings);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
     
      
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
                    key={booking.id} 
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
                    key={booking.id} 
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
                    key={booking.id} 
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