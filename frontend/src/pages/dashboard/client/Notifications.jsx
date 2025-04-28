import React, { useState } from 'react';
import { 
  FiBell, FiCheckCircle, FiClock, FiAlertTriangle,
  FiCalendar, FiTag, FiChevronRight, 
  FiMessageSquare, FiDollarSign, FiThumbsUp,
  FiHome, FiBriefcase, FiUser, FiSettings
} from 'react-icons/fi';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState({
    all: [
      {
        id: 1,
        type: 'booking',
        title: "Booking Confirmed",
        message: "Your premium cleaning service with Sara Lopez has been confirmed for June 15 at 10:00 AM",
        time: "2 hours ago",
        read: false,
        icon: <FiCheckCircle size={20} />,
        color: "bg-emerald-100 text-emerald-600"
      },
      {
        id: 2,
        type: 'update',
        title: "New Feature: Instant Rescheduling",
        message: "You can now reschedule bookings instantly without waiting for provider confirmation",
        time: "1 day ago",
        read: true,
        icon: <FiAlertTriangle size={20} />,
        color: "bg-sky-100 text-sky-600"
      },
      {
        id: 3,
        type: 'promotion',
        title: "Summer Special - 25% Off",
        message: "Enjoy 25% discount on all cleaning services booked this week. Use code: CLEAN25",
        time: "3 days ago",
        read: true,
        icon: <FiTag size={20} />,
        color: "bg-violet-100 text-violet-600"
      },
      {
        id: 4,
        type: 'message',
        title: "New Message from Provider",
        message: "Carlos Bob sent you a message regarding your plumbing repair appointment",
        time: "4 days ago",
        read: false,
        icon: <FiMessageSquare size={20} />,
        color: "bg-amber-100 text-amber-600"
      },
      {
        id: 5,
        type: 'payment',
        title: "Payment Processed",
        message: "Your payment of $120 for AC maintenance has been successfully processed",
        time: "1 week ago",
        read: true,
        icon: <FiDollarSign size={20} />,
        color: "bg-green-100 text-green-600"
      }
    ],
    bookings: [
      {
        id: 1,
        type: 'booking',
        title: "Booking Confirmed",
        message: "Your premium cleaning service with Sara Lopez has been confirmed for June 15 at 10:00 AM",
        time: "2 hours ago",
        read: false,
        icon: <FiCheckCircle size={20} />,
        color: "bg-emerald-100 text-emerald-600"
      },
      {
        id: 6,
        type: 'booking',
        title: "Reminder: Service Tomorrow",
        message: "Your AC maintenance with Mike Team is scheduled for tomorrow at 2:30 PM",
        time: "1 day ago",
        read: true,
        icon: <FiCalendar size={20} />,
        color: "bg-blue-100 text-blue-600"
      }
    ],
    updates: [
      {
        id: 2,
        type: 'update',
        title: "New Feature: Instant Rescheduling",
        message: "You can now reschedule bookings instantly without waiting for provider confirmation",
        time: "1 day ago",
        read: true,
        icon: <FiAlertTriangle size={20} />,
        color: "bg-sky-100 text-sky-600"
      },
      {
        id: 7,
        type: 'update',
        title: "System Maintenance Notice",
        message: "Our platform will be undergoing scheduled maintenance on June 20 from 2-4 AM",
        time: "4 days ago",
        read: true,
        icon: <FiClock size={20} />,
        color: "bg-amber-100 text-amber-600"
      }
    ],
    promotions: [
      {
        id: 3,
        type: 'promotion',
        title: "Summer Special - 25% Off",
        message: "Enjoy 25% discount on all cleaning services booked this week. Use code: CLEAN25",
        time: "3 days ago",
        read: true,
        icon: <FiTag size={20} />,
        color: "bg-violet-100 text-violet-600"
      },
      {
        id: 8,
        type: 'promotion',
        title: "Referral Bonus Activated",
        message: "You've earned a $25 credit for referring a friend to our platform",
        time: "1 week ago",
        read: true,
        icon: <FiThumbsUp size={20} />,
        color: "bg-pink-100 text-pink-600"
      }
    ]
  });

  const markAsRead = (id) => {
    const updatedNotifications = {...notifications};
    for (const tab in updatedNotifications) {
      updatedNotifications[tab] = updatedNotifications[tab].map(notification => 
        notification.id === id ? {...notification, read: true} : notification
      );
    }
    setNotifications(updatedNotifications);
  };

  const markAllAsRead = () => {
    const updatedNotifications = {...notifications};
    for (const tab in updatedNotifications) {
      updatedNotifications[tab] = updatedNotifications[tab].map(notification => ({
        ...notification,
        read: true
      }));
    }
    setNotifications(updatedNotifications);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Navigation Bar (simplified version) */}
     
      <div className="p-6 pt-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
       
          <button 
            onClick={markAllAsRead}
            className="text-[#076870] text-sm font-medium flex items-center mt-4 md:mt-0 hover:text-[#054b52]"
          >
            Mark all as read <FiCheckCircle className="ml-2" size={16} />
          </button>
        </div>

        {/* Tab Navigation (styled like ProfileSettings) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            {[
              { 
                id: 'all', 
                icon: <FiBell size={18} />,
                label: "All",
                badge: notifications['all'].filter(n => !n.read).length
              },
              { 
                id: 'bookings', 
                icon: <FiCalendar size={18} />,
                label: "Bookings" 
              },
              { 
                id: 'updates', 
                icon: <FiAlertTriangle size={18} />,
                label: "Updates" 
              },
              { 
                id: 'promotions', 
                icon: <FiTag size={18} />,
                label: "Promotions" 
              }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium transition-colors flex-shrink-0 ${
                  activeTab === tab.id 
                    ? 'text-[#076870] border-b-2 border-[#076870]' 
                    : 'text-gray-600 hover:text-[#076870] hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {tab.badge > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notification Cards */}
        <div className="space-y-4">
          {notifications[activeTab].length > 0 ? (
            notifications[activeTab].map((notification) => (
              <div 
                key={notification.id} 
                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden ${
                  !notification.read ? 'border-l-4 border-[#076870]' : ''
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start">
                    <div className={`p-3 rounded-xl ${notification.color} mr-4 flex-shrink-0`}>
                      {notification.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className={`font-bold ${
                          !notification.read ? 'text-gray-800' : 'text-gray-600'
                        }`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="flex justify-end mt-3">
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="text-[#076870] text-sm font-medium flex items-center hover:text-[#054b52]"
                      >
                        Mark as read <FiChevronRight className="ml-1" size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <FiBell className="mx-auto text-gray-300 mb-3" size={40} />
              <h3 className="text-lg font-medium text-gray-700 mb-1">No notifications</h3>
              <p className="text-gray-500">You're all caught up! No {activeTab} notifications at this time.</p>
            </div>
          )}
        </div>

        {/* View All Button */}
        {notifications[activeTab].length > 0 && (
          <div className="mt-6 text-center">
            <button className="text-[#076870] font-medium flex items-center justify-center mx-auto hover:text-[#054b52]">
              View all notifications <FiChevronRight className="ml-1" size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;