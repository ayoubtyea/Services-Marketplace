import React from 'react';
import DashboardLayout from '../DashboardLayout';

const ProviderDashboard = () => {
  return (
    <DashboardLayout title="Provider Dashboard">
      <div className="space-y-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-green-800">Your Services</h2>
          <p className="text-green-600">Manage your offered services and appointments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Service Cards */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-800">Upcoming Jobs</h3>
            <p className="text-gray-600 mt-2">View and manage your scheduled appointments</p>
            <button className="mt-4 bg-[#076870] text-white px-4 py-2 rounded-full text-sm hover:bg-[#065d64] transition">
              View Schedule
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-800">Service Requests</h3>
            <p className="text-gray-600 mt-2">New requests from potential clients</p>
            <button className="mt-4 bg-[#076870] text-white px-4 py-2 rounded-full text-sm hover:bg-[#065d64] transition">
              View Requests
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-800">Earnings</h3>
            <p className="text-gray-600 mt-2">Track your payments and earnings</p>
            <button className="mt-4 bg-[#076870] text-white px-4 py-2 rounded-full text-sm hover:bg-[#065d64] transition">
              View Earnings
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-gray-500 text-sm">Rating</p>
              <p className="text-2xl font-bold text-gray-800">4.8 ★</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-gray-500 text-sm">Completed Jobs</p>
              <p className="text-2xl font-bold text-gray-800">42</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-gray-500 text-sm">Response Time</p>
              <p className="text-2xl font-bold text-gray-800">1.2h</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProviderDashboard;