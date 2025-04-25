import React, { useState } from 'react';
import {
  FiChevronRight, FiCheck,
  FiEdit2, FiPlus, FiTrash2, FiEye, FiEyeOff,
  FiMail, FiCalendar, FiGlobe, FiPhone
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
    console.log('Form submitted:', formData);
    alert('Settings saved successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Top Navigation Bar */}
      <div className="mb-6">
        <nav className="flex space-x-6 mb-8 border-b border-gray-300">
          {[
            { id: 'personal', label: 'Personal Details' },
            { id: 'service', label: 'Service Areas' },
            { id: 'notifications', label: 'Notifications' },
            { id: 'hours', label: 'Work Hours' },
            { id: 'security', label: 'Security' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-lg font-medium transition-colors ${activeTab === tab.id ? 'text-[#076870] border-b-2 border-[#076870]' : 'text-gray-600 hover:text-[#076870]'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Personal Details Tab */}
          {activeTab === 'personal' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Personal Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <img 
                        src={formData.profileImage} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
                      />
                      <button 
                        onClick={removeImage}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                    <label className="cursor-pointer bg-[#076870] text-white px-4 py-2 rounded-lg">
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                      Change Photo
                    </label>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nickname</label>
                      <input
                        type="text"
                        name="nickName"
                        value={formData.nickName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <div className="flex">
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <button className="ml-2 px-3 py-2 bg-gray-100 rounded-md">
                          <FiEdit2 />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="flex">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <button className="ml-2 px-3 py-2 bg-gray-100 rounded-md">
                          <FiEdit2 />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Emails</label>
                    <div className="flex mb-2">
                      <input
                        type="email"
                        name="newEmail"
                        value={formData.newEmail}
                        onChange={handleInputChange}
                        placeholder="Add additional email"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={addEmail}
                        className="ml-2 px-4 py-2 bg-[#076870] text-white rounded-md"
                      >
                        Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.additionalEmails.map((email, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                          <span>{email}</span>
                          <button
                            onClick={() => removeEmail(email)}
                            className="text-red-500"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Service Areas Tab */}
          {activeTab === 'service' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Service Areas
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                    <input
                      type="text"
                      name="newArea"
                      value={formData.newArea}
                      onChange={handleInputChange}
                      placeholder="City, State"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Radius</label>
                    <select
                      name="newRadius"
                      value={formData.newRadius}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select radius</option>
                      <option value="5 miles">5 miles</option>
                      <option value="10 miles">10 miles</option>
                      <option value="15 miles">15 miles</option>
                      <option value="20 miles">20 miles</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={addServiceArea}
                      className="px-4 py-2 bg-[#076870] text-white rounded-md flex items-center"
                    >
                      <FiPlus className="mr-1" /> Add Area
                    </button>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-700 mb-3">Your Service Areas</h3>
                  <div className="space-y-3">
                    {formData.serviceAreas.length > 0 ? (
                      formData.serviceAreas.map(area => (
                        <div key={area.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                          <div>
                            <p className="font-medium">{area.area}</p>
                            <p className="text-sm text-gray-500">Radius: {area.radius}</p>
                          </div>
                          <button
                            onClick={() => removeServiceArea(area.id)}
                            className="text-red-500 p-1"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No service areas added yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Methods Tab */}
          

          {/* Notification Settings Tab */}
          {activeTab === 'notifications' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Notification Settings
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Notification Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={formData.emailNotifications}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#076870]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via text message</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="smsNotifications"
                          checked={formData.smsNotifications}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#076870]"></div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-700 mb-3">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Booking Alerts</p>
                        <p className="text-sm text-gray-500">Get notified when you receive new bookings</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="bookingAlerts"
                          checked={formData.bookingAlerts}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#076870]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promotions & Offers</p>
                        <p className="text-sm text-gray-500">Receive updates about promotions and special offers</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="promotionAlerts"
                          checked={formData.promotionAlerts}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#076870]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Work Hours Tab */}
          {activeTab === 'hours' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Work Hours Availability
              </h2>
              <div className="space-y-4">
                {Object.entries(formData.workHours).map(([day, hours]) => (
                  <div key={day} className="border border-gray-200 rounded-md p-4">
                    <div className="flex items-center justify-between mb-3">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={hours.available}
                          onChange={() => toggleDayAvailability(day)}
                          className="h-4 w-4 text-[#076870] rounded border-gray-300 focus:ring-[#076870]"
                        />
                        <span className="ml-2 font-medium capitalize">{day}</span>
                      </label>
                      {hours.available && (
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <input
                              type="time"
                              value={hours.start}
                              onChange={(e) => handleWorkHoursChange(day, 'start', e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </div>
                          <span>to</span>
                          <div className="flex items-center">
                            <input
                              type="time"
                              value={hours.end}
                              onChange={(e) => handleWorkHoursChange(day, 'end', e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Security
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-gray-500"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-gray-500"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-gray-500"
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-[#076870] text-white rounded-md"
                  >
                    Update Password
                  </button>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium text-gray-700 mb-3">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Authentication</p>
                      <p className="text-sm text-gray-500">Use your phone to verify your identity</p>
                    </div>
                    <button className="px-4 py-2 border border-[#076870] text-[#076870] rounded-md">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
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
  );
};

export default Settings;