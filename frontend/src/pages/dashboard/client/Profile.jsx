import React, { useState } from 'react';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, 
  FiBell, FiLock, FiEdit2, FiCheck,
  FiPlus, FiTrash2, FiChevronRight, FiEye,
  FiHome, FiBriefcase
} from 'react-icons/fi';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    addresses: [
      {
        id: 1,
        type: "Home",
        address: "123 Main St, Apt 4B, New York, NY 10001",
        isDefault: true
      },
      {
        id: 2,
        type: "Work",
        address: "456 Business Ave, Floor 12, New York, NY 10001",
        isDefault: false
      }
    ],
    notifications: {
      bookingUpdates: true,
      promotions: false,
      messages: true,
      systemUpdates: true
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (type) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const addNewAddress = () => {
    const newAddress = {
      id: Date.now(),
      type: "Other",
      address: "",
      isDefault: false
    };
    setFormData(prev => ({
      ...prev,
      addresses: [...prev.addresses, newAddress]
    }));
  };

  const removeAddress = (id) => {
    setFormData(prev => ({
      ...prev,
      addresses: prev.addresses.filter(addr => addr.id !== id)
    }));
  };

  const setDefaultAddress = (id) => {
    setFormData(prev => ({
      ...prev,
      addresses: prev.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    }));
  };

  // Tab Navigation Component
  const TabNavigation = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
      <div className="flex overflow-x-auto">
        {[
          { id: 'personal', icon: <FiUser size={18} />, label: "Personal" },
          { id: 'addresses', icon: <FiMapPin size={18} />, label: "Addresses" },
          { id: 'notifications', icon: <FiBell size={18} />, label: "Notifications" },
          { id: 'security', icon: <FiLock size={18} />, label: "Security" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-6 py-4 text-sm font-medium transition-colors flex-shrink-0 ${
              activeTab === tab.id 
                ? 'text-[#076870] border-b-2 border-[#076870]' 
                : 'text-gray-600 hover:text-[#076870] hover:bg-gray-50'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );

  // Tab Content Components
  const PersonalDetailsTab = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#076870]">Personal Information</h2>
        {!editMode ? (
          <button 
            onClick={() => setEditMode(true)}
            className="text-[#076870] flex items-center text-sm font-medium"
          >
            <FiEdit2 className="mr-1" size={16} /> Edit
          </button>
        ) : (
          <div className="flex space-x-2">
            <button 
              onClick={() => setEditMode(false)}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button 
              onClick={() => setEditMode(false)}
              className="px-3 py-1 bg-[#076870] text-white text-sm font-medium rounded-lg hover:bg-[#054b52]"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          {editMode ? (
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870]"
            />
          ) : (
            <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
              <FiUser className="text-[#076870] mr-2" size={18} />
              <span>{formData.fullName}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870]"
            />
          ) : (
            <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
              <FiMail className="text-[#076870] mr-2" size={18} />
              <span>{formData.email}</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          {editMode ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870]"
            />
          ) : (
            <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
              <FiPhone className="text-[#076870] mr-2" size={18} />
              <span>{formData.phone}</span>
            </div>
          )}
        </div>

        {editMode && (
          <div className="flex items-end">
            <button className="text-[#076870] text-sm font-medium flex items-center">
              <FiLock className="mr-1" size={14} /> Change Password
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const AddressesTab = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#076870]">Saved Addresses</h2>
        <button 
          onClick={addNewAddress}
          className="text-[#076870] flex items-center text-sm font-medium"
        >
          <FiPlus className="mr-1" size={16} /> Add New
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {formData.addresses.map((address) => (
          <div key={address.id} className="p-6">
            <div className="flex justify-between">
              <div className="flex items-start">
                <div className={`p-3 rounded-lg mr-4 ${
                  address.isDefault ? 'bg-[#076870] text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {address.type === 'Home' ? <FiHome size={18} /> : 
                   address.type === 'Work' ? <FiBriefcase size={18} /> : 
                   <FiMapPin size={18} />}
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-800">{address.type}</h3>
                    {address.isDefault && (
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{address.address}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                {!address.isDefault && (
                  <button 
                    onClick={() => setDefaultAddress(address.id)}
                    className="text-[#076870] text-sm font-medium"
                  >
                    Set Default
                  </button>
                )}
                <button 
                  onClick={() => removeAddress(address.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const NotificationsTab = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#076870]">Notification Preferences</h2>
        <p className="text-gray-500 text-sm mt-1">Choose how you receive notifications</p>
      </div>

      <div className="divide-y divide-gray-200">
        {[
          { id: 'bookingUpdates', label: "Booking Updates", description: "Get notified about booking confirmations and changes" },
          { id: 'promotions', label: "Promotions", description: "Receive special offers and discounts" },
          { id: 'messages', label: "Messages", description: "Notify me when I receive new messages" },
          { id: 'systemUpdates', label: "System Updates", description: "Important updates about our services" }
        ].map((item) => (
          <div key={item.id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800">{item.label}</h3>
                <p className="text-gray-500 text-sm mt-1">{item.description}</p>
              </div>
              <button
                onClick={() => handleNotificationToggle(item.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.notifications[item.id] ? 'bg-[#076870]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.notifications[item.id] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#076870]">Security Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Manage your account security</p>
      </div>

      <div className="divide-y divide-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-800">Change Password</h3>
              <p className="text-gray-500 text-sm mt-1">Update your account password</p>
            </div>
            <button className="text-[#076870] text-sm font-medium flex items-center">
              Change <FiChevronRight className="ml-1" size={16} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-800">Two-Factor Authentication</h3>
              <p className="text-gray-500 text-sm mt-1">Add an extra layer of security</p>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 text-sm mr-3">Disabled</span>
              <button className="text-[#076870] text-sm font-medium flex items-center">
                Enable <FiChevronRight className="ml-1" size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-800">Active Sessions</h3>
              <p className="text-gray-500 text-sm mt-1">View and manage logged-in devices</p>
            </div>
            <button className="text-[#076870] text-sm font-medium flex items-center">
              Manage <FiChevronRight className="ml-1" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#076870]">Profile & Settings</h1>
          <p className="text-gray-500">Manage your account details and preferences</p>
        </div>

        {/* Top Navigation Bar */}
        <TabNavigation />

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'personal' && <PersonalDetailsTab />}
          {activeTab === 'addresses' && <AddressesTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'security' && <SecurityTab />}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;