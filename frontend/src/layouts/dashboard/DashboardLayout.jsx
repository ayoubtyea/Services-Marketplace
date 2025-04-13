import React, { useState, useEffect } from 'react';
import { FiHome, FiCalendar, FiUser, FiSettings, FiBell, FiHelpCircle, FiLogOut, FiFileText, FiMenu, FiSearch,FiUsers } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../src/context/AuthContext';
import { Outlet } from 'react-router-dom';

const DashboardLayout = ({ userAvatar = '' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const [activePath, setActivePath] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [userRole, setUserRole] = useState('client'); // State for userRole
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Update active path when location changes
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  // Set the userRole from localStorage on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const role = userData?.role || 'client';  // Set default to 'client' if no role
    setUserRole(role);
  }, []);

  // Define different nav items based on userRole (admin, client, provider)
  const clientNavItems = [
    { name: 'Dashboard', icon: <FiHome />, path: '/client-dashboard', exact: true },
    { name: 'My Bookings', icon: <FiCalendar />, path: '/client-dashboard/bookings' },
    { name: 'Notifications', icon: <FiBell />, path: '/client-dashboard/notifications', badge: 5 },
    { name: 'Profile & Settings', icon: <FiUser />, path: '/client-dashboard/profile' },
    { name: 'Help & Support', icon: <FiHelpCircle />, path: '/client-dashboard/help' },
  ];

  const providerNavItems = [
    { name: 'Dashboard', icon: <FiHome />, path: '/provider-dashboard', exact: true },
    { name: 'My Services', icon: <FiFileText />, path: '/provider-dashboard/services' },
    { name: 'Bookings', icon: <FiCalendar />, path: '/provider-dashboard/bookings' },
    { name: 'Notifications', icon: <FiBell />, path: '/provider-dashboard/notifications', badge: 5 },
    { name: 'Profile & Settings', icon: <FiUser />, path: '/provider-dashboard/profile' },
  ];

  const adminNavItems = [
    { name: 'Dashboard', icon: <FiHome />, path: '/admin-dashboard', exact: true },
    { name: 'Taskers Management', icon: <FiUsers />, path: '/admin-dashboard/taskers' },
    { name: 'Customer Management', icon: <FiUser />, path: '/admin-dashboard/customers' },
    { name: 'Services Management', icon: <FiFileText />, path: '/admin-dashboard/services' },
    { name: 'Bookings Management', icon: <FiCalendar />, path: '/admin-dashboard/bookings' },
    { name: 'Notifications', icon: <FiBell />, path: '/admin-dashboard/notifications', badge: 2 },
    { name: 'Settings', icon: <FiSettings />, path: '/admin-dashboard/settings' },
  ];

  const navItems = userRole === 'admin' ? adminNavItems :
                   userRole === 'provider' ? providerNavItems :
                   clientNavItems;

  // Check if current path matches nav item
  const isActive = (item) => {
    if (item.exact) {
      return activePath === item.path;
    }
    return activePath.startsWith(item.path);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout(); // Call your logout function
      navigate('/'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-[#076870] text-white fixed h-full z-10 transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        {/* Logo and Sidebar Content */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {sidebarOpen ? (
            <div className="flex items-center">
              <img src="https://i.postimg.cc/HLc2m50J/WHITH-1.png" alt="Logo" className="h-8 mr-2" />
              <span className="text-lg font-semibold">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
            </div>
          ) : (
            <img src="https://i.postimg.cc/HLc2m50J/WHITH-1.png" alt="Logo" className="h-8 mx-auto" />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link to={item.path} className={`flex items-center p-3 rounded-lg transition-all duration-200 ${isActive(item) ? 'bg-white/10' : 'hover:bg-white/10'} ${sidebarOpen ? 'justify-start' : 'justify-center'}`}>
                  <span className="text-lg relative">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  {sidebarOpen && <span className={`ml-3 whitespace-nowrap transition-opacity duration-200 ${isActive(item) ? 'font-medium' : ''}`}>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className={`p-4 border-t border-white/10 ${sidebarOpen ? 'flex items-center' : 'flex justify-center'}`}>
          <button onClick={handleLogout} className="flex items-center text-white hover:text-gray-200 transition-colors cursor-pointer">
            <FiLogOut className="text-lg" />
            {sidebarOpen && <span className="ml-3">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col overflow-hidden ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Fixed Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <button className="lg:hidden mr-4 p-2 rounded-md hover:bg-gray-100" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FiMenu className="text-gray-600 text-xl" />
            </button>
            <h1 className="text-xl font-semibold text-[#076870]">{navItems.find(item => isActive(item))?.name || 'Dashboard'}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#076870] text-sm"
                placeholder="Search..."
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            </div>

            <div className="relative">
              <img
                src={userAvatar || "https://www.w3schools.com/w3images/avatar2.png"} // Fallback to default avatar if no image is provided
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
