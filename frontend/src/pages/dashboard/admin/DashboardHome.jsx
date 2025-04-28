import React, { useState } from 'react';
import { FiUsers, FiUser, FiCalendar, FiCheckCircle, FiStar, FiDollarSign, FiFileText, FiChevronRight } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const samplePendingApprovals = [
  { id: 1, type: 'New Services', count: 10, icon: <FiFileText />, color: 'bg-teal-100 text-teal-600' },
  { id: 2, type: 'Tasker Applications', count: 5, icon: <FiUser />, color: 'bg-teal-100 text-teal-600' },
  { id: 3, type: 'New Reviews', count: 8, icon: <FiStar />, color: 'bg-teal-100 text-teal-600' }
];

const recentActivities = [
  { id: 1, type: 'Booking Confirmed', service: 'Deep Cleaning', date: '2023-06-10', icon: <FiCheckCircle />, color: 'bg-teal-100 text-teal-600' },
  { id: 2, type: 'Service Rated', service: 'AC Maintenance', date: '2023-06-08', icon: <FiStar />, color: 'bg-teal-100 text-teal-600' },
  { id: 3, type: 'Payment Processed', service: 'Furniture Assembly', date: '2023-06-07', icon: <FiDollarSign />, color: 'bg-teal-100 text-teal-600' },
  { id: 4, type: 'Refund Processed', service: 'Plumbing Repair', date: '2023-06-06', icon: <FiDollarSign />, color: 'bg-teal-100 text-teal-600' }
];

const DashboardHome = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('weekly');

  const chartData = {
    weekly: [
      { name: 'Mon', bookings: 10, revenue: 1200 },
      { name: 'Tue', bookings: 12, revenue: 1500 },
      { name: 'Wed', bookings: 14, revenue: 1800 },
      { name: 'Thu', bookings: 16, revenue: 2100 },
      { name: 'Fri', bookings: 18, revenue: 2400 },
      { name: 'Sat', bookings: 20, revenue: 2700 },
      { name: 'Sun', bookings: 15, revenue: 2000 },
    ],
    monthly: [
      { name: 'Jan', bookings: 40, revenue: 5000 },
      { name: 'Feb', bookings: 45, revenue: 5500 },
      { name: 'Mar', bookings: 50, revenue: 6000 },
      { name: 'Apr', bookings: 60, revenue: 7000 },
      { name: 'May', bookings: 65, revenue: 7500 },
      { name: 'Jun', bookings: 70, revenue: 8000 },
    ],
    yearly: [
      { name: '2021', bookings: 150, revenue: 18000 },
      { name: '2022', bookings: 180, revenue: 22000 },
      { name: '2023', bookings: 200, revenue: 25000 },
    ]
  };

  const handleTimeFrameChange = (timeFrame) => {
    setSelectedTimeFrame(timeFrame);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards with Unified Teal Color */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {[
    { 
      title: "Total Taskers", 
      value: "120", 
      change: "+12%", 
      icon: <FiUsers />
    },
    { 
      title: "Total Customers", 
      value: "200", 
      change: "+8%", 
      icon: <FiUser />
    },
    { 
      title: "Active Bookings", 
      value: "50", 
      change: "+5%", 
      icon: <FiCalendar />
    },
  ].map((stat, index) => (
    <div 
      key={index} 
      className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 rounded-xl shadow-lg text-white hover:shadow-xl transition-all"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium opacity-90">{stat.title}</p>
          <p className="text-2xl font-bold mt-1">{stat.value}</p>
          <p className="text-xs mt-2 opacity-90">
            <span className="text-teal-100">
              {stat.change} from last month
            </span>
          </p>
        </div>
        <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
          {React.cloneElement(stat.icon, { 
            className: "text-2xl",
            style: { color: '#276e76' } 
          })}
        </div>
      </div>
    </div>
  ))}
</div>
        {/* Professional Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Booking Trends</h2>
            <div className="flex space-x-2">
              {['weekly', 'monthly', 'yearly'].map((timeFrame) => (
                <button
                  key={timeFrame}
                  className={`px-3 py-1 text-xs rounded-md transition-all ${
                    selectedTimeFrame === timeFrame 
                      ? 'bg-teal-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => handleTimeFrameChange(timeFrame)}
                >
                  {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData[selectedTimeFrame]}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    padding: '10px'
                  }}
                  itemStyle={{ 
                    color: '#047481',
                    fontSize: '12px'
                  }}
                  labelStyle={{ 
                    fontWeight: 'bold', 
                    color: '#047481',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: '20px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="bookings" 
                  name="Bookings" 
                  fill="url(#colorBookings)" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="revenue" 
                  name="Revenue ($)" 
                  fill="url(#colorRevenue)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Pending Approvals</h2>
            <button className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center transition-colors">
              View all <FiChevronRight className="ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {samplePendingApprovals.map((item) => (
              <div key={item.id} className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
                <div className={`h-10 w-10 rounded-full ${item.color} flex items-center justify-center flex-shrink-0`}>
                  {item.icon}
                </div>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-800">{item.type}</h4>
                    <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {item.count} pending
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">Requires your review</p>
                    <button className="text-xs text-teal-600 flex items-center">
                      Review <FiChevronRight className="ml-1" size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
            <button className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center transition-colors">
              View all <FiChevronRight className="ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
                <div className={`h-10 w-10 rounded-full ${activity.color} flex items-center justify-center flex-shrink-0`}>
                  {activity.icon}
                </div>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-800">{activity.type}</h4>
                    <span className="text-xs text-gray-400">{new Date(activity.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">{activity.service}</p>
                    <button className="text-xs text-teal-600 flex items-center">
                      Details <FiChevronRight className="ml-1" size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;