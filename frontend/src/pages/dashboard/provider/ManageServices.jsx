import React, { useState } from 'react';
import {
  FiPlus, FiEdit2, FiTrash2, FiClock, FiCheck, FiX,
  FiUser, FiTools, FiCalendar, FiFileText, FiMapPin
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const ManageServices = () => {
  const [activeTab, setActiveTab] = useState('add');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Deep Cleaning',
      category: 'Cleaning',
      status: 'approved',
      price: '$120',
      duration: '2 hours',
      description: 'Thorough cleaning of entire home including bathrooms, kitchen, and living areas.',
      createdAt: '2023-06-15'
    },
    {
      id: 2,
      name: 'Furniture Assembly',
      category: 'Assembly',
      status: 'pending',
      price: '$80',
      duration: '1.5 hours',
      description: 'Professional assembly of IKEA and other furniture brands.',
      createdAt: '2023-06-18'
    },
    {
      id: 3,
      name: 'Plumbing Repair',
      category: 'Home Repair',
      status: 'rejected',
      price: '$95',
      duration: '1 hour',
      description: 'Fix leaky faucets, clogged drains, and other minor plumbing issues.',
      createdAt: '2023-06-10',
      rejectionReason: 'Missing required plumbing certification'
    }
  ]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceAreaChange = (e) => {
    const options = e.target.options;
    const selectedAreas = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedAreas.push(options[i].value);
      }
    }
    setFormData(prev => ({
      ...prev,
      serviceAreas: selectedAreas
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      status: 'pending',
      price: formData.price,
      duration: formData.duration,
      description: formData.description,
      serviceAreas: formData.serviceAreas,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setServices([...services, newService]);
    setFormData({
      name: '',
      category: '',
      price: '',
      duration: '',
      description: '',
      serviceAreas: []
    });
    setIsModalOpen(false);
  };

  const deleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved':
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <FiCheck className="mr-1" size={12} /> Approved
          </span>
        );
      case 'pending':
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <FiClock className="mr-1" size={12} /> Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <FiX className="mr-1" size={12} /> Rejected
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col">
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
            <FiTools className="mr-2" />
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

        {/* Add New Service */}
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
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#076870] hover:bg-[#065a60] text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
                  >
                    Submit for Approval
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* Manage Services */}
        {activeTab === 'manage' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FiTools className="mr-2" /> Your Services
              </h2>
              
              {services.length > 0 ? (
                <div className="space-y-4">
                  {services.map(service => (
                    <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
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
                            onClick={() => deleteService(service.id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
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
                  <FiTools className="mx-auto text-gray-400 text-4xl mb-3" />
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

        {/* Approval Status */}
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
                    <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
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
    </div>
  );
};

export default ManageServices;