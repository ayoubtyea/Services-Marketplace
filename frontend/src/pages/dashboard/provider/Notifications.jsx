import React, { useState } from 'react';
import {
  FiBell, FiCheck, FiX, FiCalendar, FiDollarSign,
  FiGift, FiAlertCircle, FiChevronDown, FiChevronUp,
  FiTrash2, FiMail, FiClock, FiUser, FiMapPin
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
        details: {
          service: 'Deep Cleaning',
          client: 'Sarah Johnson',
          date: 'June 20, 2023',
          time: '10:00 AM',
          address: '123 Main St, New York, NY'
        },
        actions: ['accept', 'reject']
      },
      {
        id: 2,
        type: 'payment',
        title: 'Payment Received',
        message: 'Payment of $120 for AC Maintenance has been successfully processed.',
        time: '2 hours ago',
        read: true,
        details: {
          amount: '$120',
          service: 'AC Maintenance',
          method: 'Credit Card',
          transaction: 'PAY-789456123'
        },
        actions: ['view', 'receipt']
      },
      {
        id: 3,
        type: 'update',
        title: 'Service Update',
        message: 'Your scheduled Plumbing Inspection for June 24 has been confirmed by the technician.',
        time: '1 day ago',
        read: true,
        details: {
          service: 'Plumbing Inspection',
          status: 'Confirmed',
          technician: 'John Smith',
          contact: '+1 (555) 123-4567'
        },
        actions: ['reschedule', 'contact']
      },
      {
        id: 4,
        type: 'promotion',
        title: 'Special Offer',
        message: 'Get 20% off on all electrical services this month. Limited time offer!',
        time: '3 days ago',
        read: false,
        details: {
          offer: '20% Off Electrical Services',
          valid: 'Until June 30, 2023',
          code: 'ELEC20'
        },
        actions: ['apply', 'share']
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
        details: {
          service: 'Deep Cleaning',
          client: 'Sarah Johnson',
          date: 'June 20, 2023',
          time: '10:00 AM',
          address: '123 Main St, New York, NY'
        },
        actions: ['accept', 'reject']
      },
      {
        id: 5,
        type: 'booking',
        title: 'Booking Confirmed',
        message: 'Your booking for Window Cleaning on June 23 has been confirmed by the client.',
        time: '5 hours ago',
        read: true,
        details: {
          service: 'Window Cleaning',
          client: 'Robert Downey',
          date: 'June 23, 2023',
          time: '11:00 AM',
          address: '654 Maple Ave, Hoboken, NJ'
        },
        actions: ['reschedule', 'contact']
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
        details: {
          amount: '$120',
          service: 'AC Maintenance',
          method: 'Credit Card',
          transaction: 'PAY-789456123'
        },
        actions: ['view', 'receipt']
      },
      {
        id: 6,
        type: 'payment',
        title: 'Payment Pending',
        message: 'Payment of $85 for Carpet Cleaning is pending. Remind the client to complete the payment.',
        time: '2 days ago',
        read: false,
        details: {
          amount: '$85',
          service: 'Carpet Cleaning',
          due: 'June 22, 2023',
          method: 'Bank Transfer'
        },
        actions: ['remind', 'cancel']
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
        details: {
          service: 'Plumbing Inspection',
          status: 'Confirmed',
          technician: 'John Smith',
          contact: '+1 (555) 123-4567'
        },
        actions: ['reschedule', 'contact']
      },
      {
        id: 7,
        type: 'update',
        title: 'Schedule Change',
        message: 'The Electrical Wiring service has been rescheduled to June 26 at 2:00 PM.',
        time: '3 days ago',
        read: true,
        details: {
          service: 'Electrical Wiring',
          newDate: 'June 26, 2023',
          newTime: '2:00 PM',
          reason: 'Technician availability'
        },
        actions: ['confirm', 'contact']
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
        details: {
          offer: '20% Off Electrical Services',
          valid: 'Until June 30, 2023',
          code: 'ELEC20'
        },
        actions: ['apply', 'share']
      },
      {
        id: 8,
        type: 'promotion',
        title: 'Referral Bonus',
        message: 'Earn $25 for every friend you refer who books a service with us.',
        time: '1 week ago',
        read: true,
        details: {
          bonus: '$25 per referral',
          minimum: '$100 service',
          limit: 'No limit on referrals'
        },
        actions: ['refer', 'share']
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

  const getActionButton = (action) => {
    switch(action) {
      case 'accept':
        return { text: 'Accept', icon: <FiCheck />, color: 'bg-[#076870] hover:bg-[#065a60]' };
      case 'reject':
        return { text: 'Reject', icon: <FiX />, color: 'bg-red-600 hover:bg-red-700' };
      case 'view':
        return { text: 'View', icon: <FiCalendar />, color: 'bg-[#076870] hover:bg-[#065a60]' };
      case 'receipt':
        return { text: 'Receipt', icon: <FiDollarSign />, color: 'bg-gray-600 hover:bg-gray-700' };
      case 'reschedule':
        return { text: 'Reschedule', icon: <FiClock />, color: 'bg-[#076870] hover:bg-[#065a60]' };
      case 'contact':
        return { text: 'Contact', icon: <FiMail />, color: 'bg-gray-600 hover:bg-gray-700' };
      case 'apply':
        return { text: 'Apply', icon: <FiCheck />, color: 'bg-[#076870] hover:bg-[#065a60]' };
      case 'share':
        return { text: 'Share', icon: <FiUser />, color: 'bg-gray-600 hover:bg-gray-700' };
      case 'remind':
        return { text: 'Remind', icon: <FiMail />, color: 'bg-[#076870] hover:bg-[#065a60]' };
      case 'cancel':
        return { text: 'Cancel', icon: <FiX />, color: 'bg-red-600 hover:bg-red-700' };
      case 'confirm':
        return { text: 'Confirm', icon: <FiCheck />, color: 'bg-[#076870] hover:bg-[#065a60]' };
      case 'refer':
        return { text: 'Refer', icon: <FiUser />, color: 'bg-[#076870] hover:bg-[#065a60]' };
      default:
        return { text: 'View', icon: <FiChevronDown />, color: 'bg-[#076870] hover:bg-[#065a60]' };
    }
  };

  const handleAction = (notificationId, action) => {
    console.log(`Action ${action} on notification ${notificationId}`);
    // In a real app, this would trigger the appropriate action
  };

  const markAsRead = (id) => {
    console.log(`Marked notification ${id} as read`);
  };

  const deleteNotification = (id) => {
    console.log(`Deleted notification ${id}`);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <button className="text-sm font-medium text-[#076870] hover:text-[#065a60] transition-colors">
          Mark all as read
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide border-b border-gray-200">
        {['all', 'bookings', 'payments', 'updates', 'promotions'].map((tab) => (
          <button
            key={tab}
            className={`py-3 px-4 font-medium text-sm flex items-center whitespace-nowrap transition-colors ${
              activeTab === tab 
                ? 'text-[#076870] border-b-2 border-[#076870]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'all' && <FiBell className="mr-2" />}
            {tab === 'bookings' && <FiCalendar className="mr-2" />}
            {tab === 'payments' && <FiDollarSign className="mr-2" />}
            {tab === 'updates' && <FiAlertCircle className="mr-2" />}
            {tab === 'promotions' && <FiGift className="mr-2" />}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {notifications[tab].filter(n => !n.read).length > 0 && (
              <span className="ml-2 bg-[#076870] text-white text-xs font-medium px-2 py-0.5 rounded-full">
                {notifications[tab].filter(n => !n.read).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {notifications[activeTab].length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {notifications[activeTab].map(notification => (
              <li 
                key={notification.id} 
                className={`p-5 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${
                    !notification.read ? 'bg-[#076870] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className={`text-base font-medium ${
                        !notification.read ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    
                    {/* Expanded Details */}
                    {expandedId === notification.id && (
                      <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                        {Object.entries(notification.details).map(([key, value]) => (
                          <div key={key} className="flex text-sm mb-1 last:mb-0">
                            <span className="font-medium text-gray-700 w-32 capitalize">{key}:</span>
                            <span className="text-gray-600">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-4 flex items-center space-x-3">
                      {notification.actions.map((action, index) => {
                        const btn = getActionButton(action);
                        return (
                          <button
                            key={index}
                            onClick={() => handleAction(notification.id, action)}
                            className={`${btn.color} text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center transition-colors`}
                          >
                            {btn.icon && <span className="mr-1.5">{btn.icon}</span>}
                            {btn.text}
                          </button>
                        );
                      })}
                      
                      <div className="flex-1 flex justify-end space-x-2">
                        <button 
                          onClick={() => toggleExpand(notification.id)}
                          className="text-[#076870] hover:text-[#065a60] text-xs font-medium flex items-center transition-colors"
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
                        <button 
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-500 hover:text-gray-700 text-xs font-medium flex items-center transition-colors"
                        >
                          <FiTrash2 className="mr-1" /> Delete
                        </button>
                      </div>
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