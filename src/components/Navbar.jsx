import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#F2EADD] md:rounded-full mt-4 mx-auto max-w-7xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="https://i.postimg.cc/C5dQgh9H/MAIN-1.png"
            alt="Handy Home"
            className="h-8"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 font-poppins flex-grow justify-center">
          <a
            href="/"
            className="text-gray-700 hover:text-[#076870] transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="/services"
            className="text-gray-700 hover:text-[#076870] transition-colors duration-300"
          >
            Services
          </a>
          <a
            href="/about"
            className="text-gray-700 hover:text-[#076870] transition-colors duration-300"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="text-gray-700 hover:text-[#076870] transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="relative overflow-hidden py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 hover:bg-[#076870] hover:text-white cursor-pointer">
            Become a Tasker
          </button>

          <Link to="/auth">
            <button className="relative overflow-hidden py-2.5 px-5 text-sm font-medium text-white rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 bg-[#076870] hover:bg-white hover:text-black cursor-pointer">
              Sign Up / Log in
            </button>
          </Link>
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
        <div className="md:hidden bg-[#F2EADD] font-poppins mx-4 mt-2 px-6 py-6">
          <a
            href="/"
            className="block px-4 py-2 text-gray-700 hover:bg-[#076870] hover:text-white transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="/services"
            className="block px-4 py-2 text-gray-700 hover:bg-[#076870] hover:text-white transition-colors duration-300"
          >
            Services
          </a>
          <a
            href="/about"
            className="block px-4 py-2 text-gray-700 hover:bg-[#076870] hover:text-white transition-colors duration-300"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="block px-4 py-2 text-gray-700 hover:bg-[#076870] hover:text-white transition-colors duration-300"
          >
            Contact Us
          </a>

          <Link>
            <button className="relative overflow-hidden py-2.5 px-5 text-sm font-medium text-[#076870] rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 bg-white hover:bg-[#076870] hover:text-black cursor-pointer">
              Become A Tasker
            </button>
          </Link>

          <Link to="/auth">
            <button className="relative overflow-hidden py-2.5 px-5 text-sm font-medium text-white rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 bg-[#076870] hover:bg-white hover:text-black cursor-pointer">
              Sign Up / Log in
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
