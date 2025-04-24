import React, { useState } from 'react';
import {
  FiBell, FiCheck, FiX, FiClock, FiCalendar,
  FiDollarSign, FiGift, FiAlertCircle, FiMail,
  FiChevronDown, FiChevronUp, FiTrash2
} from 'react-icons/fi';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  // Sample notifications data
  const notifications = {
    all: [
      {
        id: 1,
        type: 'booking',
        title: 'New Booking Request',
        message: 'Sarah Johnson has requested a Deep Cleaning service for June 20, 2023 at 10:00 AM.',
        time: '10 min ago',
        read: false,
        details: 'Service: Deep Cleaning\nClient: Sarah Johnson\nDate: June 20, 2023\nTime: 10:00 AM\nLocation: 123 Main St, New York, NY'
      },
      {
        id: 2,
        type: 'payment',
        title: 'Payment Received',
        message: 'Payment of $120 for AC Maintenance has been successfully processed.',
        time: '2 hours ago',
        read: true,
        details: 'Service: AC Maintenance\nAmount: $120\nPayment Method: Credit Card\nTransaction ID: PAY-789456123'
      },
      {
        id: 3,
        type: 'update',
        title: 'Service Update',
        message: 'Your scheduled Plumbing Inspection for June 24 has been confirmed by the technician.',
        time: '1 day ago',
        read: true,
        details: 'Service: Plumbing Inspection\nStatus: Confirmed\nTechnician: John Smith\nContact: +1 (555) 123-4567'
      },
      {
        id: 4,
        type: 'promotion',
        title: 'Special Offer',
        message: 'Get 20% off on all electrical services this month. Limited time offer!',
        time: '3 days ago',
        read: false,
        details: 'Promotion: 20% Off Electrical Services\nValid Until: June 30, 2023\nCode: ELEC20\nTerms & Conditions Apply'
      }
    ],
    bookings: [
      {
        id: 1,
        type: 'booking',
        title: 'New Booking Request',
        message: 'Sarah Johnson has requested a Deep Cleaning service for June 20, 2023 at 10:00 AM.',
        time: '10 min ago',
        read: false,
        details: 'Service: Deep Cleaning\nClient: Sarah Johnson\nDate: June 20, 2023\nTime: 10:00 AM\nLocation: 123 Main St, New York, NY'
      },
      {
        id: 5,
        type: 'booking',
        title: 'Booking Confirmed',
        message: 'Your booking for Window Cleaning on June 23 has been confirmed by the client.',
        time: '5 hours ago',
        read: true,
        details: 'Service: Window Cleaning\nClient: Robert Downey\nDate: June 23, 2023\nTime: 11:00 AM\nLocation: 654 Maple Ave, Hoboken, NJ'
      }
    ],
    payments: [
      {
        id: 2,
        type: 'payment',
        title: 'Payment Received',
        message: 'Payment of $120 for AC Maintenance has been successfully processed.',
        time: '2 hours ago',
        read: true,
        details: 'Service: AC Maintenance\nAmount: $120\nPayment Method: Credit Card\nTransaction ID: PAY-789456123'
      },
      {
        id: 6,
        type: 'payment',
        title: 'Payment Pending',
        message: 'Payment of $85 for Carpet Cleaning is pending. Remind the client to complete the payment.',
        time: '2 days ago',
        read: false,
        details: 'Service: Carpet Cleaning\nAmount: $85\nDue Date: June 22, 2023\nPayment Method: Bank Transfer'
      }
    ],
    updates: [
      {
        id: 3,
        type: 'update',
        title: 'Service Update',
        message: 'Your scheduled Plumbing Inspection for June 24 has been confirmed by the technician.',
        time: '1 day ago',
        read: true,
        details: 'Service: Plumbing Inspection\nStatus: Confirmed\nTechnician: John Smith\nContact: +1 (555) 123-4567'
      },
      {
        id: 7,
        type: 'update',
        title: 'Schedule Change',
        message: 'The Electrical Wiring service has been rescheduled to June 26 at 2:00 PM.',
        time: '3 days ago',
        read: true,
        details: 'Service: Electrical Wiring\nNew Date: June 26, 2023\nNew Time: 2:00 PM\nReason: Technician availability'
      }
    ],
    promotions: [
      {
        id: 4,
        type: 'promotion',
        title: 'Special Offer',
        message: 'Get 20% off on all electrical services this month. Limited time offer!',
        time: '3 days ago',
        read: false,
        details: 'Promotion: 20% Off Electrical Services\nValid Until: June 30, 2023\nCode: ELEC20\nTerms & Conditions Apply'
      },
      {
        id: 8,
        type: 'promotion',
        title: 'Referral Bonus',
        message: 'Earn $25 for every friend you refer who books a service with us.',
        time: '1 week ago',
        read: true,
        details: 'Referral Program Details\nBonus: $25 per referral\nMinimum Service: $100\nNo Limit on Referrals'
      }
    ]
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'booking':
        return <FiCalendar className="text-blue-500 text-xl" />;
      case 'payment':
        return <FiDollarSign className="text-green-500 text-xl" />;
      case 'update':
        return <FiAlertCircle className="text-purple-500 text-xl" />;
      case 'promotion':
        return <FiGift className="text-orange-500 text-xl" />;
      default:
        return <FiBell className="text-gray-500 text-xl" />;
    }
  };

  const markAsRead = (id) => {
    // In a real app, you would update the state or make an API call here
    console.log(`Marked notification ${id} as read`);
  };

  const deleteNotification = (id) => {
    // In a real app, you would update the state or make an API call here
    console.log(`Deleted notification ${id}`);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
          Mark all as read
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide border-b border-gray-200">
        <button
          className={`py-3 px-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('all')}
        >
          <FiBell className="mr-2" />
          All Notifications
          {notifications.all.filter(n => !n.read).length > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {notifications.all.filter(n => !n.read).length}
            </span>
          )}
        </button>
        <button
          className={`py-3 px-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors ${activeTab === 'bookings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('bookings')}
        >
          <FiCalendar className="mr-2" />
          Bookings
          {notifications.bookings.filter(n => !n.read).length > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {notifications.bookings.filter(n => !n.read).length}
            </span>
          )}
        </button>
        <button
          className={`py-3 px-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors ${activeTab === 'payments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('payments')}
        >
          <FiDollarSign className="mr-2" />
          Payments
          {notifications.payments.filter(n => !n.read).length > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {notifications.payments.filter(n => !n.read).length}
            </span>
          )}
        </button>
        <button
          className={`py-3 px-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors ${activeTab === 'updates' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('updates')}
        >
          <FiAlertCircle className="mr-2" />
          Updates
          {notifications.updates.filter(n => !n.read).length > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {notifications.updates.filter(n => !n.read).length}
            </span>
          )}
        </button>
        <button
          className={`py-3 px-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors ${activeTab === 'promotions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('promotions')}
        >
          <FiGift className="mr-2" />
          Promotions
          {notifications.promotions.filter(n => !n.read).length > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {notifications.promotions.filter(n => !n.read).length}
            </span>
          )}
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {notifications[activeTab].length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {notifications[activeTab].map(notification => (
              <li 
                key={notification.id} 
                className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    
                    {/* Expanded Details */}
                    {expandedId === notification.id && (
                      <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap">{notification.details}</pre>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-3 flex items-center space-x-4">
                      <button 
                        onClick={() => toggleExpand(notification.id)}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center transition-colors"
                      >
                        {expandedId === notification.id ? (
                          <>
                            <FiChevronUp className="mr-1" /> Hide Details
                          </>
                        ) : (
                          <>
                            <FiChevronDown className="mr-1" /> View Details
                          </>
                        )}
                      </button>
                      {!notification.read && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="text-green-600 hover:text-green-800 text-xs font-medium flex items-center transition-colors"
                        >
                          <FiCheck className="mr-1" /> Mark as Read
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-800 text-xs font-medium flex items-center transition-colors"
                      >
                        <FiTrash2 className="mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center">
            <FiBell className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No Notifications</h3>
            <p className="text-gray-500">You don't have any {activeTab} notifications at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;