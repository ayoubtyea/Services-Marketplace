import React from 'react';
import DashboardLayout from './DashboardLayout';
import { FiCalendar, FiDollarSign, FiStar, FiTool, FiClock } from 'react-icons/fi';

const ProviderDashboard = ({ userRole = 'provider', userAvatar = '' }) => {
  // Dummy Data
  const upcomingJobs = 5;
  const completedJobs = 42;
  const averageRating = 4.8;
  const totalEarnings = 3250;
  const responseRate = '92%';

  const pendingRequests = [
    {
      id: 1,
      service: 'Deep Cleaning',
      customer: 'Sarah Johnson',
      date: '2023-06-15',
      status: 'Pending Confirmation',
    },
    {
      id: 2,
      service: 'AC Maintenance',
      customer: 'Michael Brown',
      date: '2023-06-16',
      status: 'Pending Confirmation',
    },
  ];

  const recentJobs = [
    { 
      id: 1, 
      type: 'Completed', 
      service: 'Plumbing Repair', 
      customer: 'Alex Chen',
      date: '2023-06-10',
      earnings: '$120'
    },
    { 
      id: 2, 
      type: 'Completed', 
      service: 'Furniture Assembly', 
      customer: 'Emma Wilson',
      date: '2023-06-08',
      earnings: '$85'
    },
    { 
      id: 3, 
      type: 'Cancelled', 
      service: 'Electrical Work', 
      customer: 'David Kim',
      date: '2023-06-07',
      earnings: '$0'
    },
  ];

  return (
    <DashboardLayout userRole={userRole} userAvatar={userAvatar}>
      {/* Top Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
        <div className="bg-[#E0F2F1] p-6 rounded-xl shadow-md flex items-center">
          <FiCalendar className="text-[#076870] text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-[#076870]">Upcoming Jobs</h3>
            <p className="text-2xl font-bold">{upcomingJobs}</p>
          </div>
        </div>
        <div className="bg-[#E0F2F1] p-6 rounded-xl shadow-md flex items-center">
          <FiTool className="text-[#076870] text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-[#076870]">Completed Jobs</h3>
            <p className="text-2xl font-bold">{completedJobs}</p>
          </div>
        </div>
        <div className="bg-[#E0F2F1] p-6 rounded-xl shadow-md flex items-center">
          <FiStar className="text-[#076870] text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-[#076870]">Average Rating</h3>
            <p className="text-2xl font-bold">{averageRating}/5</p>
          </div>
        </div>
        <div className="bg-[#E0F2F1] p-6 rounded-xl shadow-md flex items-center">
          <FiDollarSign className="text-[#076870] text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-[#076870]">Total Earnings</h3>
            <p className="text-2xl font-bold">${totalEarnings}</p>
          </div>
        </div>
        <div className="bg-[#E0F2F1] p-6 rounded-xl shadow-md flex items-center">
          <FiClock className="text-[#076870] text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-[#076870]">Response Rate</h3>
            <p className="text-2xl font-bold">{responseRate}</p>
          </div>
        </div>
      </div>

      {/* Pending Requests Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h3 className="text-xl font-semibold text-[#076870] mb-4">Pending Requests</h3>
        <div className="space-y-4">
          {pendingRequests.map((request) => (
            <div key={request.id} className="flex flex-col md:flex-row md:justify-between md:items-center p-4 border border-gray-200 rounded-lg">
              <div className="mb-2 md:mb-0">
                <h4 className="text-lg font-medium">{request.service}</h4>
                <p className="text-gray-500">{request.customer}</p>
                <p className="text-gray-400 text-sm">{new Date(request.date).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm w-fit">
                  {request.status}
                </span>
                <div className="flex gap-2">
                  <button className="text-[#076870] hover:text-[#054b52] px-3 py-1 border border-[#076870] rounded-lg">
                    View Details
                  </button>
                  <button className="bg-[#076870] text-white px-4 py-1 rounded-lg hover:bg-[#054b52]">
                    Respond
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Jobs Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h3 className="text-xl font-semibold text-[#076870] mb-4">Recent Jobs</h3>
        <div className="space-y-4">
          {recentJobs.map((job) => (
            <div key={job.id} className="flex flex-col md:flex-row md:justify-between p-4 border border-gray-200 rounded-lg">
              <div className="mb-2 md:mb-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-medium">{job.service}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    job.type === 'Completed' ? 'bg-green-100 text-green-800' : 
                    job.type === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {job.type}
                  </span>
                </div>
                <p className="text-gray-500">{job.customer}</p>
                <p className="text-gray-400 text-sm">{new Date(job.date).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-lg font-semibold">{job.earnings}</p>
                <button className="text-[#076870] hover:text-[#054b52] text-sm mt-2">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-[#076870] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-[#076870] text-white p-4 rounded-lg hover:bg-[#054b52] transition-colors flex flex-col items-center">
            <FiCalendar className="text-2xl mb-2" />
            <span>Schedule</span>
          </button>
          <button className="bg-[#076870] text-white p-4 rounded-lg hover:bg-[#054b52] transition-colors flex flex-col items-center">
            <FiDollarSign className="text-2xl mb-2" />
            <span>Withdraw</span>
          </button>
          <button className="bg-[#076870] text-white p-4 rounded-lg hover:bg-[#054b52] transition-colors flex flex-col items-center">
            <FiTool className="text-2xl mb-2" />
            <span>Add Service</span>
          </button>
          <button className="bg-[#076870] text-white p-4 rounded-lg hover:bg-[#054b52] transition-colors flex flex-col items-center">
            <FiStar className="text-2xl mb-2" />
            <span>View Reviews</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProviderDashboard;