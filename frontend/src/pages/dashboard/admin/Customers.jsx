import React, { useState } from 'react';
import {
  FiUsers, FiCalendar, FiAlertCircle, FiStar,
  FiSearch, FiFilter, FiMail, FiTrash2,
  FiChevronDown, FiEye, FiEdit, FiPlus,
  FiPhone, FiCheck, FiX
} from 'react-icons/fi';

const CustomerManagement = () => {
  // State management
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Mohammed Amine',
      email: 'm.amine@example.com',
      phone: '+212 612-345678',
      bookings: 4,
      complaints: 0,
      status: 'active',
      joinDate: '2023-01-15',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Fatima Zahra',
      email: 'f.zahra@example.com',
      phone: '+212 678-901234',
      bookings: 12,
      complaints: 1,
      status: 'active',
      joinDate: '2022-11-20',
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Karim Alami',
      email: 'k.alami@example.com',
      phone: '+212 699-112233',
      bookings: 2,
      complaints: 3,
      status: 'inactive',
      joinDate: '2023-03-05',
      lastActive: '3 weeks ago'
    }
  ]);

  // Statistics data
  const stats = {
    totalCustomers: customers.length,
    activeBookings: customers.reduce((sum, c) => sum + c.bookings, 0),
    pendingComplaints: customers.reduce((sum, c) => sum + c.complaints, 0),
    avgRating: 4.7
  };

  // Filter customers based on search and active tab
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || customer.status === activeTab;
    return matchesSearch && matchesTab;
  });

  // Toggle customer selection
  const toggleCustomerSelection = (id) => {
    setSelectedCustomers(prev =>
      prev.includes(id)
        ? prev.filter(cId => cId !== id)
        : [...prev, id]
    );
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map(c => c.id));
    }
  };

  // Handle new customer form
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const newId = Math.max(...customers.map(c => c.id)) + 1;
    const customerToAdd = {
      ...newCustomer,
      id: newId,
      bookings: 0,
      complaints: 0,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: 'Just now'
    };
    setCustomers([...customers, customerToAdd]);
    setShowAddCustomer(false);
    setNewCustomer({ name: '', email: '', phone: '', status: 'active' });
  };

  // Handle delete customers
  const handleDeleteCustomers = () => {
    setCustomers(customers.filter(c => !selectedCustomers.includes(c.id)));
    setSelectedCustomers([]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FiUsers className="text-blue-500" size={20} />}
          title="Total Customers"
          value={stats.totalCustomers}
          trend="+12% from last month"
          trendColor="text-green-500"
        />
        <StatCard
          icon={<FiCalendar className="text-green-500" size={20} />}
          title="Active Bookings"
          value={stats.activeBookings}
          trend="+5 from last week"
          trendColor="text-green-500"
        />
        <StatCard
          icon={<FiAlertCircle className="text-yellow-500" size={20} />}
          title="Pending Complaints"
          value={stats.pendingComplaints}
          trend="2 unresolved"
          trendColor="text-red-500"
        />
        <StatCard
          icon={<FiStar className="text-purple-500" size={20} />}
          title="Avg. Rating"
          value={stats.avgRating}
          trend="+0.2 points"
          trendColor="text-green-500"
        />
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Navigation and Actions */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {['all', 'active', 'inactive'].map(tab => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm rounded-md transition-all ${
                    activeTab === tab
                      ? 'bg-white shadow-sm text-[#276e76] font-medium'
                      : 'text-gray-600 hover:text-gray-800'
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Add Customer Button */}
            <button
              onClick={() => setShowAddCustomer(true)}
              className="flex items-center px-4 py-2 bg-[#276e76] text-white rounded-lg hover:bg-[#1e565d] transition-colors"
            >
              <FiPlus className="mr-2" />
              Add Customer
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:w-96">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers by name or email..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276e76] focus:border-[#276e76] outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex space-x-2 w-full md:w-auto">
              <div className="relative">
                <button
                  className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:border-[#276e76]"
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
                        <input type="checkbox" className="rounded text-[#276e76]" />
                        <span>New This Month</span>
                      </label>
                      <label className="flex items-center space-x-2 text-sm text-gray-700">
                        <input type="checkbox" className="rounded text-[#276e76]" />
                        <span>With Bookings</span>
                      </label>
                      <label className="flex items-center space-x-2 text-sm text-gray-700">
                        <input type="checkbox" className="rounded text-[#276e76]" />
                        <span>With Complaints</span>
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

              <button
                className={`flex items-center px-3 py-2 rounded-lg ${selectedCustomers.length > 0 ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                disabled={selectedCustomers.length === 0}
              >
                <FiMail className="mr-2" />
                Email
              </button>
              <button
                className={`flex items-center px-3 py-2 rounded-lg ${selectedCustomers.length > 0 ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                disabled={selectedCustomers.length === 0}
                onClick={handleDeleteCustomers}
              >
                <FiTrash2 className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded text-[#276e76] focus:ring-[#276e76]"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
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
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map(customer => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => toggleCustomerSelection(customer.id)}
                        className="rounded text-[#276e76] focus:ring-[#276e76]"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#276e76] bg-opacity-10 flex items-center justify-center text-[#276e76] font-medium">
                          {customer.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">Joined {customer.joinDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{customer.email}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <FiPhone className="mr-1" size={14} />
                        {customer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{customer.bookings} bookings</div>
                      <div className="text-sm text-gray-500">{customer.complaints} complaints</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#276e76] hover:text-[#1e565d] mr-3">
                        <FiEye className="inline mr-1" /> View
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FiEdit className="inline mr-1" /> Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No customers found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Add New Customer</h3>
                <button
                  onClick={() => setShowAddCustomer(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleAddCustomer}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={newCustomer.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276e76] focus:border-[#276e76] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={newCustomer.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276e76] focus:border-[#276e76] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={newCustomer.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276e76] focus:border-[#276e76] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select
                      name="status"
                      value={newCustomer.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276e76] focus:border-[#276e76] outline-none"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddCustomer(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#276e76] text-white rounded-lg hover:bg-[#1e565d]"
                  >
                    Add Customer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// StatCard Component
const StatCard = ({ icon, title, value, trend, trendColor = 'text-green-500' }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
    <div className="flex items-center">
      <div className="p-2 rounded-lg bg-opacity-10 mr-3">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
    <p className={`text-xs ${trendColor} mt-2`}>{trend}</p>
  </div>
);

export default CustomerManagement;