import React from 'react';
import DashboardLayout from '../DashboardLayout';


const ClientDashboard = () => {
  return (
    <DashboardLayout title="Client Dashboard">
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-800">Welcome Back!</h2>
          <p className="text-blue-600">Manage your services and bookings here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Service Cards */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-800">My Bookings</h3>
            <p className="text-gray-600 mt-2">View and manage your upcoming appointments</p>
            <button className="mt-4 bg-[#076870] text-white px-4 py-2 rounded-full text-sm hover:bg-[#065d64] transition">
              View Bookings
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-800">Service History</h3>
            <p className="text-gray-600 mt-2">Review your past service requests</p>
            <button className="mt-4 bg-[#076870] text-white px-4 py-2 rounded-full text-sm hover:bg-[#065d64] transition">
              View History
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-800">Payment Methods</h3>
            <p className="text-gray-600 mt-2">Manage your saved payment options</p>
            <button className="mt-4 bg-[#076870] text-white px-4 py-2 rounded-full text-sm hover:bg-[#065d64] transition">
              Manage Payments
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          {/* Activity feed would go here */}
          <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
            Your recent activity will appear here
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;