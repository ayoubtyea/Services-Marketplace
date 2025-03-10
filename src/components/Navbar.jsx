import React, { useState } from "react";
import "../index.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#F2EADD] shadow-md rounded-full mt-4 mx-auto max-w-7xl">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="https://i.postimg.cc/C5dQgh9H/MAIN-1.png"
            alt="Handy Home"
            className="h-8"
          />
        </a>


        <div className="hidden md:flex items-center space-x-8 font-poppins flex-grow justify-center">
          <a href="/" className="text-gray-700 hover:text-[#076870]">Home</a>
          <a href="/services" className="text-gray-700 hover:text-[#076870]">Services</a>
          <a href="/about" className="text-gray-700 hover:text-[#076870]">About Us</a>
          <a href="/contact" className="text-gray-700 hover:text-[#076870]">Contact Us</a>
        </div>


        <div className="hidden md:flex items-center space-x-4">
          <button className="relative overflow-hidden py-2.5 px-5 text-sm font-medium text-gray-900 bg-black rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 hover:bg-black-900 hover:text-[#076870]">
            Become a Tasker
          </button>

          <button className="relative overflow-hidden py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-300 hover:bg-[#076870] hover:text-[#076870]">
            Sign Up / Log in
          </button>
        </div>


        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>


      {isOpen && (
        <div className="md:hidden bg-white shadow-lg font-poppins rounded-lg mx-4">
          <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-[#076870] hover:text-[#076870]">Home</a>
          <a href="/services" className="block px-4 py-2 text-gray-700 hover:bg-[#076870] hover:text-[#076870]">Services</a>
          <a href="/about" className="block px-4 py-2 text-gray-700 hover:bg-[#076870] hover:text-[#076870]">About Us</a>
          <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#076870] hover:text-[#076870]">
            Become a Tasker
          </button>
          <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#076870] hover:text-[#076870]">
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
