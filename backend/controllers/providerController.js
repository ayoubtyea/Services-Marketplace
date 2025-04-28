// controllers/providerController.js
const Provider = require('../models/Provider'); // Keep only one import
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const Notification = require('../models/Notification');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.registerProvider = async (req, res) => {
  try {
    // Check if provider already exists with this email
    const existingProvider = await Provider.findOne({ email: req.body.email });
    if (existingProvider) {
      return res.status(400).json({
        success: false,
        message: 'A provider with this email already exists'
      });
    }

    // Check if all required files are uploaded
    if (!req.files.idPhoto || !req.files.selfiePhoto || !req.files.profilePhoto) {
      return res.status(400).json({
        success: false,
        message: 'Please upload all required photos (ID, Selfie, and Profile Photo)'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new provider
    const newProvider = new Provider({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      dob: req.body.dob,
      address: req.body.address,
      city: req.body.city,
      zip: req.body.zip,
      idPhoto: req.files.idPhoto[0].filename,
      selfiePhoto: req.files.selfiePhoto[0].filename,
      profilePhoto: req.files.profilePhoto[0].filename,
      services: JSON.parse(req.body.services),
      otherSkills: req.body.otherSkills,
      experience: req.body.experience,
      availability: req.body.availability,
      serviceAreas: JSON.parse(req.body.serviceAreas),
      bio: req.body.bio,
      terms: req.body.terms === 'true',
      communications: req.body.communications === 'true',
      backgroundCheck: req.body.backgroundCheck === 'true',
      status: 'pending' // Default status
    });

    // Save provider to database
    const savedProvider = await newProvider.save();

    // Create and sign JWT token
    const token = jwt.sign(
      { id: savedProvider._id, role: 'provider' },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Return success response with token and provider data
    res.status(201).json({
      success: true,
      token,
      provider: {
        id: savedProvider._id,
        firstName: savedProvider.firstName,
        lastName: savedProvider.lastName,
        email: savedProvider.email,
        profilePhoto: savedProvider.profilePhoto,
        status: savedProvider.status
      },
      message: 'Provider registration successful'
    });
  } catch (error) {
    console.error('Provider registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
};



// Main provider dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const providerId = req.user.id;
    
    const provider = await Provider.findById(providerId)
      .select('-password -__v');
    
    if (!provider) {
      return res.status(404).json({ 
        success: false, 
        message: 'Provider not found' 
      });
    }

    res.json({
      success: true,
      provider
    });
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const providerId = req.user.id;

    // Get counts (handle case where collections might be empty)
    const pendingBookings = await Booking.countDocuments({ 
      providerId, 
      status: 'pending' 
    }).catch(() => 0);
    
    const upcomingBookings = await Booking.countDocuments({ 
      providerId, 
      status: 'confirmed',
      date: { $gte: new Date() }
    }).catch(() => 0);
    
    // You can implement message count when you have a messages system
    const unreadMessages = 0;
    
    const newReviews = await Review.countDocuments({ 
      providerId, 
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
    }).catch(() => 0);

    res.json({
      success: true,
      stats: {
        pendingBookings,
        upcomingBookings,
        unreadMessages,
        newReviews
      }
    });
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Upcoming bookings
exports.getUpcomingBookings = async (req, res) => {
  try {
    const providerId = req.user.id;
    
    const upcomingJobs = await Booking.find({ 
      providerId, 
      status: 'confirmed',
      date: { $gte: new Date() }
    })
    .sort({ date: 1 })
    .limit(5)
    .populate('clientId', 'firstName lastName email phone profilePhoto')
    .catch(() => []);

    res.json({
      success: true,
      upcomingJobs
    });
  } catch (error) {
    console.error('Error getting upcoming jobs:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Provider reviews
exports.getProviderReviews = async (req, res) => {
  try {
    const providerId = req.user.id;
    
    // Get provider rating
    const provider = await Provider.findById(providerId).select('rating totalReviews');
    
    if (!provider) {
      return res.status(404).json({ 
        success: false, 
        message: 'Provider not found' 
      });
    }
    
    // Get recent reviews
    const recentReviews = await Review.find({ providerId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('clientId', 'firstName lastName profilePhoto')
      .catch(() => []);

    res.json({
      success: true,
      rating: provider.rating || 0,
      totalReviews: provider.totalReviews || 0,
      recentReviews
    });
  } catch (error) {
    console.error('Error getting provider reviews:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Add existing controller methods
exports.getBookings = async (req, res) => {
  // Your existing getBookings method...
};

exports.updateBookingStatus = async (req, res) => {
  // Your existing updateBookingStatus method...
};

exports.getServices = async (req, res) => {
  // Your existing getServices method...
};

exports.addService = async (req, res) => {
  // Your existing addService method...
};

exports.updateService = async (req, res) => {
  // Your existing updateService method...
};

exports.deleteService = async (req, res) => {
  // Your existing deleteService method...
};

exports.getNotifications = async (req, res) => {
  // Your existing getNotifications method...
};

exports.markNotificationsAsRead = async (req, res) => {
  // Your existing markNotificationsAsRead method...
};

exports.getEarnings = async (req, res) => {
  // Your existing getEarnings method...
};

exports.updateProfile = async (req, res) => {
  // Your existing updateProfile method...
};