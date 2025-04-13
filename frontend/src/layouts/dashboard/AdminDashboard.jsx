import React from 'react';
import DashboardLayout from './DashboardLayout'; // Import DashboardLayout
import { FiUsers, FiUser, FiCalendar } from 'react-icons/fi';
import DashboardHome from '../../pages/dashboard/admin/DashboardHome'; // Import DashboardHome

const AdminDashboard = ({ userRole = 'guest', userAvatar = '' }) => {
  // Dummy Data
  const taskerCount = 120;
  const customerCount = 200;
  const activeBookings = 50;

  const pendingApprovals = [
    {
      id: 1,
      service: 'Deep Cleaning',
      provider: 'CleanPro Team',
      status: 'Pending',
    },
    {
      id: 2,
      service: 'AC Maintenance',
      provider: 'CoolAir Experts',
      status: 'Pending',
    },
  ];

  const recentActivities = [
    { id: 1, type: 'Booking Confirmed', service: 'Deep Cleaning', date: '2023-06-10' },
    { id: 2, type: 'Service Rated', service: 'Plumbing Repair', date: '2023-06-08' },
    { id: 3, type: 'Payment Processed', service: 'Furniture Assembly', date: '2023-06-07' },
  ];

  return (
    <DashboardLayout userRole={userRole} userAvatar={userAvatar}>
      {/* Top Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#E0F2F1] p-6 rounded-xl shadow-md flex items-center">
          <FiUsers className="text-[#076870] text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-[#076870]">Total Taskers</h3>
            <p className="text-2xl font-bold">{taskerCount}</p>
          </div>
        </div>
        <div className="bg-[#E0F2F1] p-6 rounded-xl shadow-md flex items-center">
          <FiUser className="text-[#076870] text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-[#076870]">Total Customers</h3>
            <p className="text-2xl font-bold">{customerCount}</p>
          </div>
        </div>
        <div className="bg-[#E0F2F1] p-6 rounded-xl shadow-md flex items-center">
          <FiCalendar className="text-[#076870] text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-[#076870]">Active Bookings</h3>
            <p className="text-2xl font-bold">{activeBookings}</p>
          </div>
        </div>
      </div>

      {/* Pending Approvals Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h3 className="text-xl font-semibold text-[#076870] mb-4">Pending Approvals</h3>
        <div className="space-y-4">
          {pendingApprovals.map((request) => (
            <div key={request.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="text-lg font-medium">{request.service}</h4>
                <p className="text-gray-500">{request.provider}</p>
              </div>
              <div className="flex gap-4">
                <button className="text-[#076870] hover:text-[#054b52]">View All</button>
                <button className="bg-[#076870] text-white px-4 py-2 rounded-lg">Approve</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h3 className="text-xl font-semibold text-[#076870] mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="text-lg font-medium">{activity.type}</h4>
                <p className="text-gray-500">{activity.service}</p>
                <p className="text-gray-400 text-xs">{new Date(activity.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Home Section (Admin-specific content) */}
      <DashboardHome />
    </DashboardLayout>
  );
};

export default AdminDashboard;
