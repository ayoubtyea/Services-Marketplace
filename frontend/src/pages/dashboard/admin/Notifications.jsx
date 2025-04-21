import React, { useState } from 'react';
import { FiMail, FiPhone, FiBell, FiAlertTriangle, FiSearch, FiFilter, FiClock } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const NotificationManagement = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [inAppEnabled, setInAppEnabled] = useState(true);
  const [emergencyEnabled, setEmergencyEnabled] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationType, setNotificationType] = useState('all');
  const [timeRange, setTimeRange] = useState('30days');

  const notificationData = [
    { id: 1, type: 'email', subject: 'Booking Confirmation', audience: 'Customers', sent: '2023-06-15 09:23:45', status: 'delivered' },
    { id: 2, type: 'sms', subject: 'Service Reminder', audience: 'Taskers', sent: '2023-06-14 14:12:33', status: 'delivered' },
    { id: 3, type: 'in-app', subject: 'New Review Received', audience: 'Taskers', sent: '2023-06-14 10:45:12', status: 'read' },
    { id: 4, type: 'email', subject: 'Payment Receipt', audience: 'Customers', sent: '2023-06-13 18:30:05', status: 'failed' },
    { id: 5, type: 'in-app', subject: 'New Message', audience: 'All Users', sent: '2023-06-12 22:15:42', status: 'read' },
    { id: 6, type: 'sms', subject: 'Emergency Maintenance', audience: 'All Users', sent: '2023-06-10 08:05:21', status: 'delivered' },
  ];

  const performanceData = [
    { name: 'Jan', delivery: 95, open: 65, click: 30 },
    { name: 'Feb', delivery: 97, open: 70, click: 35 },
    { name: 'Mar', delivery: 98, open: 75, click: 40 },
    { name: 'Apr', delivery: 96, open: 72, click: 38 },
    { name: 'May', delivery: 99, open: 80, click: 45 },
    { name: 'Jun', delivery: 100, open: 85, click: 50 },
  ];

  const filteredNotifications = notificationData.filter(notification => {
    const matchesSearch = notification.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = notificationType === 'all' || notification.type === notificationType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Notification Settings Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Notifications Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <FiMail className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Email Notifications</h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Enable email notifications</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={emailEnabled}
                  onChange={() => setEmailEnabled(!emailEnabled)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Email Templates</h4>
              <button className="text-sm text-blue-600 hover:text-blue-700">Manage Templates</button>
            </div>
          </div>
          
          {/* SMS Notifications Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <FiPhone className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">SMS Notifications</h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Enable SMS notifications</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={smsEnabled}
                  onChange={() => setSmsEnabled(!smsEnabled)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">SMS Credits</h4>
              <p className="text-sm text-gray-600">Remaining: 1,245</p>
            </div>
          </div>
          
          {/* In-App Notifications Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <FiBell className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">In-App Notifications</h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Enable in-app notifications</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={inAppEnabled}
                  onChange={() => setInAppEnabled(!inAppEnabled)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Notification Sounds</h4>
              <button className="text-sm text-purple-600 hover:text-purple-700">Configure Sounds</button>
            </div>
          </div>
        </div>
        
        {/* Emergency Notifications Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                <FiAlertTriangle className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Emergency Notifications</h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={emergencyEnabled}
                onChange={() => setEmergencyEnabled(!emergencyEnabled)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Emergency notifications will be sent to all users via all enabled channels (email, SMS, and in-app).
          </p>
          <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700">
            Send Emergency Notification
          </button>
        </div>
        
        {/* Recent Notifications Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 md:mb-0">Recent Notifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search Subject"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 px-4 py-2 w-full"
                value={notificationType}
                onChange={(e) => setNotificationType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="in-app">In-App</option>
              </select>
              
              <select
                className="border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 px-4 py-2 w-full"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="30days">Last 30 Days</option>
                <option value="7days">Last 7 Days</option>
                <option value="today">Today</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Audience
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredNotifications.map((notification) => (
                  <tr key={notification.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {notification.type === 'email' && (
                          <FiMail className="text-blue-500 mr-2" />
                        )}
                        {notification.type === 'sms' && (
                          <FiPhone className="text-green-500 mr-2" />
                        )}
                        {notification.type === 'in-app' && (
                          <FiBell className="text-purple-500 mr-2" />
                        )}
                        <span className="capitalize">{notification.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {notification.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {notification.audience}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {notification.sent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        notification.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        notification.status === 'read' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {notification.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Resend</button>
                      <button className="text-gray-600 hover:text-gray-900">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Notification Performance Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Notification Performance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-blue-800">Delivery Rate</h3>
                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  <FiMail />
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-800 mt-2">98.7%</p>
              <p className="text-xs text-blue-600 mt-1">+2.3% from last month</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-green-800">Open Rate</h3>
                <div className="p-2 rounded-full bg-green-100 text-green-600">
                  <FiBell />
                </div>
              </div>
              <p className="text-2xl font-bold text-green-800 mt-2">78.2%</p>
              <p className="text-xs text-green-600 mt-1">+5.1% from last month</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-purple-800">Click-Through Rate</h3>
                <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                  <FiAlertTriangle />
                </div>
              </div>
              <p className="text-2xl font-bold text-purple-800 mt-2">42.5%</p>
              <p className="text-xs text-purple-600 mt-1">+3.7% from last month</p>
            </div>
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default NotificationManagement;