import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NotificationManagement = () => {
  const [viewedNotification, setViewedNotification] = useState(null);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  const notifications = [
    { id: 'NT-001', subject: 'Booking Confirmation', content: 'Your booking #BK-001 has been confirmed.' },
    { id: 'NT-002', subject: 'Service Reminder', content: 'Reminder: Your service is tomorrow.' },
    { id: 'NT-003', subject: 'New Review Received', content: 'You received a new 5-star review!' },
  ];

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('notifications') && !hasAutoOpened) {
      setViewedNotification(notifications[0]); // Auto-open first notification
      setHasAutoOpened(true);
    }
  }, [location, hasAutoOpened]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4 ${viewedNotification?.id === notification.id ? 'bg-blue-50' : ''}`}
            onClick={() => setViewedNotification(notification)}
          >
            <h3 className="text-lg font-semibold text-gray-800">{notification.subject}</h3>
            <p className="text-sm text-gray-500">{notification.content}</p>
          </div>
        ))}
      </div>

      {viewedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">{viewedNotification.subject}</h2>
              <p className="text-sm text-gray-500">ID: {viewedNotification.id}</p>
              <p className="mt-4">{viewedNotification.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationManagement;
