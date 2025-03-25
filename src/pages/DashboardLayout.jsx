import React from 'react';
import Navbar from '../components/Navbar';


const DashboardLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;