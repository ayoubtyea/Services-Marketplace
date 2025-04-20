import React, { useState } from 'react';
import {
  FiBell, FiCheck, FiX, FiAlertCircle,
  FiInfo, FiAlertTriangle, FiClock, FiMail
} from 'react-icons/fi';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'New booking request',
      message: 'Mohammed Amine requested a deep cleaning service for tomorrow.',
      time: '10 min ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'System update available',
      message: 'New dashboard version 2.3 is ready to install.',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Payment issue',
      message: 'Failed to process payment for booking #BK-0043',
      time: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'message',
      title: 'New customer message',
      message: 'Fatima Zahra sent a message about her upcoming appointment.',
      time: '5 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'alert',
      title: 'Tasker cancellation',
      message: 'CleanPro Team cancelled their assignment for booking #BK-0038',
      time: 'Yesterday',
      read: true
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'alert':
        return <FiAlertCircle className="text-red-500" />;
      case 'warning':
        return <FiAlertTriangle className="text-yellow-500" />;
      case 'info':
        return <FiInfo className="text-blue-500" />;
      case 'message':
        return <FiMail className="text-purple-500" />;
      default:
        return <FiBell className="text-gray-500" />;
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full relative hover:bg-gray-100 transition-colors"
      >
        <FiBell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <h3 className="font-semibold text-gray-800">Notifications</h3>
            <div className="flex space-x-2">
              <button 
                onClick={markAllAsRead}
                className="text-xs text-[#276e76] hover:text-[#1e565d]"
              >
                Mark all as read
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-4 pt-2 border-b border-gray-200 flex">
            <button
              className={`px-3 py-2 text-xs font-medium border-b-2 ${activeTab === 'all' ? 'border-[#276e76] text-[#276e76]' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button
              className={`px-3 py-2 text-xs font-medium border-b-2 ${activeTab === 'unread' ? 'border-[#276e76] text-[#276e76]' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('unread')}
            >
              Unread
            </button>
            <button
              className={`px-3 py-2 text-xs font-medium border-b-2 ${activeTab === 'alert' ? 'border-[#276e76] text-[#276e76]' : 'border-transparent text-gray-500'}`}
              onClick={() => setActiveTab('alert')}
            >
              Alerts
            </button>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`px-4 py-3 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-2">
                          <FiClock className="mr-1" size={12} />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {!notification.read && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="text-gray-400 hover:text-green-500"
                          title="Mark as read"
                        >
                          <FiCheck size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-500"
                        title="Delete"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center">
                <FiBell className="mx-auto h-8 w-8 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                <p className="mt-1 text-xs text-gray-500">
                  {activeTab === 'unread' 
                    ? 'You have no unread notifications' 
                    : 'No notifications match your filter'}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-center">
            <button className="text-xs text-[#276e76] hover:text-[#1e565d] font-medium">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;