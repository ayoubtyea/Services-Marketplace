import React, { useState } from 'react';
import {
  FiLayers, FiCheckCircle, FiClock, FiTrendingUp,
  FiSearch, FiFilter, FiEdit, FiTrash2,
  FiChevronDown, FiEye, FiPlus, FiX,FiStar,
  FiAlertCircle, FiDollarSign, FiUser, FiCalendar,
} from 'react-icons/fi';

const ServicesManagement = () => {
  // State management
  const [activeTab, setActiveTab] = useState('listed'); // 'listed' or 'requests'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const [viewedService, setViewedService] = useState(null);
  const [viewedRequest, setViewedRequest] = useState(null);
  
  // Services data
  const [services, setServices] = useState([
    {
      id: 'SVC-001',
      name: 'Deep Cleaning',
      category: 'Cleaning',
      price: 120,
      duration: '3 hours',
      status: 'Active',
      provider: 'CleanPro',
      rating: 4.8,
      bookings: 42,
      createdAt: '2023-01-15'
    },
    {
      id: 'SVC-002',
      name: 'AC Repair',
      category: 'Plumbing',
      price: 85,
      duration: '2 hours',
      status: 'Active',
      provider: 'CoolTech',
      rating: 4.5,
      bookings: 28,
      createdAt: '2023-02-20'
    },
    {
      id: 'SVC-003',
      name: 'Home Painting',
      category: 'Renovation',
      price: 200,
      duration: '6 hours',
      status: 'Inactive',
      provider: 'ColorMasters',
      rating: 4.7,
      bookings: 15,
      createdAt: '2023-03-10'
    },
    {
      id: 'SVC-004',
      name: 'Plumbing Service',
      category: 'Maintenance',
      price: 65,
      duration: '1.5 hours',
      status: 'Active',
      provider: 'PipeFix',
      rating: 4.3,
      bookings: 36,
      createdAt: '2023-04-05'
    }
  ]);

  // Service requests data
  const [serviceRequests, setServiceRequests] = useState([
    {
      id: 'REQ-001',
      serviceName: 'Gardening Service',
      category: 'Landscaping',
      requester: 'GreenThumb LLC',
      contact: 'contact@greenthumb.com',
      proposedPrice: 90,
      status: 'Pending',
      dateSubmitted: '2023-05-15',
      description: 'Professional gardening and lawn maintenance service'
    },
    {
      id: 'REQ-002',
      serviceName: 'Carpet Cleaning',
      category: 'Cleaning',
      requester: 'FreshCarpets Inc',
      contact: 'info@freshcarpets.com',
      proposedPrice: 75,
      status: 'Approved',
      dateSubmitted: '2023-05-18',
      description: 'Deep cleaning for all types of carpets and rugs'
    },
    {
      id: 'REQ-003',
      serviceName: 'Electrical Wiring',
      category: 'Maintenance',
      requester: 'SafeWire Solutions',
      contact: 'support@safewire.com',
      proposedPrice: 110,
      status: 'Rejected',
      dateSubmitted: '2023-05-20',
      description: 'Complete electrical wiring and repair services'
    },
    {
      id: 'REQ-004',
      serviceName: 'Furniture Assembly',
      category: 'Handyman',
      requester: 'AssembleRight Co',
      contact: 'hello@assembleright.com',
      proposedPrice: 50,
      status: 'Pending',
      dateSubmitted: '2023-05-22',
      description: 'Professional furniture assembly and installation'
    }
  ]);

  // Statistics data
  const stats = {
    totalServices: services.length,
    activeServices: services.filter(s => s.status === 'Active').length,
    pendingApprovals: serviceRequests.filter(r => r.status === 'Pending').length,
    topCategory: services.reduce((acc, service) => {
      acc[service.category] = (acc[service.category] || 0) + 1;
      return acc;
    }, {})
  };

  stats.topCategory = Object.entries(stats.topCategory).sort((a, b) => b[1] - a[1])[0][0];

  // Filter services based on search
  const filteredServices = services.filter(service => {
    return service.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Filter requests based on search
  const filteredRequests = serviceRequests.filter(request => {
    return request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requester.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Toggle service selection
  const toggleServiceSelection = (id) => {
    setSelectedServices(prev =>
      prev.includes(id)
        ? prev.filter(sId => sId !== id)
        : [...prev, id]
    );
  };

  // Toggle request selection
  const toggleRequestSelection = (id) => {
    setSelectedRequests(prev =>
      prev.includes(id)
        ? prev.filter(rId => rId !== id)
        : [...prev, id]
    );
  };

  // Toggle select all services
  const toggleSelectAllServices = () => {
    if (selectedServices.length === filteredServices.length) {
      setSelectedServices([]);
    } else {
      setSelectedServices(filteredServices.map(s => s.id));
    }
  };

  // Toggle select all requests
  const toggleSelectAllRequests = () => {
    if (selectedRequests.length === filteredRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(filteredRequests.map(r => r.id));
    }
  };

  // Handle delete services
  const handleDeleteServices = () => {
    setServices(services.filter(s => !selectedServices.includes(s.id)));
    setSelectedServices([]);
  };

  // Handle delete requests
  const handleDeleteRequests = () => {
    setServiceRequests(serviceRequests.filter(r => !selectedRequests.includes(r.id)));
    setSelectedRequests([]);
  };

  // Handle service status change
  const handleServiceStatusChange = (id, newStatus) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, status: newStatus } : service
    ));
  };

  // Handle request status change
  const handleRequestStatusChange = (id, newStatus) => {
    setServiceRequests(serviceRequests.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ));
  };

  // Handle new service form
  const [newService, setNewService] = useState({
    name: '',
    category: '',
    price: '',
    duration: '',
    provider: '',
    status: 'Active'
  });

  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };

  const handleAddService = (e) => {
    e.preventDefault();
    const newId = `SVC-${String(services.length + 1).padStart(3, '0')}`;
    const serviceToAdd = {
      ...newService,
      id: newId,
      price: Number(newService.price),
      rating: 0,
      bookings: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setServices([...services, serviceToAdd]);
    setShowAddService(false);
    setNewService({
      name: '',
      category: '',
      price: '',
      duration: '',
      provider: '',
      status: 'Active'
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FiLayers className="text-blue-500" size={20} />}
          title="Total Services"
          value={stats.totalServices}
          trend="+5 from last month"
          trendColor="text-green-500"
        />
        <StatCard
          icon={<FiCheckCircle className="text-green-500" size={20} />}
          title="Active Services"
          value={stats.activeServices}
          trend="3 newly activated"
          trendColor="text-green-500"
        />
        <StatCard
          icon={<FiClock className="text-yellow-500" size={20} />}
          title="Pending Approvals"
          value={stats.pendingApprovals}
          trend="Need review"
          trendColor="text-yellow-500"
        />
        <StatCard
          icon={<FiTrendingUp className="text-purple-500" size={20} />}
          title="Top Category"
          value={stats.topCategory}
          trend="Most popular"
          trendColor="text-purple-500"
        />
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Navigation and Actions */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                className={`px-4 py-2 text-sm rounded-md transition-all ${
                  activeTab === 'listed'
                    ? 'bg-white shadow-sm text-[#276e76] font-medium'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('listed')}
              >
                Listed Services
              </button>
              <button
                className={`px-4 py-2 text-sm rounded-md transition-all ${
                  activeTab === 'requests'
                    ? 'bg-white shadow-sm text-[#276e76] font-medium'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('requests')}
              >
                Service Requests
              </button>
            </div>

            {/* Add Service Button */}
            {activeTab === 'listed' && (
              <button
                className="flex items-center px-4 py-2 bg-[#276e76] text-white rounded-lg hover:bg-[#1e565d]"
                onClick={() => setShowAddService(true)}
              >
                <FiPlus className="mr-2" />
                Add Service
              </button>
            )}

            {/* Filter Button */}
            <button
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:border-[#276e76]"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FiFilter className="mr-2" />
              Filter
              <FiChevronDown className={`ml-1 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
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
                placeholder={
                  activeTab === 'listed' 
                    ? 'Search services by name, category, or provider...' 
                    : 'Search requests by service, category, or requester...'
                }
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276e76] focus:border-[#276e76] outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex space-x-2 w-full md:w-auto">
              <div className="relative">
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-3">
                    <div className="text-xs font-medium text-gray-500 mb-2">Filter by:</div>
                    <div className="space-y-2">
                      {activeTab === 'listed' ? (
                        <>
                          <label className="flex items-center space-x-2 text-sm text-gray-700">
                            <input type="checkbox" className="rounded text-[#276e76]" />
                            <span>Active Only</span>
                          </label>
                          <label className="flex items-center space-x-2 text-sm text-gray-700">
                            <input type="checkbox" className="rounded text-[#276e76]" />
                            <span>Popular (4+ rating)</span>
                          </label>
                          <label className="flex items-center space-x-2 text-sm text-gray-700">
                            <input type="checkbox" className="rounded text-[#276e76]" />
                            <span>High Demand (10+ bookings)</span>
                          </label>
                        </>
                      ) : (
                        <>
                          <label className="flex items-center space-x-2 text-sm text-gray-700">
                            <input type="checkbox" className="rounded text-[#276e76]" />
                            <span>Pending</span>
                          </label>
                          <label className="flex items-center space-x-2 text-sm text-gray-700">
                            <input type="checkbox" className="rounded text-[#276e76]" />
                            <span>Approved</span>
                          </label>
                          <label className="flex items-center space-x-2 text-sm text-gray-700">
                            <input type="checkbox" className="rounded text-[#276e76]" />
                            <span>Rejected</span>
                          </label>
                        </>
                      )}
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
                className={`flex items-center px-3 py-2 rounded-lg ${
                  (activeTab === 'listed' ? selectedServices.length > 0 : selectedRequests.length > 0) 
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={activeTab === 'listed' ? selectedServices.length === 0 : selectedRequests.length === 0}
              >
                <FiEdit className="mr-2" />
                Edit
              </button>
              <button
                className={`flex items-center px-3 py-2 rounded-lg ${
                  (activeTab === 'listed' ? selectedServices.length > 0 : selectedRequests.length > 0) 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={activeTab === 'listed' ? selectedServices.length === 0 : selectedRequests.length === 0}
                onClick={activeTab === 'listed' ? handleDeleteServices : handleDeleteRequests}
              >
                <FiTrash2 className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Services Table */}
        {activeTab === 'listed' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedServices.length === filteredServices.length && filteredServices.length > 0}
                      onChange={toggleSelectAllServices}
                      className="rounded text-[#276e76] focus:ring-[#276e76]"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
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
                {filteredServices.length > 0 ? (
                  filteredServices.map(service => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(service.id)}
                          onChange={() => toggleServiceSelection(service.id)}
                          className="rounded text-[#276e76] focus:ring-[#276e76]"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{service.id}</div>
                        <div className="text-xs text-gray-500">{service.createdAt}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{service.name}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <FiStar className="mr-1 text-yellow-500" size={12} />
                          {service.rating} ({service.bookings} bookings)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{service.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <FiDollarSign className="mr-1" size={14} />
                          {service.price}
                        </div>
                        <div className="text-xs text-gray-500">{service.duration}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{service.provider}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="inline-block relative">
                          <select
                            value={service.status}
                            onChange={(e) => handleServiceStatusChange(service.id, e.target.value)}
                            className={`text-xs font-medium rounded-full px-2 py-1 appearance-none focus:outline-none focus:ring-0 ${
                              service.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                          <FiChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none" size={12} />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-[#276e76] hover:text-[#1e565d] mr-3"
                          onClick={() => setViewedService(service)}
                        >
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
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                      No services found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Requests Table */}
        {activeTab === 'requests' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedRequests.length === filteredRequests.length && filteredRequests.length > 0}
                      onChange={toggleSelectAllRequests}
                      className="rounded text-[#276e76] focus:ring-[#276e76]"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requester
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proposed Price
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
                {filteredRequests.length > 0 ? (
                  filteredRequests.map(request => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedRequests.includes(request.id)}
                          onChange={() => toggleRequestSelection(request.id)}
                          className="rounded text-[#276e76] focus:ring-[#276e76]"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{request.id}</div>
                        <div className="text-xs text-gray-500">{request.dateSubmitted}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{request.serviceName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{request.category}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{request.requester}</div>
                        <div className="text-xs text-gray-500">{request.contact}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <FiDollarSign className="mr-1" size={14} />
                          {request.proposedPrice}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="inline-block relative">
                          <select
                            value={request.status}
                            onChange={(e) => handleRequestStatusChange(request.id, e.target.value)}
                            className={`text-xs font-medium rounded-full px-2 py-1 appearance-none focus:outline-none focus:ring-0 ${
                              request.status === 'Pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : request.status === 'Approved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <FiChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 pointer-events-none" size={12} />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-[#276e76] hover:text-[#1e565d] mr-3"
                          onClick={() => setViewedRequest(request)}
                        >
                          <FiEye className="inline mr-1" /> View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                      No service requests found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Service Modal */}
      {showAddService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Add New Service</h3>
                <button
                  onClick={() => setShowAddService(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleAddService}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={newService.name}
                      onChange={handleServiceInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276e76] focus:border-[#276e76] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <input
                      type="text"
                      name="category"
                      value={newService.category}
                      onChange={handleServiceInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276e76] focus:border-[#276e76] outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiDollarSign className="text-gray-400" />
                        </div>
                        <input
                          type="number"
                          name="price"
                          value={newService.price}
                          onChange={handleServiceInputChange}
                          className="pl-8 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276e76] focus:border-[#276e76] outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                      <input
                        type="text"
                        name="duration"
                        value={newService.duration}
                        onChange={handleServiceInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276e76] focus:border-[#276e76] outline-none"
                        required
                        placeholder="e.g. 2 hours"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provider *</label>
                    <input
                      type="text"
                      name="provider"
                      value={newService.provider}
                      onChange={handleServiceInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276e76] focus:border-[#276e76] outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select
                      name="status"
                      value={newService.status}
                      onChange={handleServiceInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276e76] focus:border-[#276e76] outline-none"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddService(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#276e76] text-white rounded-lg hover:bg-[#1e565d]"
                  >
                    Add Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Service Details Modal */}
      {viewedService && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{viewedService.name}</h3>
                  <p className="text-sm text-gray-500">Service ID: {viewedService.id}</p>
                </div>
                <button
                  onClick={() => setViewedService(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={20} />
                </button>
              </div>
        
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="text-sm font-medium text-gray-800">{viewedService.category}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Provider</p>
                    <p className="text-sm font-medium text-gray-800">{viewedService.provider}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      viewedService.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {viewedService.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-sm font-medium text-gray-800 flex items-center">
                      <FiDollarSign className="mr-1" size={14} />
                      {viewedService.price} ({viewedService.duration})
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Rating & Bookings</p>
                    <p className="text-sm font-medium text-gray-800 flex items-center">
                      <FiStar className="mr-1 text-yellow-500" size={14} />
                      {viewedService.rating} ({viewedService.bookings} bookings)
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Date Added</p>
                    <p className="text-sm text-gray-800">{viewedService.createdAt}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-800 mb-3">Service Description</h4>
                <p className="text-sm text-gray-600">
                  {viewedService.description || 'No description provided for this service.'}
                </p>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  className="px-4 py-2 bg-[#276e76] text-white rounded-lg hover:bg-[#1e565d]"
                  onClick={() => setViewedService(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      {viewedRequest && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{viewedRequest.serviceName}</h3>
                  <p className="text-sm text-gray-500">Request ID: {viewedRequest.id}</p>
                </div>
                <button
                  onClick={() => setViewedRequest(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={20} />
                </button>
              </div>
        
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">Requester</p>
                    <p className="text-sm font-medium text-gray-800">{viewedRequest.requester}</p>
                    <p className="text-xs text-gray-500">{viewedRequest.contact}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="text-sm font-medium text-gray-800">{viewedRequest.category}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Date Submitted</p>
                    <p className="text-sm text-gray-800">{viewedRequest.dateSubmitted}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">Proposed Price</p>
                    <p className="text-sm font-medium text-gray-800 flex items-center">
                      <FiDollarSign className="mr-1" size={14} />
                      {viewedRequest.proposedPrice}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      viewedRequest.status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : viewedRequest.status === 'Approved' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {viewedRequest.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-800 mb-3">Service Description</h4>
                <p className="text-sm text-gray-600">
                  {viewedRequest.description}
                </p>
              </div>
              
              {viewedRequest.status === 'Pending' && (
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    onClick={() => {
                      handleRequestStatusChange(viewedRequest.id, 'Rejected');
                      setViewedRequest(null);
                    }}
                  >
                    Reject
                  </button>
                  <button
                    className="px-4 py-2 bg-[#276e76] text-white rounded-lg hover:bg-[#1e565d]"
                    onClick={() => {
                      handleRequestStatusChange(viewedRequest.id, 'Approved');
                      setViewedRequest(null);
                    }}
                  >
                    Approve
                  </button>
                </div>
              )}
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

export default ServicesManagement;