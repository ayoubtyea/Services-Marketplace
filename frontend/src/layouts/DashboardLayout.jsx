import React, { useState } from 'react';
import { 
  FiHome, FiCalendar, FiMessageSquare, FiBell, 
  FiUser, FiSettings, FiHelpCircle, FiLogOut,
  FiSearch, FiChevronRight, FiCheckCircle,
  FiUsers, FiPackage, FiDollarSign, FiBarChart2
} from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children, userRole = 'client' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [profileCompletion] = useState(85); // Example completion percentage



  
  // Define navigation items for each role
  const roleBasedNavItems = {
    client: [
      { name: 'Dashboard', icon: <FiHome />, path: '/client-dashboard' },
      { name: 'My Bookings', icon: <FiCalendar />, path: '/client-dashboard/bookings' },
      { name: 'Messages', icon: <FiMessageSquare />, path: '/client-dashboard/messages', badge: 3 },
      { name: 'Notifications', icon: <FiBell />, path: '/client-dashboard/notifications', badge: 5 },
      { name: 'Profile', icon: <FiUser />, path: '/client-dashboard/profile' },
      { name: 'Settings', icon: <FiSettings />, path: '/client-dashboard/settings' },
      { name: 'Help & Support', icon: <FiHelpCircle />, path: '/client-dashboard/support' },
    ],
    provider: [
      { name: 'Dashboard', icon: <FiHome />, path: '/provider-dashboard' },
      { name: 'Services', icon: <FiPackage />, path: '/provider-dashboard/services' },
      { name: 'Appointments', icon: <FiCalendar />, path: '/provider-dashboard/appointments' },
      { name: 'Messages', icon: <FiMessageSquare />, path: '/provider-dashboard/messages', badge: 3 },
      { name: 'Earnings', icon: <FiDollarSign />, path: '/provider-dashboard/earnings' },
      { name: 'Profile', icon: <FiUser />, path: '/provider-dashboard/profile' },
      { name: 'Settings', icon: <FiSettings />, path: '/provider-dashboard/settings' },
    ],
    admin: [
      { name: 'Dashboard', icon: <FiHome />, path: '/admin-dashboard' },
      { name: 'Users', icon: <FiUsers />, path: '/admin-dashboard/users' },
      { name: 'Services', icon: <FiPackage />, path: '/admin-dashboard/services' },
      { name: 'Bookings', icon: <FiCalendar />, path: '/admin-dashboard/bookings' },
      { name: 'Reports', icon: <FiBarChart2 />, path: '/admin-dashboard/reports' },
      { name: 'Settings', icon: <FiSettings />, path: '/admin-dashboard/settings' },
    ]
  };

  // Get the appropriate nav items based on user role
  const navItems = roleBasedNavItems[userRole] || roleBasedNavItems.client;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Smooth Sidebar */}
      <aside 
        className={`hidden lg:flex flex-col bg-[#076870] text-white fixed h-full z-10 transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-20'}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {sidebarOpen ? (
            <div className="flex items-center">
              <img src={"https://i.postimg.cc/HLc2m50J/WHITH-1.png"} alt="Logo" className="h-8 mr-2" />
            </div>
          ) : (
            <img src={"https://i.postimg.cc/HLc2m50J/WHITH-1.png"} alt="Logo" className="h-8 mx-auto" />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 ${location.pathname === item.path ? 'bg-white/10' : 'hover:bg-white/10'} ${sidebarOpen ? 'justify-start' : 'justify-center'}`}
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
                    <span className="ml-3 whitespace-nowrap">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className={`p-4 border-t border-white/10 ${sidebarOpen ? 'flex items-center' : 'flex justify-center'}`}>
          <button 
            onClick={() => navigate('/logout')}
            className="flex items-center text-white hover:text-gray-200 transition-colors"
          >
            <FiLogOut className="text-lg" />
            {sidebarOpen && <span className="ml-3">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 overflow-auto h-full ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header with Search */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center w-full max-w-2xl">
            <h1 className="text-xl font-semibold text-[#076870]">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center w-full max-w-2xl bg-[#E0F2F1] rounded-2xl px-2 py-2">
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

        <main className="p-6 min-h-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;