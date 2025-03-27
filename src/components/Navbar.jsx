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

  // Enhanced auth check with proper state setting
  const checkAuth = () => {
    try {
      const token = localStorage.getItem("authToken");
      const userData = JSON.parse(localStorage.getItem("userData") || "null");
      
      console.log("Auth check - userData:", userData); // Debug log
      
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

  const getDashboardPath = () => {
    // Use the state data rather than localStorage directly
    const { userRole, userData } = authState;
    console.log("Dashboard path - current role:", userRole, "Full userData:", userData);
    
    switch(userRole) {
      case 'admin': return '/admin-dashboard';
      case 'provider': return '/provider-dashboard';
      case 'client': return '/client-dashboard';
      default: {
        console.warn("Unknown role, redirecting to home");
        return '/';
      }
    }
  };
  return (
    <nav className="bg-[#F2EADD] md:rounded-full mt-4 mx-auto max-w-7xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="https://i.postimg.cc/C5dQgh9H/MAIN-1.png"
            alt="Handy Home"
            className="h-8"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-poppins flex-grow justify-center">
          <Link to="/" className="text-gray-700 hover:text-[#076870] transition-colors duration-300">
            Home
          </Link>
          <Link to="/services" className="text-gray-700 hover:text-[#076870] transition-colors duration-300">
            Services
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-[#076870] transition-colors duration-300">
            About Us
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-[#076870] transition-colors duration-300">
            Contact Us
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {authState.isAuthenticated ? (
            <>
              <Link to={getDashboardPath()}>
                <button className="relative overflow-hidden py-2.5 px-5 text-sm font-medium text-white rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 bg-[#076870] hover:bg-white hover:text-black cursor-pointer">
                  Dashboard
                </button>
              </Link>
              <button 
                onClick={handleLogout}
                className="relative overflow-hidden py-2.5 px-5 text-sm font-medium text-white rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 bg-[#076870] hover:bg-white hover:text-black cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="relative overflow-hidden py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 hover:bg-[#076870] hover:text-white cursor-pointer">
                Become a Tasker
              </button>
              <Link to="/auth">
                <button className="relative overflow-hidden py-2.5 px-5 text-sm font-medium text-white rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 bg-[#076870] hover:bg-white hover:text-black cursor-pointer">
                  Sign Up / Log in
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#F2EADD] font-poppins mx-4 mt-2 px-6 py-6 space-y-3">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-[#076870] hover:text-white transition-colors duration-300">
            Home
          </Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-[#076870] hover:text-white transition-colors duration-300">
            Services
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-[#076870] hover:text-white transition-colors duration-300">
            About Us
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-[#076870] hover:text-white transition-colors duration-300">
            Contact Us
          </Link>

          {authState.isAuthenticated ? (
            <>
              <Link 
                to={getDashboardPath()} 
                onClick={() => setIsOpen(false)}
                className="block"
              >
                <button className="w-full mt-2 relative overflow-hidden py-2.5 px-5 text-sm font-medium text-white rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 bg-[#076870] hover:bg-white hover:text-black cursor-pointer">
                  Dashboard
                </button>
              </Link>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full mt-2 relative overflow-hidden py-2.5 px-5 text-sm font-medium text-white rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 bg-[#076870] hover:bg-white hover:text-black cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full text-left px-4 py-2 text-sm font-medium text-[#076870] rounded-full focus:outline-none transition-all duration-300 hover:bg-[#076870] hover:text-white cursor-pointer"
              >
                Become A Tasker
              </button>
              <Link 
                to="/auth" 
                onClick={() => setIsOpen(false)}
                className="block"
              >
                <button className="w-full mt-2 relative overflow-hidden py-2.5 px-5 text-sm font-medium text-white rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 bg-[#076870] hover:bg-white hover:text-black cursor-pointer">
                  Sign Up / Log in
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;