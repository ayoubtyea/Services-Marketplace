import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
    userData: null
  });
  const navigate = useNavigate();

  const checkAuth = () => {
    try {
      const token = localStorage.getItem("authToken");
      const userData = JSON.parse(localStorage.getItem("userData") || "null");
      
      setAuthState({
        isAuthenticated: !!token,
        userRole: userData?.role || null,
        userData: userData
      });
    } catch (error) {
      console.error("Error checking auth:", error);
      setAuthState({
        isAuthenticated: false, 
        userRole: null, 
        userData: null 
      });
    }
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener('storage', checkAuth);  
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setAuthState({ 
      isAuthenticated: false, 
      userRole: null, 
      userData: null 
    });
    navigate("/");
  };

  // Handle dashboard navigation based on role
  const handleDashboardClick = () => {
    if (!authState.userRole) {
      navigate('/');  // If no user role, redirect to the homepage
      return;
    }

    const role = authState.userRole.toLowerCase();
    switch (role) {
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'provider':
        navigate('/provider-dashboard');
        break;
      case 'client':
        navigate('/client-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <nav className="bg-[#F2EADD] md:rounded-full mt-4 mx-auto max-w-7xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="https://i.postimg.cc/C5dQgh9H/MAIN-1.png" alt="Handy Home" className="h-8" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-poppins flex-grow justify-center">
          <Link to="/" className="text-gray-700 hover:text-[#076870] transition-colors duration-300">Home</Link>
          <Link to="/services" className="text-gray-700 hover:text-[#076870] transition-colors duration-300">Services</Link>
          <Link to="/about" className="text-gray-700 hover:text-[#076870] transition-colors duration-300">About Us</Link>
          <Link to="/contact" className="text-gray-700 hover:text-[#076870] transition-colors duration-300">Contact Us</Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {authState.isAuthenticated ? (
            <>
              <button 
                onClick={handleDashboardClick}
                className="relative overflow-hidden py-2.5 px-5 text-sm font-medium text-white rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 bg-[#076870] hover:bg-white hover:text-black cursor-pointer"
              >
                Dashboard
              </button>
              <button 
                onClick={handleLogout}
                className="relative overflow-hidden py-2.5 px-5 text-sm font-medium text-white rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 bg-[#076870] hover:bg-white hover:text-black cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/become-tasker">
                <button className="relative overflow-hidden py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 hover:bg-[#076870] hover:text-white cursor-pointer">
                  Become a Tasker
                </button>
              </Link>
              <Link to="/auth">
                <button className="relative overflow-hidden py-2.5 px-5 text-sm font-medium text-white rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 bg-[#076870] hover:bg-white hover:text-black cursor-pointer">
                  Sign Up / Log in
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


