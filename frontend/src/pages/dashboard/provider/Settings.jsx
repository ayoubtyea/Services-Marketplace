import React, { useState } from 'react';
import {
  FiUser, FiMapPin, FiCreditCard, FiBell,
  FiClock, FiLock, FiChevronRight, FiCheck,
  FiEdit2, FiPlus, FiTrash2, FiEye, FiEyeOff,
  FiMail, FiCalendar, FiGlobe,FiPhone
} from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Details
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    firstName: 'John',
    lastName: 'Doe',
    nickName: 'Johnny',
    country: 'United States',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    birthDate: '1985-06-15',
    description: 'Professional service provider with 5 years of experience in home maintenance and cleaning services.',
    additionalEmails: ['john.doe.work@example.com'],
    newEmail: '',
    
    // Service Areas
    serviceAreas: [
      { id: 1, area: 'New York, NY', radius: '10 miles' },
      { id: 2, area: 'Jersey City, NJ', radius: '15 miles' }
    ],
    newArea: '',
    newRadius: '',
    
    // Payment Methods
    paymentMethods: [
      { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', default: true },
      { id: 2, type: 'PayPal', email: 'john.doe@example.com', default: false }
    ],
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    bookingAlerts: true,
    promotionAlerts: true,
    
    // Work Hours
    workHours: {
      monday: { start: '09:00', end: '17:00', available: true },
      tuesday: { start: '09:00', end: '17:00', available: true },
      wednesday: { start: '09:00', end: '17:00', available: true },
      thursday: { start: '09:00', end: '17:00', available: true },
      friday: { start: '09:00', end: '17:00', available: true },
      saturday: { start: '10:00', end: '15:00', available: false },
      sunday: { start: '', end: '', available: false }
    },
    
    // Security
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      profileImage: ''
    }));
  };

  const addEmail = () => {
    if (formData.newEmail && !formData.additionalEmails.includes(formData.newEmail)) {
      setFormData(prev => ({
        ...prev,
        additionalEmails: [...prev.additionalEmails, prev.newEmail],
        newEmail: ''
      }));
    }
  };

  const removeEmail = (emailToRemove) => {
    setFormData(prev => ({
      ...prev,
      additionalEmails: prev.additionalEmails.filter(email => email !== emailToRemove)
    }));
  };

  const handleWorkHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      workHours: {
        ...prev.workHours,
        [day]: {
          ...prev.workHours[day],
          [field]: value
        }
      }
    }));
  };

  const toggleDayAvailability = (day) => {
    setFormData(prev => ({
      ...prev,
      workHours: {
        ...prev.workHours,
        [day]: {
          ...prev.workHours[day],
          available: !prev.workHours[day].available
        }
      }
    }));
  };

  const addServiceArea = () => {
    if (formData.newArea && formData.newRadius) {
      setFormData(prev => ({
        ...prev,
        serviceAreas: [
          ...prev.serviceAreas,
          {
            id: Date.now(),
            area: prev.newArea,
            radius: prev.newRadius
          }
        ],
        newArea: '',
        newRadius: ''
      }));
    }
  };

  const removeServiceArea = (id) => {
    setFormData(prev => ({
      ...prev,
      serviceAreas: prev.serviceAreas.filter(area => area.id !== id)
    }));
  };

  const addPaymentMethod = () => {
    // In a real app, this would open a payment method form/modal
    console.log('Add payment method');
  };

  const removePaymentMethod = (id) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter(method => method.id !== id)
    }));
  };

  const setDefaultPaymentMethod = (id) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map(method => ({
        ...method,
        default: method.id === id
      }))
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Settings saved successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h1>
          <nav className="space-y-1">
            {[
              { id: 'personal', icon: <FiUser />, label: 'Personal Details' },
              { id: 'service', icon: <FiMapPin />, label: 'Service Areas' },
              { id: 'payment', icon: <FiCreditCard />, label: 'Payment Methods' },
              { id: 'notifications', icon: <FiBell />, label: 'Notifications' },
              { id: 'hours', icon: <FiClock />, label: 'Work Hours' },
              { id: 'security', icon: <FiLock />, label: 'Security' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#076870] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </div>
                <FiChevronRight />
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Personal Details */}
            {activeTab === 'personal' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FiUser className="mr-2" /> Personal Details
                </h2>
                
                {/* Profile Image Section */}
                <div className="flex flex-col items-center md:flex-row md:items-start gap-6 mb-8">
                  <div className="relative">
                    {formData.profileImage ? (
                      <img 
                        src={formData.profileImage} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                        <FiUser className="text-gray-400 text-4xl" />
                      </div>
                    )}
                    <div className="absolute -bottom-2 left-0 right-0 flex justify-center space-x-2">
                      <label className="cursor-pointer bg-[#076870] hover:bg-[#065a60] text-white p-2 rounded-full shadow-md transition-colors">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageChange} 
                          className="hidden" 
                        />
                        <FiEdit2 size={16} />
                      </label>
                      {formData.profileImage && (
                        <button 
                          type="button"
                          onClick={removeImage}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition-colors"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                        />
                      </div>
                      
                      {/* Last Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                        />
                      </div>
                      
                      {/* Nickname */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nickname</label>
                        <input
                          type="text"
                          name="nickName"
                          value={formData.nickName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                        />
                      </div>
                      
                      {/* Country */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <div className="relative">
                          <FiGlobe className="absolute left-3 top-3 text-gray-400" />
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors appearance-none"
                          >
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* Phone Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <div className="relative">
                          <FiPhone className="absolute left-3 top-3 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                          />
                        </div>
                      </div>
                      
                      {/* Date of Birth */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <div className="relative">
                          <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                          <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Primary Email */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                    />
                  </div>
                </div>
                
                {/* Additional Emails */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Email Addresses</label>
                  {formData.additionalEmails.length > 0 ? (
                    <div className="space-y-2 mb-3">
                      {formData.additionalEmails.map((email, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center">
                            <FiMail className="text-gray-400 mr-2" />
                            <span>{email}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeEmail(email)}
                            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 mb-3">No additional emails added</p>
                  )}
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <FiMail className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="email"
                        value={formData.newEmail}
                        onChange={(e) => setFormData({...formData, newEmail: e.target.value})}
                        placeholder="Add new email address"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addEmail}
                      disabled={!formData.newEmail}
                      className="bg-[#076870] hover:bg-[#065a60] text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiPlus className="mr-1" /> Add
                    </button>
                  </div>
                </div>
                
                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Service Areas */}
            {activeTab === 'service' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FiMapPin className="mr-2" /> Service Areas
                </h2>
                
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-700 mb-4">Current Service Areas</h3>
                  {formData.serviceAreas.length > 0 ? (
                    <div className="space-y-3">
                      {formData.serviceAreas.map(area => (
                        <div key={area.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{area.area}</p>
                            <p className="text-sm text-gray-600">Service radius: {area.radius}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeServiceArea(area.id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 py-3">No service areas added yet.</p>
                  )}
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-md font-medium text-gray-700 mb-4">Add New Service Area</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                      <input
                        type="text"
                        value={formData.newArea}
                        onChange={(e) => setFormData({...formData, newArea: e.target.value})}
                        placeholder="City, State or ZIP code"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Service Radius</label>
                      <select
                        value={formData.newRadius}
                        onChange={(e) => setFormData({...formData, newRadius: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                      >
                        <option value="">Select radius</option>
                        <option value="5 miles">5 miles</option>
                        <option value="10 miles">10 miles</option>
                        <option value="15 miles">15 miles</option>
                        <option value="20 miles">20 miles</option>
                        <option value="25 miles">25 miles</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addServiceArea}
                    disabled={!formData.newArea || !formData.newRadius}
                    className="mt-4 bg-[#076870] hover:bg-[#065a60] text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiPlus className="mr-2" /> Add Service Area
                  </button>
                </div>
              </div>
            )}

            {/* Payment Methods */}
            {activeTab === 'payment' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FiCreditCard className="mr-2" /> Payment Methods
                </h2>
                
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-700 mb-4">Your Payment Methods</h3>
                  {formData.paymentMethods.length > 0 ? (
                    <div className="space-y-3">
                      {formData.paymentMethods.map(method => (
                        <div key={method.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            {method.type === 'Visa' && (
                              <div className="w-10 h-6 bg-blue-500 text-white flex items-center justify-center rounded mr-3">
                                Visa
                              </div>
                            )}
                            {method.type === 'PayPal' && (
                              <div className="w-10 h-6 bg-blue-700 text-white flex items-center justify-center rounded mr-3">
                                PayPal
                              </div>
                            )}
                            <div>
                              <p className="font-medium">
                                {method.type} {method.last4 ? `•••• ${method.last4}` : `(${method.email})`}
                              </p>
                              {method.expiry && <p className="text-sm text-gray-600">Expires {method.expiry}</p>}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {method.default ? (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                Default
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setDefaultPaymentMethod(method.id)}
                                className="text-xs text-[#076870] hover:text-[#065a60]"
                              >
                                Set as default
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => removePaymentMethod(method.id)}
                              className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 py-3">No payment methods added yet.</p>
                  )}
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <button
                    type="button"
                    onClick={addPaymentMethod}
                    className="bg-[#076870] hover:bg-[#065a60] text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
                  >
                    <FiPlus className="mr-2" /> Add Payment Method
                  </button>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FiBell className="mr-2" /> Notification Settings
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-700 mb-3">Notification Preferences</h3>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={formData.emailNotifications}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-[#076870] focus:ring-[#076870] border-gray-300 rounded"
                        />
                        <span className="text-gray-700">Email Notifications</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="smsNotifications"
                          checked={formData.smsNotifications}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-[#076870] focus:ring-[#076870] border-gray-300 rounded"
                        />
                        <span className="text-gray-700">SMS Notifications</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-md font-medium text-gray-700 mb-3">Alert Preferences</h3>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="bookingAlerts"
                          checked={formData.bookingAlerts}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-[#076870] focus:ring-[#076870] border-gray-300 rounded"
                        />
                        <span className="text-gray-700">New Booking Alerts</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="promotionAlerts"
                          checked={formData.promotionAlerts}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-[#076870] focus:ring-[#076870] border-gray-300 rounded"
                        />
                        <span className="text-gray-700">Promotions & Offers</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Work Hours */}
            {activeTab === 'hours' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FiClock className="mr-2" /> Work Hours Availability
                </h2>
                
                <div className="space-y-4">
                  {Object.entries(formData.workHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <label className="flex items-center space-x-3 flex-1">
                        <input
                          type="checkbox"
                          checked={hours.available}
                          onChange={() => toggleDayAvailability(day)}
                          className="h-4 w-4 text-[#076870] focus:ring-[#076870] border-gray-300 rounded"
                        />
                        <span className="capitalize font-medium text-gray-700 w-24">{day}</span>
                      </label>
                      {hours.available ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="time"
                            value={hours.start}
                            onChange={(e) => handleWorkHoursChange(day, 'start', e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={hours.end}
                            onChange={(e) => handleWorkHoursChange(day, 'end', e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors"
                          />
                        </div>
                      ) : (
                        <span className="text-gray-500">Not available</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FiLock className="mr-2" /> Security
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-700 mb-3">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-colors pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50 flex justify-end">
              <button
                type="submit"
                className="bg-[#076870] hover:bg-[#065a60] text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
              >
                <FiCheck className="mr-2" /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;