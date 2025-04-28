import React, { useState, useEffect } from 'react';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, 
  FiCalendar, FiEdit2, FiSave, FiTool,
  FiClock, FiCheck, FiX, FiPlus, FiTrash2
} from 'react-icons/fi';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    services: [],
    serviceAreas: [],
    experience: '',
    profilePhoto: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [newService, setNewService] = useState('');
  const [newArea, setNewArea] = useState('');

  useEffect(() => {
    // Fetch provider profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/providers/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put('/api/providers/profile', profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const addService = () => {
    if (newService.trim()) {
      setProfile(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService('');
    }
  };

  const removeService = (index) => {
    setProfile(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const addServiceArea = () => {
    if (newArea.trim()) {
      setProfile(prev => ({
        ...prev,
        serviceAreas: [...prev.serviceAreas, newArea.trim()]
      }));
      setNewArea('');
    }
  };

  const removeServiceArea = (index) => {
    setProfile(prev => ({
      ...prev,
      serviceAreas: prev.serviceAreas.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
          {editMode ? (
            <button 
              onClick={handleSave}
              className="bg-[#076870] hover:bg-[#065a60] text-white px-4 py-2 rounded-lg flex items-center"
            >
              <FiSave className="mr-2" /> Save Changes
            </button>
          ) : (
            <button 
              onClick={() => setEditMode(true)}
              className="bg-[#076870] hover:bg-[#065a60] text-white px-4 py-2 rounded-lg flex items-center"
            >
              <FiEdit2 className="mr-2" /> Edit Profile
            </button>
          )}
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Photo */}
          <div className="col-span-1 flex flex-col items-center">
            <div className="relative mb-4">
              <img 
                src={profile.profilePhoto || 'https://via.placeholder.com/150'} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
              />
              {editMode && (
                <button className="absolute bottom-0 right-0 bg-[#076870] text-white rounded-full p-2">
                  <FiEdit2 size={16} />
                </button>
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              {profile.firstName} {profile.lastName}
            </h3>
          </div>

          {/* Personal Information */}
          <div className="col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-800">{profile.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-800">{profile.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-800 flex items-center">
                  <FiMail className="mr-2 text-[#076870]" /> {profile.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                {editMode ? (
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-800 flex items-center">
                    <FiPhone className="mr-2 text-[#076870]" /> {profile.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              {editMode ? (
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-800">{profile.bio || 'No bio provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiTool className="mr-2 text-[#076870]" /> Services Offered
              </label>
              {editMode ? (
                <div className="space-y-2">
                  <div className="flex">
                    <input
                      type="text"
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      placeholder="Add a service"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
                    />
                    <button
                      onClick={addService}
                      className="bg-[#076870] text-white px-3 py-2 rounded-r-md"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.services.map((service, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                        {service}
                        <button
                          onClick={() => removeService(index)}
                          className="ml-1 text-red-500"
                        >
                          <FiX size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.services.length > 0 ? (
                    profile.services.map((service, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full">
                        {service}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No services listed</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiMapPin className="mr-2 text-[#076870]" /> Service Areas
              </label>
              {editMode ? (
                <div className="space-y-2">
                  <div className="flex">
                    <input
                      type="text"
                      value={newArea}
                      onChange={(e) => setNewArea(e.target.value)}
                      placeholder="Add a service area"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
                    />
                    <button
                      onClick={addServiceArea}
                      className="bg-[#076870] text-white px-3 py-2 rounded-r-md"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.serviceAreas.map((area, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                        {area}
                        <button
                          onClick={() => removeServiceArea(index)}
                          className="ml-1 text-red-500"
                        >
                          <FiX size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.serviceAreas.length > 0 ? (
                    profile.serviceAreas.map((area, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full">
                        {area}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No service areas listed</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
              {editMode ? (
                <input
                  type="text"
                  name="experience"
                  value={profile.experience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-800">{profile.experience || 'Not specified'}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;