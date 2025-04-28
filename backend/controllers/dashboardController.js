const User = require('../models/User');
const Provider = require('../models/Provider');
const Admin = require('../models/Admin');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Review = require('../models/Review');
const Notification = require('../models/Notification');
const mongoose = require('mongoose');

// Dashboard controller to handle dashboard data requests for all user types
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let dashboardData = {};

    switch (userRole) {
      case 'client':
        dashboardData = await getClientDashboardData(userId);
        break;
      case 'provider':
        dashboardData = await getProviderDashboardData(userId);
        break;
      case 'admin':
        dashboardData = await getAdminDashboardData();
        break;
      default:
        return res.status(403).json({
          success: false,
          message: 'Invalid user role'
        });
    }

    res.status(200).json({
      success: true,
      data: dashboardData
    });

  } catch (error) {
    console.error(`Error fetching dashboard data: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Helper function to get client dashboard data
const getClientDashboardData = async (clientId) => {
  const client = await User.findById(clientId).select('-password');
  
  if (!client) {
    throw new Error('Client not found');
  }

  // Get bookings data
  const bookings = await Booking.find({ customerId: clientId })
    .sort({ date: -1 })
    .populate('serviceId', 'title price')
    .populate('providerId', 'firstName lastName email profilePhoto');

  // Get recent bookings
  const recentBookings = bookings.slice(0, 3);

  // Group bookings by status
  const bookingsByStatus = {
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length
  };

  // Get unread notifications
  const unreadNotifications = await Notification.countDocuments({ 
    user: clientId, 
    read: false 
  });

  return {
    profile: client,
    bookings: {
      total: bookings.length,
      byStatus: bookingsByStatus,
      recent: recentBookings
    },
    notifications: {
      unread: unreadNotifications
    }
  };
};

// Helper function to get provider dashboard data
const getProviderDashboardData = async (providerId) => {
  const provider = await Provider.findById(providerId).select('-password');
  
  if (!provider) {
    throw new Error('Provider not found');
  }

  // Get bookings stats
  const pendingBookings = await Booking.countDocuments({ 
    providerId: providerId, 
    status: 'pending' 
  });
  
  const upcomingBookings = await Booking.countDocuments({ 
    providerId: providerId, 
    status: 'confirmed' 
  });
  
  const completedBookings = await Booking.countDocuments({ 
    providerId: providerId, 
    status: 'completed' 
  });

  // Get upcoming bookings
  const upcomingJobs = await Booking.find({ 
    providerId: providerId, 
    status: 'confirmed',
    date: { $gte: new Date() }
  })
  .sort({ date: 1 })
  .limit(3)
  .populate('customerId', 'fullName email phoneNumber');

  // Get recent reviews
  const recentReviews = await Review.find({ providerId: providerId })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate('clientId', 'fullName');

  // Get earnings data
  const earnings = await Booking.aggregate([
    {
      $match: {
        providerId: mongoose.Types.ObjectId(providerId),
        status: 'completed'
      }
    },
    {
      $group: {
        _id: null,
        totalEarnings: { $sum: '$price' },
        count: { $sum: 1 }
      }
    }
  ]);

  const earningsData = earnings.length > 0 ? earnings[0] : { totalEarnings: 0, count: 0 };

  // Get unread notifications
  const unreadNotifications = await Notification.countDocuments({ 
    user: providerId, 
    read: false 
  });

  return {
    profile: provider,
    stats: {
      pendingBookings,
      upcomingBookings,
      completedBookings,
      totalEarnings: earningsData.totalEarnings,
      unreadNotifications
    },
    upcomingJobs,
    recentReviews,
    earnings: earningsData
  };
};

// Helper function to get admin dashboard data
const getAdminDashboardData = async () => {
  // Get counts of different user types
  const totalClients = await User.countDocuments({ role: 'client' });
  const totalProviders = await Provider.countDocuments();
  const pendingProviders = await Provider.countDocuments({ status: 'pending' });
  const approvedProviders = await Provider.countDocuments({ status: 'approved' });
  
  // Get counts of bookings by status
  const pendingBookings = await Booking.countDocuments({ status: 'pending' });
  const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
  const completedBookings = await Booking.countDocuments({ status: 'completed' });
  
  // Get total earnings
  const earnings = await Booking.aggregate([
    {
      $match: { status: 'completed' }
    },
    {
      $group: {
        _id: null,
        totalEarnings: { $sum: '$price' },
        count: { $sum: 1 }
      }
    }
  ]);
  
  const earningsData = earnings.length > 0 ? earnings[0] : { totalEarnings: 0, count: 0 };
  
  // Get recent bookings
  const recentBookings = await Booking.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('customerId', 'fullName email')
    .populate('providerId', 'firstName lastName email')
    .populate('serviceId', 'title price');
  
  // Get recent providers that need approval
  const providersNeedingApproval = await Provider.find({ status: 'pending' })
    .sort({ createdAt: -1 })
    .limit(5)
    .select('firstName lastName email createdAt');

  return {
    userStats: {
      totalClients,
      totalProviders,
      pendingProviders,
      approvedProviders
    },
    bookingStats: {
      pendingBookings,
      confirmedBookings,
      completedBookings,
      totalBookings: pendingBookings + confirmedBookings + completedBookings
    },
    earnings: earningsData,
    recentBookings,
    providersNeedingApproval
  };
};