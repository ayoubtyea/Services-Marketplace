import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, 
  FiBell, FiLock, FiEdit2, FiCheck,
  FiPlus, FiTrash2, FiChevronRight, FiEye,
  FiHome, FiBriefcase, FiCamera, FiX, FiSave,
  FiCalendar, FiClock, FiStar
} from 'react-icons/fi';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [originalData, setOriginalData] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    nickname: "",
    email: "",
    phone: "",
    country: "United States",
    birthDate: "",
    createdAt: new Date().toISOString(),
    addresses: [],
    notifications: {
      bookingUpdates: true,
      promotions: false,
      messages: true,
      systemUpdates: true
    },
    role: "client"
  });

  // Load user data from localStorage
  useEffect(() => {
    const loadUserData = () => {
      const userData = JSON.parse(localStorage.getItem('userData')) || {};
      setOriginalData(userData);
      
      // Add createdAt if it doesn't exist (for existing users)
      if (!userData.createdAt) {
        userData.createdAt = new Date().toISOString();
        localStorage.setItem('userData', JSON.stringify(userData));
      }
      
      // Split fullName into firstName and lastName if it exists
      let firstName = "";
      let lastName = "";
      if (userData.fullName) {
        const nameParts = userData.fullName.split(' ');
        firstName = nameParts[0] || "";
        lastName = nameParts.slice(1).join(' ') || "";
      }
      
      setFormData({
        fullName: userData.fullName || "",
        firstName,
        lastName,
        nickname: userData.nickname || "",
        email: userData.email || "",
        phone: userData.phoneNumber || userData.phone || "",
        country: userData.country || "United States",
        birthDate: userData.birthDate || "",
        createdAt: userData.createdAt || new Date().toISOString(),
        addresses: userData.addresses || [],
        notifications: userData.notifications || {
          bookingUpdates: true,
          promotions: false,
          messages: true,
          systemUpdates: true
        },
        role: userData.role || "client"
      });
      
      if (userData.avatar || userData.profileImage) {
        setProfileImage(userData.avatar || userData.profileImage);
      }
    };

    loadUserData();
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const removeProfileImage = useCallback(() => {
    setProfileImage(null);
  }, []);

  const toggleEditMode = useCallback(() => {
    if (editMode) {
      // Revert to original data when canceling
      setFormData(originalData);
      setProfileImage(originalData.avatar || originalData.profileImage || null);
    } else {
      // When entering edit mode, ensure fullName is composed of firstName and lastName
      setFormData(prev => ({
        ...prev,
        fullName: `${prev.firstName} ${prev.lastName}`.trim()
      }));
    }
    setEditMode(!editMode);
  }, [editMode, originalData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      // Combine firstName and lastName into fullName
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      
      const updatedUserData = {
        ...formData,
        fullName,
        phoneNumber: formData.phone,
        avatar: profileImage,
        profileImage: profileImage
      };
      
      // Update localStorage
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      setOriginalData(updatedUserData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }, [formData, profileImage]);

  // Calculate membership duration
  const getMembershipDuration = useCallback(() => {
    if (!formData.createdAt) return '';
    const createdDate = new Date(formData.createdAt);
    const now = new Date();
    const diffInYears = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24 * 365));
    
    if (diffInYears < 1) {
      const diffInMonths = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24 * 30));
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''}`;
    }
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''}`;
  }, [formData.createdAt]);

  // Tab Navigation Component
  const TabNavigation = useCallback(() => (
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
  ), [activeTab]);

  // Personal Details Tab Component
  const PersonalDetailsTab = useCallback(() => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-200">
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#076870]">Personal Information</h2>
        <button 
          onClick={toggleEditMode}
          className={`flex items-center text-sm font-medium ${
            editMode ? 'text-gray-600 hover:text-gray-800' : 'text-[#076870] hover:text-[#054b52]'
          } transition-colors`}
        >
          {editMode ? (
            <>
              <FiX className="mr-1" size={16} /> Cancel
            </>
          ) : (
            <>
              <FiEdit2 className="mr-1" size={16} /> Edit
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Profile Picture Section */}
        <div className="flex items-center space-x-6 transition-all duration-200">
          <div className="relative group">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover border-2 border-[#076870] transition-transform duration-200 group-hover:scale-105"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-[#076870]">
                <FiUser className="text-gray-500" size={32} />
              </div>
            )}
            {editMode && (
              <div className="absolute -bottom-2 left-0 right-0 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="bg-[#076870] text-white p-1.5 rounded-full hover:bg-[#054b52] shadow-md transition-colors"
                >
                  <FiCamera size={14} />
                </button>
                {profileImage && (
                  <button 
                    type="button"
                    onClick={removeProfileImage}
                    className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md transition-colors"
                  >
                    <FiX size={14} />
                  </button>
                )}
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {formData.fullName || `${formData.firstName} ${formData.lastName}`.trim() || 'Your Name'}
            </h3>
            <p className="text-gray-500">{formData.email}</p>
            {formData.nickname && (
              <p className="text-gray-500">@{formData.nickname}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">First Name *</label>
            {editMode ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-all duration-200"
                required
              />
            ) : (
              <div className="px-4 py-2.5 bg-gray-50 rounded-lg">
                {formData.firstName || <span className="text-gray-400">Not provided</span>}
              </div>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Last Name *</label>
            {editMode ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-all duration-200"
                required
              />
            ) : (
              <div className="px-4 py-2.5 bg-gray-50 rounded-lg">
                {formData.lastName || <span className="text-gray-400">Not provided</span>}
              </div>
            )}
          </div>

          {/* Nickname */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Nickname</label>
            {editMode ? (
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                placeholder="Optional"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-all duration-200"
              />
            ) : (
              <div className="px-4 py-2.5 bg-gray-50 rounded-lg">
                {formData.nickname || <span className="text-gray-400">Not set</span>}
              </div>
            )}
          </div>

          {/* Account Type (read-only) */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Account Type</label>
            <div className="px-4 py-2.5 bg-gray-50 rounded-lg flex items-center">
              <div className="w-6 h-6 bg-[#076870] rounded-full mr-3 flex items-center justify-center">
                <FiUser className="text-white" size={12} />
              </div>
              <span className="capitalize">{formData.role || 'client'}</span>
            </div>
          </div>

          {/* Country */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Country</label>
            {editMode ? (
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-all duration-200"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            ) : (
              <div className="px-4 py-2.5 bg-gray-50 rounded-lg">
                {formData.country || <span className="text-gray-400">Not set</span>}
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            {editMode ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (123) 456-7890"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-all duration-200"
              />
            ) : (
              <div className="px-4 py-2.5 bg-gray-50 rounded-lg flex items-center">
                <FiPhone className="text-[#076870] mr-2" size={18} />
                {formData.phone || <span className="text-gray-400">Not set</span>}
              </div>
            )}
          </div>

          {/* Email Section */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <div className="px-4 py-2.5 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FiMail className="text-[#076870] mr-2" size={18} />
                <span className="ml-2">{formData.email}</span>
              </div>
              {formData.createdAt && (
                <div className="mt-2 text-sm text-gray-500 flex items-center">
                  <FiCalendar className="mr-1" size={14} />
                  <span>Member since {new Date(formData.createdAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            {editMode ? (
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#076870] focus:border-[#076870] transition-all duration-200"
              />
            ) : (
              <div className="px-4 py-2.5 bg-gray-50 rounded-lg">
                {formData.birthDate ? 
                  new Date(formData.birthDate).toLocaleDateString() : 
                  <span className="text-gray-400">Not set</span>
                }
              </div>
            )}
          </div>
        </div>

        {editMode && (
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center px-4 py-2.5 bg-[#076870] text-white rounded-lg hover:bg-[#054b52] transition-colors duration-200 shadow-md"
            >
              <FiSave className="mr-2" size={16} />
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  ), [editMode, formData, getMembershipDuration, handleImageChange, handleInputChange, handleSubmit, profileImage, removeProfileImage, toggleEditMode]);

  // Simplified versions of other tabs for demonstration
  const AddressesTab = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
      <h2 className="text-xl font-semibold text-[#076870] mb-4">Addresses</h2>
      <p className="text-gray-500">Your saved addresses will appear here</p>
    </div>
  );

  const NotificationsTab = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
      <h2 className="text-xl font-semibold text-[#076870] mb-4">Notifications</h2>
      <p className="text-gray-500">Manage your notification preferences</p>
    </div>
  );

  const SecurityTab = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
      <h2 className="text-xl font-semibold text-[#076870] mb-4">Security</h2>
      <p className="text-gray-500">Update your security settings</p>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#076870]">Profile & Settings</h1>
          <p className="text-gray-500">Manage your account details and preferences</p>
        </div>

        <TabNavigation />

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