import React, { useState } from 'react';
import { FiSettings, FiGlobe, FiUsers, FiUser, FiPlus, FiEdit2, FiTrash2, FiSave } from 'react-icons/fi';

const AdminSettings = () => {
  const [platformInfo, setPlatformInfo] = useState({
    name: 'TaskEase',
    contactEmail: 'support@taskease.com',
    contactPhone: '+1 (555) 123-4567',
    logo: '',
    favicon: '',
    primaryColor: '#0d9488',
    secondaryColor: '#0891b2',
    description: 'A platform connecting customers with skilled taskers for various services.'
  });

  const [locations, setLocations] = useState([
    { id: 1, city: 'New York', serviceAreas: 'Manhattan, Brooklyn, Queens', status: 'active' },
    { id: 2, city: 'London', serviceAreas: 'Central London, East London', status: 'active' },
    { id: 3, city: 'Dubai', serviceAreas: 'Downtown Dubai, Marina', status: 'inactive' }
  ]);

  const [newLocation, setNewLocation] = useState({
    city: '',
    serviceAreas: '',
    status: 'active'
  });

  const [roles, setRoles] = useState([
    { id: 1, name: 'Super Administrator', permissions: 'Full access to all platform features and settings' },
    { id: 2, name: 'Content Manager', permissions: 'Manage content, blogs, FAQs' },
    { id: 3, name: 'Support Admin', permissions: 'Handle customer support tickets' }
  ]);

  const [newRole, setNewRole] = useState({
    name: '',
    permissions: ''
  });

  const [admins, setAdmins] = useState([
    { id: 1, name: 'John Doe', email: 'john@taskease.com', role: 'Super Administrator', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@taskease.com', role: 'Content Manager', status: 'active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@taskease.com', role: 'Support Admin', status: 'inactive' }
  ]);

  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: '',
    status: 'active'
  });

  const handlePlatformInfoChange = (e) => {
    const { name, value } = e.target;
    setPlatformInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setNewLocation(prev => ({ ...prev, [name]: value }));
  };

  const addLocation = () => {
    if (newLocation.city && newLocation.serviceAreas) {
      setLocations([...locations, { ...newLocation, id: locations.length + 1 }]);
      setNewLocation({ city: '', serviceAreas: '', status: 'active' });
    }
  };

  const handleRoleChange = (e) => {
    const { name, value } = e.target;
    setNewRole(prev => ({ ...prev, [name]: value }));
  };

  const addRole = () => {
    if (newRole.name && newRole.permissions) {
      setRoles([...roles, { ...newRole, id: roles.length + 1 }]);
      setNewRole({ name: '', permissions: '' });
    }
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin(prev => ({ ...prev, [name]: value }));
  };

  const addAdmin = () => {
    if (newAdmin.name && newAdmin.email && newAdmin.role) {
      setAdmins([...admins, { ...newAdmin, id: admins.length + 1 }]);
      setNewAdmin({ name: '', email: '', role: '', status: 'active' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Platform Information Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FiSettings className="mr-2" /> Platform Information
          </h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Platform Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={platformInfo.name}
                  onChange={handlePlatformInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={platformInfo.contactEmail}
                  onChange={handlePlatformInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  id="contactPhone"
                  name="contactPhone"
                  value={platformInfo.contactPhone}
                  onChange={handlePlatformInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Color
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="primaryColor"
                    name="primaryColor"
                    value={platformInfo.primaryColor}
                    onChange={handlePlatformInfoChange}
                    className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-600">{platformInfo.primaryColor}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary Color
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="secondaryColor"
                    name="secondaryColor"
                    value={platformInfo.secondaryColor}
                    onChange={handlePlatformInfoChange}
                    className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-600">{platformInfo.secondaryColor}</span>
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Platform Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={platformInfo.description}
                  onChange={handlePlatformInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo
                </label>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16 rounded-lg bg-gray-200 overflow-hidden">
                    {platformInfo.logo ? (
                      <img src={platformInfo.logo} alt="Logo" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-400">
                        <FiGlobe className="text-2xl" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <button
                      type="button"
                      className="px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Change Logo
                    </button>
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended size: 160x160px
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Favicon
                </label>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-200 overflow-hidden">
                    {platformInfo.favicon ? (
                      <img src={platformInfo.favicon} alt="Favicon" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-400">
                        <FiGlobe className="text-xl" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <button
                      type="button"
                      className="px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Change Favicon
                    </button>
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended size: 32x32px
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 flex items-center cursor-pointer"
              >
                <FiSave className="mr-2" /> Save Changes
              </button>
            </div>
          </form>
        </div>
        
        {/* Service Availability Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FiGlobe className="mr-2" /> Service Availability
          </h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={newLocation.city}
                  onChange={handleLocationChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter city name"
                />
              </div>
              
              <div>
                <label htmlFor="serviceAreas" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Areas
                </label>
                <input
                  type="text"
                  id="serviceAreas"
                  name="serviceAreas"
                  value={newLocation.serviceAreas}
                  onChange={handleLocationChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter service areas"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={addLocation}
                  className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 flex items-center"
                >
                  <FiPlus className="mr-2" /> Add Location
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      City
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Areas
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {locations.map((location) => (
                    <tr key={location.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {location.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {location.serviceAreas}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          location.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {location.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-teal-600 hover:text-teal-900 mr-3">
                          <FiEdit2 />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="button"
                className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 flex items-center cursor-pointer"
              >
                <FiSave className="mr-2" /> Save Changes
              </button>
            </div>
          </div>
        </div>
        
        {/* Admin Roles & Permissions Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FiUsers className="mr-2" /> Admin Roles & Permissions
          </h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="roleName" className="block text-sm font-medium text-gray-700 mb-1">
                  Create New Role
                </label>
                <input
                  type="text"
                  id="roleName"
                  name="name"
                  value={newRole.name}
                  onChange={handleRoleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter role name"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={addRole}
                  className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 flex items-center"
                >
                  <FiPlus className="mr-2" /> Add Role
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roles.map(role => (
                <div key={role.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{role.name}</h3>
                  <p className="text-sm text-gray-600">{role.permissions}</p>
                  <div className="mt-4 flex space-x-2">
                    <button className="text-teal-600 hover:text-teal-900 text-sm flex items-center">
                      <FiEdit2 className="mr-1" /> Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900 text-sm flex items-center">
                      <FiTrash2 className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div className="md:col-span-2">
                <label htmlFor="adminName" className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Name
                </label>
                <input
                  type="text"
                  id="adminName"
                  name="name"
                  value={newAdmin.name}
                  onChange={handleAdminChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter admin name"
                />
              </div>
              
              <div>
                <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="adminEmail"
                  name="email"
                  value={newAdmin.email}
                  onChange={handleAdminChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter admin email"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={addAdmin}
                  className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 flex items-center w-full justify-center"
                >
                  <FiPlus className="mr-2" /> Add Admin
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Admin Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {admins.map((admin) => (
                    <tr key={admin.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {admin.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {admin.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {admin.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          admin.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {admin.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-teal-600 hover:text-teal-900 mr-3">
                          <FiEdit2 />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="button"
                className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 flex items-center cursor-pointer"
              >
                <FiSave className="mr-2" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;