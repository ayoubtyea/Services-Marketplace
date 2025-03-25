import React from 'react';
import DashboardLayout from '../DashboardLayout';


const AdminDashboard = () => {
  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="space-y-6">
        <div className="bg-purple-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-purple-800">Administration Panel</h2>
          <p className="text-purple-600">Manage users, services, and platform settings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin Cards */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-800">User Management</h3>
            <p className="text-gray-600 mt-2">View and manage all user accounts</p>
            <button className="mt-4 bg-[#076870] text-white px-4 py-2 rounded-full text-sm hover:bg-[#065d64] transition">
              Manage Users
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-800">Service Moderation</h3>
            <p className="text-gray-600 mt-2">Approve or remove services</p>
            <button className="mt-4 bg-[#076870] text-white px-4 py-2 rounded-full text-sm hover:bg-[#065d64] transition">
              Moderate Services
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-800">Platform Analytics</h3>
            <p className="text-gray-600 mt-2">View platform usage statistics</p>
            <button className="mt-4 bg-[#076870] text-white px-4 py-2 rounded-full text-sm hover:bg-[#065d64] transition">
              View Analytics
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
              Create New Admin
            </button>
            <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
              View Reports
            </button>
            <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
              System Settings
            </button>
            <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
              Manage Payments
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <span className="text-gray-700">New user registration</span>
              <span className="text-sm text-gray-500">2 minutes ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <span className="text-gray-700">Service provider approved</span>
              <span className="text-sm text-gray-500">15 minutes ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">System backup completed</span>
              <span className="text-sm text-gray-500">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;