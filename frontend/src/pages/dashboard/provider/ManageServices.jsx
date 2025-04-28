import React, { useState, useEffect } from 'react';
import {
  FiPlus, FiEdit2, FiTrash2, FiClock, FiCheck, FiX,
  FiUser, FiCalendar, FiFileText, FiMapPin, FiTool, FiAlertCircle
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const ManageServices = () => {
  const [activeTab, setActiveTab] = useState('manage');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    duration: '',
    description: '',
    serviceAreas: []
  });

  const serviceCategories = [
    'Cleaning', 'Assembly', 'Home Repair', 'Electrical', 
    'Moving Help', 'Personal Assistance', 'Delivery'
  ];

  const cities = [
    "Casablanca", "Rabat", "Marrakech", "Fes", "Tangier",
    "Agadir", "Meknes", "Oujda", "Kenitra", "Tetouan"
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found. Please login again.');
        }
        const response = await axios.get(`${API_BASE_URL}/api/providers/services`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.data && Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          throw new Error('Invalid data format received from server');
        }
      } catch (err) {
        console.error('Fetch Services Error:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch services.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceAreaChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, serviceAreas: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormSubmitting(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/providers/services`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setServices([...services, response.data]);
      setFormData({
        name: '',
        category: '',
        price: '',
        duration: '',
        description: '',
        serviceAreas: []
      });
      setError(null);
      setActiveTab('manage'); // Switch to manage tab after successful submission
    } catch (err) {
      console.error('Submit Error:', err);
      setError(err.response?.data?.message || 
              'Failed to submit service. Please check your data and try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      return;
    }
    
    try {
      setDeleteLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }

      await axios.delete(`${API_BASE_URL}/api/providers/services/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setServices(services.filter(service => service._id !== id));
      setError(null);
    } catch (err) {
      console.error('Delete Error:', err);
      setError(err.response?.data?.message || 
              'Failed to delete service. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center";
    switch (status) {
      case 'approved':
        return <span className={`bg-green-100 text-green-800 ${baseClasses}`}>
          <FiCheck className="mr-1" size={12}/> Approved
        </span>;
      case 'pending':
        return <span className={`bg-yellow-100 text-yellow-800 ${baseClasses}`}>
          <FiClock className="mr-1" size={12}/> Pending
        </span>;
      case 'rejected':
        return <span className={`bg-red-100 text-red-800 ${baseClasses}`}>
          <FiX className="mr-1" size={12}/> Rejected
        </span>;
      default:
        return <span className={`bg-gray-100 text-gray-800 ${baseClasses}`}>
          {status}
        </span>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#076870]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
          <div className="flex items-start">
            <FiAlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-red-800">Error occurred</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium underline"
              >
                Refresh page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Services</h1>
      
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide border-b border-gray-200">
        <button
          className={`py-3 px-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors ${activeTab === 'add' ? 'text-[#076870] border-b-2 border-[#076870]' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('add')}
        >
          <FiPlus className="mr-2" />
          Add New Service
        </button>
        <button
          className={`py-3 px-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors ${activeTab === 'manage' ? 'text-[#076870] border-b-2 border-[#076870]' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('manage')}
        >
          <FiTool className="mr-2" />
          Manage Services
          {services.length > 0 && (
            <span className="ml-2 bg-[#076870] text-white text-xs font-medium px-2 py-0.5 rounded-full">
              {services.length}
            </span>
          )}
        </button>
        <button
          className={`py-3 px-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors ${activeTab === 'approval' ? 'text-[#076870] border-b-2 border-[#076870]' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('approval')}
        >
          <FiCheck className="mr-2" />
          Approval Status
          {services.filter(s => s.status === 'pending').length > 0 && (
            <span className="ml-2 bg-[#076870] text-white text-xs font-medium px-2 py-0.5 rounded-full">
              {services.filter(s => s.status === 'pending').length}
            </span>
          )}
        </button>
      </div>

      {/* Add New Service Tab */}
      {activeTab === 'add' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FiPlus className="mr-2" /> Add New Service
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                    required
                    placeholder="e.g. Deep Cleaning"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                    required
                  >
                    <option value="">Select a category</option>
                    {serviceCategories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                    required
                    placeholder="e.g. $120"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration*</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                    required
                    placeholder="e.g. 2 hours"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Areas*</label>
                <select
                  multiple
                  name="serviceAreas"
                  value={formData.serviceAreas}
                  onChange={handleServiceAreaChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors h-[100px]"
                  required
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple cities</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                  required
                  placeholder="Describe your service in detail..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('manage')}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#076870] hover:bg-[#065a60] text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
                  disabled={formSubmitting}
                >
                  {formSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : 'Submit for Approval'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      {/* Manage Services Tab */}
      {activeTab === 'manage' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FiTool className="mr-2" /> Your Services
            </h2>
            
            {services.length > 0 ? (
              <div className="space-y-4">
                {services.map(service => (
                  <div key={service._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-800">{service.name}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-600">{service.category}</span>
                          <span className="text-sm font-medium text-gray-700">{service.price}</span>
                          <span className="text-sm text-gray-600">{service.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(service.status)}
                        <button
                          onClick={() => deleteService(service._id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                          disabled={deleteLoading}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                    {service.serviceAreas && service.serviceAreas.length > 0 && (
                      <div className="mt-2 flex items-center">
                        <FiMapPin className="text-gray-400 mr-1" size={14} />
                        <span className="text-xs text-gray-500">
                          Available in: {service.serviceAreas.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiTool className="mx-auto text-gray-400 text-4xl mb-3" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">No Services Added</h3>
                <p className="text-gray-500">Add your first service to start receiving bookings</p>
                <button
                  onClick={() => setActiveTab('add')}
                  className="mt-4 bg-[#076870] hover:bg-[#065a60] text-white px-4 py-2 rounded-lg font-medium flex items-center mx-auto transition-colors"
                >
                  <FiPlus className="mr-1" /> Add Service
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Approval Status Tab */}
      {activeTab === 'approval' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FiCheck className="mr-2" /> Approval Status
            </h2>
            
            {services.length > 0 ? (
              <div className="space-y-4">
                {services.map(service => (
                  <div key={service._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-800">{service.name}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-600">{service.category}</span>
                          <span className="text-xs text-gray-500">
                            Submitted: {new Date(service.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {getStatusBadge(service.status)}
                    </div>
                    
                    {service.status === 'rejected' && service.rejectionReason && (
                      <div className="mt-2 bg-red-50 border-l-4 border-red-500 p-2">
                        <p className="text-sm text-red-700">
                          <span className="font-medium">Reason:</span> {service.rejectionReason}
                        </p>
                      </div>
                    )}
                    
                    {service.status === 'pending' && (
                      <div className="mt-2 bg-blue-50 border-l-4 border-blue-500 p-2">
                        <p className="text-sm text-blue-700">
                          Your service is under review. Approval typically takes 1-2 business days.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiFileText className="mx-auto text-gray-400 text-4xl mb-3" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">No Services Submitted</h3>
                <p className="text-gray-500">Add a service to see its approval status here</p>
                <button
                  onClick={() => setActiveTab('add')}
                  className="mt-4 bg-[#076870] hover:bg-[#065a60] text-white px-4 py-2 rounded-lg font-medium flex items-center mx-auto transition-colors"
                >
                  <FiPlus className="mr-1" /> Add Service
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ManageServices;