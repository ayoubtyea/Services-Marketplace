import React, { useState, useEffect } from 'react';
import { 
  FiHome, FiCalendar, FiMessageSquare, FiBell, 
  FiUser, FiSettings, FiHelpCircle, FiLogOut,
  FiSearch, FiChevronRight, FiCheckCircle, FiMenu
} from 'react-icons/fi';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../src/context/AuthContext'; // Import your auth context


const DashboardLayout = ({ userRole = 'client' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePath, setActivePath] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout function from auth context
  
  // Update active path when location changes
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const navItems = [
    { name: 'Dashboard', icon: <FiHome />, path: `/${userRole}-dashboard`, exact: true },
    { name: 'My Bookings', icon: <FiCalendar />, path: `/${userRole}-dashboard/bookings` },
    { name: 'Notifications', icon: <FiBell />, path: `/${userRole}-dashboard/notifications`, badge: 5 },
    { name: 'Profile & Settings', icon: <FiUser />, path: `/${userRole}-dashboard/profile` },
    { name: 'Help & Support', icon: <FiHelpCircle />, path: `/${userRole}-dashboard/help` },
  ];

  // Check if current path matches nav item
  const isActive = (item) => {
    if (item.exact) {
      return activePath === item.path;
    }
    return activePath.startsWith(item.path);
  };

  // Get current active section title
  const getActiveTitle = () => {
    const activeItem = navItems.find(item => isActive(item));
    return activeItem ? activeItem.name : 'Dashboard';
  };

  // Toggle sidebar on mobile
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
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
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar - Desktop */}
      <aside 
        className={`hidden lg:flex flex-col bg-[#076870] text-white fixed h-full z-10 transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-20'}`}
      >
        {/* Logo */}
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
                <Link 
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                    isActive(item) ? 'bg-white/10' : 'hover:bg-white/10'
                  } ${sidebarOpen ? 'justify-start' : 'justify-center'}`}
                >
                  <span className="text-lg relative">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  {sidebarOpen && (
                    <span className={`ml-3 whitespace-nowrap transition-opacity duration-200 ${
                      isActive(item) ? 'font-medium' : ''
                    }`}>
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className={`p-4 border-t border-white/10 ${sidebarOpen ? 'flex items-center' : 'flex justify-center'}`}>
          <button 
            onClick={handleLogout}
            className="flex items-center text-white hover:text-gray-200 transition-colors cursor-pointer"
          >
            <FiLogOut className="text-lg" />
            {sidebarOpen && <span className="ml-3">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      <aside 
        className={`lg:hidden flex flex-col bg-[#076870] text-white fixed h-full z-30 w-64 transition-transform duration-300 ease-in-out ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Sidebar Content */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center">
            <img src="https://i.postimg.cc/HLc2m50J/WHITH-1.png" alt="Logo" className="h-8 mr-2" />
            <span className="text-lg font-semibold">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path}
                  onClick={toggleMobileSidebar}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                    isActive(item) ? 'bg-white/10' : 'hover:bg-white/10'
                  }`}
                >
                  <span className="text-lg relative">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <span className={`ml-3 whitespace-nowrap ${isActive(item) ? 'font-medium' : ''}`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-white/10 flex items-center">
          <button 
            onClick={handleLogout}
            className="flex items-center text-white hover:text-gray-200 transition-colors"
          >
            <FiLogOut className="text-lg" />
            <span className="ml-3">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col overflow-hidden ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Fixed Header - Always visible */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-4 p-2 rounded-md hover:bg-gray-100"
              onClick={toggleMobileSidebar}
            >
              <FiMenu className="text-gray-600 text-xl" />
            </button>
            <h1 className="text-xl font-semibold text-[#076870]">
              {getActiveTitle()}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center w-full max-w-2xl bg-[#E0F2F1] rounded-2xl px-3 py-2">
              <FiSearch className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400"
              />
            </div>
            <button className="p-2 relative rounded-full hover:bg-gray-100 transition-colors">
              <FiBell className="text-gray-600" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                5
              </span>
            </button>
            <div className="flex items-center space-x-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
             
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