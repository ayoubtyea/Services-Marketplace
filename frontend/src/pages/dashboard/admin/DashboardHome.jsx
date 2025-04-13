import React from 'react';
import { FiUsers, FiUser, FiCalendar, FiCheckCircle, FiFileText, FiStar, FiMail, FiPhone, FiMapPin, FiAward, FiEye } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; // For the booking trends chart

// Dummy Data
const sampleUpcomingBookings = [
  {
    id: 1,
    service: "Deep Cleaning",
    date: "2023-06-15",
    time: "10:00 AM",
    duration: "2 hours",
    address: "123 Main St, Apt 4B",
    serviceType: "Home Cleaning",
    providerName: "CleanPro Team",
    providerImage: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4
  },
  {
    id: 2,
    service: "AC Maintenance",
    date: "2023-06-18",
    time: "2:30 PM",
    duration: "1.5 hours",
    address: "123 Main St, Apt 4B",
    serviceType: "Appliance Repair",
    providerName: "CoolAir Experts",
    providerImage: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  }
];

// Dummy Data for Pending Approvals
const samplePendingApprovals = [
  { id: 1, type: 'New Services', count: 10 },
  { id: 2, type: 'Tasker Applications', count: 5 },
  { id: 3, type: 'New Reviews', count: 8 }
];

// Dummy Data for Recent Activities
const recentActivities = [
  { id: 1, type: 'Booking Confirmed', service: 'Deep Cleaning', date: '2023-06-10' },
  { id: 2, type: 'Service Rated', service: 'AC Maintenance', date: '2023-06-08' },
  { id: 3, type: 'Payment Processed', service: 'Furniture Assembly', date: '2023-06-07' },
  { id: 4, type: 'Refund Processed', service: 'Plumbing Repair', date: '2023-06-06' }
];

// Static BookingDetailRow Component for now
const BookingDetailRow = ({ label, value }) => (
  <div className="flex items-start gap-3">
    <FiCalendar className="text-[#076870] mt-0.5 flex-shrink-0" size={16} />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  </div>
);

const DashboardHome = () => {
  // Dummy data for the booking trends chart
  const data = [
    { name: 'Week 1', bookings: 10 },
    { name: 'Week 2', bookings: 12 },
    { name: 'Week 3', bookings: 14 },
    { name: 'Week 4', bookings: 16 },
  ];

  return (
    <div className="space-y-6">
      {/* Four Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-[#E0F2F1] p-6 rounded-xl shadow-md flex items-center">
          <FiUsers className="text-[#076870] text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-[#076870]">Total Taskers</h3>
            <p className="text-2xl font-bold">120</p>
          </div>
        </div>
        <div className="bg-[#E0F2F1] p-6 rounded-xl shadow-md flex items-center">
          <FiUser className="text-[#076870] text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-[#076870]">Total Customers</h3>
            <p className="text-2xl font-bold">200</p>
          </div>
        </div>
        <div className="bg-[#E0F2F1] p-6 rounded-xl shadow-md flex items-center">
          <FiCalendar className="text-[#076870] text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-[#076870]">Active Bookings</h3>
            <p className="text-2xl font-bold">50</p>
          </div>
        </div>
        <div className="bg-[#E0F2F1] p-6 rounded-xl shadow-md flex items-center">
          <FiAward className="text-[#076870] text-3xl mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-[#076870]">Total Revenue</h3>
            <p className="text-2xl font-bold">$5000</p>
          </div>
        </div>
      </div>

      {/* Booking Trends Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h3 className="text-xl font-semibold text-[#076870] mb-4">Booking Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="bookings" stroke="#076870" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pending Approvals Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {samplePendingApprovals.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-[#076870]">{item.type}</h3>
            <p className="text-2xl font-bold text-[#076870]">{item.count}</p>
            <div className="flex justify-between items-center mt-4">
              <button className="bg-[#076870] text-white px-4 py-2 rounded-lg">View All</button>
              <button className="bg-[#076870] text-white px-4 py-2 rounded-lg">Approve</button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h3 className="text-xl font-semibold text-[#076870] mb-4">Recent Activities</h3>
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
    </div>
  );
};

export default DashboardHome;
