import React, { useState } from 'react';
import {
  FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiX,
  FiSearch, FiFilter, FiEdit, FiDollarSign,
  FiChevronDown, FiEye, FiAlertTriangle, FiUser,
  FiTool, FiHome, FiMail, FiPhone, FiStar,
  FiArrowRight, FiInfo
} from 'react-icons/fi';

const BookingManagement = () => {
  // State management
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [selectedDisputes, setSelectedDisputes] = useState([]);
  const [selectedCancellations, setSelectedCancellations] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewedBooking, setViewedBooking] = useState(null);
  const [viewedDispute, setViewedDispute] = useState(null);
  const [viewedCancellation, setViewedCancellation] = useState(null);
  
  // Bookings data
  const [bookings, setBookings] = useState([
    {
      id: 'BK-001',
      customer: 'Mohammed Amine',
      tasker: 'CleanPro Team',
      service: 'Deep Cleaning',
      date: '2023-06-15',
      time: '10:00 AM',
      duration: '3 hours',
      price: 120,
      status: 'Upcoming',
      address: '123 Main St, Casablanca',
      contact: '+212 612-345678',
      rating: 4.8
    },
    {
      id: 'BK-002',
      customer: 'Fatima Zahra',
      tasker: 'CoolTech',
      service: 'AC Repair',
      date: '2023-06-12',
      time: '2:00 PM',
      duration: '2 hours',
      price: 85,
      status: 'Ongoing',
      address: '456 Palm Ave, Rabat',
      contact: '+212 678-901234',
      rating: 4.5
    },
    {
      id: 'BK-003',
      customer: 'Karim Alami',
      tasker: 'ColorMasters',
      service: 'Home Painting',
      date: '2023-06-10',
      time: '9:00 AM',
      duration: '6 hours',
      price: 200,
      status: 'Completed',
      address: '789 Olive Rd, Marrakech',
      contact: '+212 699-112233',
      rating: 4.7
    },
    {
      id: 'BK-004',
      customer: 'Amina Belhaj',
      tasker: 'PipeFix',
      service: 'Plumbing Service',
      date: '2023-06-08',
      time: '11:00 AM',
      duration: '1.5 hours',
      price: 65,
      status: 'Cancelled',
      address: '321 Cedar Ln, Tangier',
      contact: '+212 655-445566',
      rating: 4.3
    },
    {
      id: 'BK-005',
      customer: 'Youssef Kouri',
      tasker: 'ElectricPro',
      service: 'Electrical Wiring',
      date: '2023-06-18',
      time: '3:00 PM',
      duration: '2.5 hours',
      price: 110,
      status: 'Upcoming',
      address: '654 Pine St, Fes',
      contact: '+212 677-889900',
      rating: 4.6
    }
  ]);

  // Disputes data
  const [disputes, setDisputes] = useState([
    {
      id: 'DSP-001',
      bookingId: 'BK-002',
      customer: 'Fatima Zahra',
      tasker: 'CoolTech',
      service: 'AC Repair',
      issue: 'Service not completed as promised - technician left before finishing all tasks',
      status: 'Pending',
      date: '2023-06-12',
      severity: 'High'
    },
    {
      id: 'DSP-002',
      bookingId: 'BK-003',
      customer: 'Karim Alami',
      tasker: 'ColorMasters',
      service: 'Home Painting',
      issue: 'Poor quality paint job - uneven application and missed spots',
      status: 'Pending',
      date: '2023-06-10',
      severity: 'Medium'
    }
  ]);

  // Cancellation requests data
  const [cancellations, setCancellations] = useState([
    {
      id: 'CNL-001',
      bookingId: 'BK-004',
      customer: 'Amina Belhaj',
      tasker: 'PipeFix',
      service: 'Plumbing Service',
      reason: 'Double booked with another service provider',
      refundRequested: true,
      amount: 65,
      status: 'Pending',
      date: '2023-06-07'
    },
    {
      id: 'CNL-002',
      bookingId: 'BK-005',
      customer: 'Youssef Kouri',
      tasker: 'ElectricPro',
      service: 'Electrical Wiring',
      reason: 'Found a cheaper provider with immediate availability',
      refundRequested: false,
      amount: 0,
      status: 'Pending',
      date: '2023-06-16'
    }
  ]);

  // Statistics data
  const stats = {
    upcomingBookings: bookings.filter(b => b.status === 'Upcoming').length,
    ongoingBookings: bookings.filter(b => b.status === 'Ongoing').length,
    completedBookings: bookings.filter(b => b.status === 'Completed').length,
    cancelledBookings: bookings.filter(b => b.status === 'Cancelled').length,
    pendingDisputes: disputes.filter(d => d.status === 'Pending').length,
    pendingCancellations: cancellations.filter(c => c.status === 'Pending').length,
    totalRevenue: bookings
      .filter(b => b.status === 'Completed')
      .reduce((sum, booking) => sum + booking.price, 0)
  };

  // Filter bookings based on active tab and search
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.tasker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'upcoming' && booking.status === 'Upcoming') ||
      (activeTab === 'ongoing' && booking.status === 'Ongoing') ||
      (activeTab === 'completed' && booking.status === 'Completed') ||
      (activeTab === 'cancelled' && booking.status === 'Cancelled');
    
    return matchesSearch && matchesTab;
  });

  // Toggle selections
  const toggleBookingSelection = (id) => {
    setSelectedBookings(prev => prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]);
  };
  const toggleDisputeSelection = (id) => {
    setSelectedDisputes(prev => prev.includes(id) ? prev.filter(dId => dId !== id) : [...prev, id]);
  };
  const toggleCancellationSelection = (id) => {
    setSelectedCancellations(prev => prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]);
  };

  // Toggle select all
  const toggleSelectAll = (items, selected, setSelected) => {
    setSelected(selected.length === items.length ? [] : items.map(item => item.id));
  };

  // Status handlers
  const handleBookingStatusChange = (id, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };

  const handleDisputeResolution = (id, resolution) => {
    setDisputes(disputes.map(dispute => 
      dispute.id === id ? { ...dispute, status: resolution } : dispute
    ));
  };

  const handleCancellationResolution = (id, resolution) => {
    const updatedCancellations = cancellations.map(cancellation => 
      cancellation.id === id ? { ...cancellation, status: resolution } : cancellation
    );
    setCancellations(updatedCancellations);
    
    if (resolution === 'Approved') {
      const cancellation = updatedCancellations.find(c => c.id === id);
      if (cancellation) {
        setBookings(bookings.map(booking => 
          booking.id === cancellation.bookingId ? { ...booking, status: 'Cancelled' } : booking
        ));
      }
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      Upcoming: 'bg-blue-100 text-blue-800',
      Ongoing: 'bg-yellow-100 text-yellow-800',
      Completed: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Resolved: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800',
      Approved: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  // Detail item component for the modal
  const DetailItem = ({ label, value }) => (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-800 mt-1">{value}</p>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FiCalendar className="text-blue-500" size={20} />}
          title="Upcoming"
          value={stats.upcomingBookings}
          trend="+3 from yesterday"
          trendColor="text-blue-500"
          bgColor="bg-blue-50"
        />
        <StatCard
          icon={<FiClock className="text-yellow-500" size={20} />}
          title="Ongoing"
          value={stats.ongoingBookings}
          trend="2 in progress"
          trendColor="text-yellow-500"
          bgColor="bg-yellow-50"
        />
        <StatCard
          icon={<FiCheckCircle className="text-green-500" size={20} />}
          title="Completed"
          value={stats.completedBookings}
          trend="5 this week"
          trendColor="text-green-500"
          bgColor="bg-green-50"
        />
        <StatCard
          icon={<FiDollarSign className="text-purple-500" size={20} />}
          title="Revenue"
          value={`$${stats.totalRevenue}`}
          trend="12% increase"
          trendColor="text-purple-500"
          bgColor="bg-purple-50"
        />
      </div>

      {/* Main Bookings Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        {/* Section Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Bookings Overview</h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:border-[#276e76] transition-colors"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <FiFilter className="mr-2" />
                Filter
                <FiChevronDown className={`ml-1 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-3">
                  <div className="text-xs font-medium text-gray-500 mb-2">Filter by:</div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input type="checkbox" className="rounded text-[#276e76] focus:ring-[#276e76]" />
                      <span>Today</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input type="checkbox" className="rounded text-[#276e76] focus:ring-[#276e76]" />
                      <span>This Week</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input type="checkbox" className="rounded text-[#276e76] focus:ring-[#276e76]" />
                      <span>High Value (100+)</span>
                    </label>
                  </div>
                  <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
                    <button
                      className="text-xs text-gray-500 hover:text-gray-700"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Reset
                    </button>
                    <button
                      className="text-xs bg-[#276e76] text-white px-3 py-1 rounded hover:bg-[#1e565d]"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276e76] focus:border-[#276e76] outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-2 border-b border-gray-200">
          <div className="flex space-x-4">
            {['all', 'upcoming', 'ongoing', 'completed', 'cancelled'].map(tab => (
              <button
                key={tab}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-[#276e76] text-[#276e76]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab !== 'all' && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                    {bookings.filter(b => b.status === tab.charAt(0).toUpperCase() + tab.slice(1)).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                    onChange={() => toggleSelectAll(filteredBookings, selectedBookings, setSelectedBookings)}
                    className="rounded text-[#276e76] focus:ring-[#276e76] h-4 w-4"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.length > 0 ? (
                filteredBookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedBookings.includes(booking.id)}
                        onChange={() => toggleBookingSelection(booking.id)}
                        className="rounded text-[#276e76] focus:ring-[#276e76] h-4 w-4"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#276e76] bg-opacity-10 flex items-center justify-center text-[#276e76] font-medium">
                          {booking.id.split('-')[1]}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{booking.id}</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <FiStar className="mr-1 text-yellow-400" size={12} />
                            {booking.rating}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{booking.customer}</div>
                      <div className="text-xs text-gray-500">{booking.tasker}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{booking.service}</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <FiClock className="mr-1" size={12} />
                        {booking.duration}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.date}</div>
                      <div className="text-xs text-gray-500">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 flex items-center">
                        <FiDollarSign className="mr-1 text-gray-400" size={14} />
                        {booking.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          className="text-gray-600 hover:text-[#276e76] p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                          onClick={() => setViewedBooking(booking)}
                          title="View details"
                        >
                          <FiEye size={16} />
                        </button>
                        <button 
                          className="text-gray-600 hover:text-[#276e76] p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                          title="Edit booking"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button 
                          className="text-gray-600 hover:text-red-500 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                          title="Cancel booking"
                        >
                          <FiXCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center">
                    <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchQuery ? 'Try adjusting your search or filter' : 'There are currently no bookings matching this criteria'}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Secondary Sections */}
      
      {/* Disputes Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-[#1e565d]">Handle Disputes Between Taskers & Customers</h2>
          </div>
          <div className="flex items-center">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {stats.pendingDisputes} Pending
            </span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dispute ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {disputes.length > 0 ? (
                disputes.map(dispute => (
                  <tr key={dispute.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{dispute.id}</div>
                      <div className="text-xs text-gray-500">{dispute.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{dispute.bookingId}</div>
                      <div className="text-xs text-gray-500">{dispute.service}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-1">{dispute.issue}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Severity: <span className="font-medium">{dispute.severity}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={dispute.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {dispute.status === 'Pending' ? (
                        <div className="flex justify-end space-x-2">
                          <button
                            className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            onClick={() => handleDisputeResolution(dispute.id, 'Rejected')}
                          >
                            Reject
                          </button>
                          <button
                            className="px-3 py-1 text-xs bg-[#276e76] text-white rounded-lg hover:bg-[#1e565d] transition-colors"
                            onClick={() => handleDisputeResolution(dispute.id, 'Resolved')}
                          >
                            Resolve
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="text-[#276e76] hover:text-[#1e565d] text-sm flex items-center"
                          onClick={() => setViewedDispute(dispute)}
                        >
                          Details <FiArrowRight className="ml-1" size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    <FiAlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No disputes found</h3>
                    <p className="mt-1 text-sm text-gray-500">All disputes have been resolved</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Cancellations Section */}
      <div className="bg-white mt-5 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-[#1e565d]">Manage Cancellations & Refund Requests</h2>
          </div>
          <div className="flex items-center">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {stats.pendingCancellations} Pending
            </span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Refund
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cancellations.length > 0 ? (
                cancellations.map(cancellation => (
                  <tr key={cancellation.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{cancellation.id}</div>
                      <div className="text-xs text-gray-500">{cancellation.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{cancellation.bookingId}</div>
                      <div className="text-xs text-gray-500">{cancellation.service}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-1">{cancellation.reason}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {cancellation.refundRequested ? (
                        <div className="text-sm font-medium text-green-600">${cancellation.amount}</div>
                      ) : (
                        <div className="text-sm text-gray-500">None</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={cancellation.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {cancellation.status === 'Pending' ? (
                        <div className="flex justify-end space-x-2">
                          <button
                            className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            onClick={() => handleCancellationResolution(cancellation.id, 'Rejected')}
                          >
                            Reject
                          </button>
                          <button
                            className="px-3 py-1 text-xs bg-[#276e76] text-white rounded-lg hover:bg-[#1e565d] transition-colors"
                            onClick={() => handleCancellationResolution(cancellation.id, 'Approved')}
                          >
                            Approve
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="text-[#276e76] hover:text-[#1e565d] text-sm flex items-center"
                          onClick={() => setViewedCancellation(cancellation)}
                        >
                          Details <FiArrowRight className="ml-1" size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">
                    <FiInfo className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No cancellation requests</h3>
                    <p className="mt-1 text-sm text-gray-500">All cancellation requests have been processed</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {/* Booking Details Modal */}
      {viewedBooking && (
        <div className="fixed inset-0 bg-transparent bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl max-w-2xl w-full border border-gray-200 shadow-lg">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Booking Details</h2>
                  <p className="text-sm text-gray-600">ID: {viewedBooking.id}</p>
                </div>
                <button
                  onClick={() => setViewedBooking(null)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Booking Info */}
                <div className="space-y-3">
                  <DetailItem label="Status" value={viewedBooking.status} />
                  <DetailItem label="Service" value={viewedBooking.service} />
                  <DetailItem label="Tasker" value={viewedBooking.tasker} />
                </div>

                {/* Customer Info */}
                <div className="space-y-3">
                  <DetailItem label="Customer" value={viewedBooking.customer} />
                  <DetailItem label="Contact" value={viewedBooking.contact} />
                  <DetailItem label="Date & Time" value={`${viewedBooking.date} at ${viewedBooking.time}`} />

                </div>
              </div>

              {/* Additional Details */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <DetailItem label="Address" value={viewedBooking.address} />
                <DetailItem label="Special Instructions" value="None provided" />
                <DetailItem label="Booking Created" value="2023-06-01 14:30" />
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setViewedBooking(null)}
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-[#276e76] text-white rounded-lg hover:bg-[#1e565d] transition-colors">
                  Edit Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dispute Details Modal */}
      {viewedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Dispute Details</h2>
                  <p className="text-sm text-gray-500">ID: {viewedDispute.id}</p>
                </div>
                <button
                  onClick={() => setViewedDispute(null)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Booking ID</p>
                    <p className="text-sm font-medium text-gray-800">{viewedDispute.bookingId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Service</p>
                    <p className="text-sm font-medium text-gray-800">{viewedDispute.service}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Customer</p>
                    <p className="text-sm font-medium text-gray-800">{viewedDispute.customer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tasker</p>
                    <p className="text-sm font-medium text-gray-800">{viewedDispute.tasker}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date Reported</p>
                    <p className="text-sm font-medium text-gray-800">{viewedDispute.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Severity</p>
                    <p className="text-sm font-medium text-gray-800">{viewedDispute.severity}</p>
                  </div>
                </div>
                
                {/* Issue Description */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">ISSUE DESCRIPTION</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-800">{viewedDispute.issue}</p>
                  </div>
                </div>
                
                {/* Resolution */}
                {viewedDispute.status !== 'Pending' && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">RESOLUTION</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-800">
                        {viewedDispute.status === 'Resolved' 
                          ? 'The dispute has been resolved in favor of the customer. A partial refund of $50 was issued.'
                          : 'The dispute was rejected after review. No refund was issued.'}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Actions */}
                <div className="pt-4 border-t border-gray-200">
                  {viewedDispute.status === 'Pending' ? (
                    <div className="flex justify-end space-x-3">
                      <button
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          handleDisputeResolution(viewedDispute.id, 'Rejected');
                          setViewedDispute(null);
                        }}
                      >
                        Reject Dispute
                      </button>
                      <button
                        className="px-4 py-2 bg-[#276e76] text-white rounded-md hover:bg-[#1e565d] transition-colors"
                        onClick={() => {
                          handleDisputeResolution(viewedDispute.id, 'Resolved');
                          setViewedDispute(null);
                        }}
                      >
                        Resolve Dispute
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <button
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={() => setViewedDispute(null)}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Details Modal */}
      {viewedCancellation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Cancellation Request</h2>
                  <p className="text-sm text-gray-500">ID: {viewedCancellation.id}</p>
                </div>
                <button
                  onClick={() => setViewedCancellation(null)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Booking ID</p>
                    <p className="text-sm font-medium text-gray-800">{viewedCancellation.bookingId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Service</p>
                    <p className="text-sm font-medium text-gray-800">{viewedCancellation.service}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Customer</p>
                    <p className="text-sm font-medium text-gray-800">{viewedCancellation.customer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tasker</p>
                    <p className="text-sm font-medium text-gray-800">{viewedCancellation.tasker}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date Requested</p>
                    <p className="text-sm font-medium text-gray-800">{viewedCancellation.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Refund Amount</p>
                    <p className="text-sm font-medium text-gray-800">
                      {viewedCancellation.refundRequested ? `$${viewedCancellation.amount}` : 'None'}
                    </p>
                  </div>
                </div>
                
                {/* Cancellation Reason */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">CANCELLATION REASON</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-800">{viewedCancellation.reason}</p>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="pt-4 border-t border-gray-200">
                  {viewedCancellation.status === 'Pending' ? (
                    <div className="flex justify-end space-x-3">
                      <button
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          handleCancellationResolution(viewedCancellation.id, 'Rejected');
                          setViewedCancellation(null);
                        }}
                      >
                        Reject Request
                      </button>
                      <button
                        className="px-4 py-2 bg-[#276e76] text-white rounded-md hover:bg-[#1e565d] transition-colors"
                        onClick={() => {
                          handleCancellationResolution(viewedCancellation.id, 'Approved');
                          setViewedCancellation(null);
                        }}
                      >
                        Approve Request
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <button
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        onClick={() => setViewedCancellation(null)}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced StatCard Component
const StatCard = ({ icon, title, value, trend, trendColor = 'text-green-500', bgColor = 'bg-white' }) => (
  <div className={`${bgColor} p-5 rounded-xl border border-gray-200 shadow-xs transition-all hover:shadow-sm`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="p-2 rounded-lg bg-white bg-opacity-30 shadow-xs">
        {icon}
      </div>
    </div>
    <p className={`text-xs ${trendColor} mt-2 flex items-center`}>
      {trend.includes('+') ? (
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12 7a1 1 0 01-1 1H9v1h2a1 1 0 110 2H9v1h2a1 1 0 110 2H9v1a1 1 0 11-2 0v-1H5a1 1 0 110-2h2v-1H5a1 1 0 110-2h2V8H5a1 1 0 010-2h2V5a1 1 0 112 0v1h2a1 1 0 011 1z" clipRule="evenodd" />
        </svg>
      ) : trend.includes('-') ? (
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
        </svg>
      )}
      {trend}
    </p>
  </div>
);

export default BookingManagement;