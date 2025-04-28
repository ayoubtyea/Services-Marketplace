const Provider = require('../models/Provider');
const Notification = require('../models/Notification');
const Review = require('../models/Review');
const Booking = require('../models/Booking'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

exports.registerProvider = async (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.files || !req.files.idPhoto || !req.files.selfiePhoto || !req.files.profilePhoto) {
      return res.status(400).json({ success: false, message: 'All required photos must be uploaded' });
    }

    const { 
      firstName, lastName, email, phone, dob,
      address, city, zip, services, otherSkills,
      experience, availability, serviceAreas, bio,
      terms, communications, backgroundCheck,
      password
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !dob || !address || 
        !city || !zip || !services || !experience || !availability || 
        !serviceAreas || !bio || terms === undefined || !password) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    // Check if provider already exists
    const existingProvider = await Provider.findOne({ email });
    if (existingProvider) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Parse JSON strings safely
    let parsedServices;
    let parsedServiceAreas;

    try {
      parsedServices = typeof services === 'string' ? JSON.parse(services) : services;
      parsedServiceAreas = typeof serviceAreas === 'string' ? JSON.parse(serviceAreas) : serviceAreas;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid format for services or serviceAreas',
        error: error.message
      });
    }

    // Create new provider with proper paths to uploaded files
    const provider = new Provider({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      dob: new Date(dob),
      address,
      city,
      zip,
      idPhoto: req.files.idPhoto[0].path,
      selfiePhoto: req.files.selfiePhoto[0].path,
      profilePhoto: req.files.profilePhoto[0].path,
      services: parsedServices,
      otherSkills,
      experience,
      availability,
      serviceAreas: parsedServiceAreas,
      bio,
      terms: terms === 'true' || terms === true,
      communications: communications === 'true' || communications === true,
      backgroundCheck: backgroundCheck === 'true' || backgroundCheck === true,
      status: 'pending'
    });

    // Save provider
    await provider.save();

    // Create JWT token
    const token = jwt.sign(
      { id: provider._id, email: provider.email, role: 'provider', status: provider.status },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      provider: {
        id: provider._id,
        email: provider.email,
        firstName: provider.firstName,
        lastName: provider.lastName,
        status: provider.status,
        profilePhoto: provider.profilePhoto
      }
    });

  } catch (error) {
    console.error('Provider registration error:', error);
    
    // Clean up uploaded files if error occurred
    if (req.files) {
      Object.values(req.files).forEach(fileArray => {
        fileArray.forEach(file => {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        });
      });
    }

    res.status(500).json({ 
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get provider dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const providerId = req.user.id;
    
    const provider = await Provider.findById(providerId)
      .select('-password -__v');
    
    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }

    // Check if provider is pending
    const isPending = provider.status === 'pending';
    
    // Default stats for pending providers
    let stats = {
      pendingBookings: 0,
      upcomingBookings: 0,
      unreadMessages: 0,
      newReviews: 0
    };
    
    let upcomingJobs = [];
    let recentReviews = [];

    // Only fetch actual data if provider is approved
    if (!isPending) {
      // Get stats
      stats.pendingBookings = await Booking.countDocuments({ 
        providerId: providerId, 
        status: 'pending' 
      });
      
      stats.upcomingBookings = await Booking.countDocuments({ 
        providerId: providerId, 
        status: 'confirmed' 
      });
      
      stats.newReviews = await Review.countDocuments({ 
        providerId: providerId, 
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
      });

      // Get upcoming bookings
      upcomingJobs = await Booking.find({ 
        providerId: providerId, 
        status: 'confirmed',
        date: { $gte: new Date() }
      })
      .sort({ date: 1 })
      .limit(3)
      .populate('clientId', 'firstName lastName email phone profilePhoto');

      // Get recent reviews
      recentReviews = await Review.find({ providerId: providerId })
        .sort({ createdAt: -1 })
        .limit(3)
        .populate('clientId', 'firstName lastName profilePhoto');
    }

    res.json({
      success: true,
      provider,
      isPending, // Add this flag to indicate pending status
      pendingMessage: isPending ? 
        "Your account is pending approval. You'll be notified once approved." : null,
      stats,
      upcomingJobs,
      feedback: {
        rating: provider.rating || 0,
        totalReviews: provider.totalReviews || 0,
        recentReviews
      }
    });
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get provider bookings
exports.getBookings = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { status } = req.query;
    
    // Check if provider is pending
    const provider = await Provider.findById(providerId).select('status');
    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }
    
    if (provider.status === 'pending') {
      return res.json({
        success: true,
        isPending: true,
        message: "Your account is pending approval. You'll be able to view bookings once approved.",
        bookings: []
      });
    }
    
    let query = { providerId: providerId };
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .sort({ date: status === 'completed' ? -1 : 1 })
      .populate('clientId', 'firstName lastName email phone profilePhoto');

    res.json({
      success: true,
      isPending: false,
      bookings
    });
  } catch (error) {
    console.error('Error getting bookings:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const providerId = req.user.id;

    // Check if provider is pending
    const provider = await Provider.findById(providerId).select('status');
    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }
    
    if (provider.status === 'pending') {
      return res.status(403).json({
        success: false,
        message: "Your account is pending approval. You cannot update bookings yet."
      });
    }

    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, providerId: providerId },
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Create notification for client
    await Notification.create({
      user: booking.clientId,
      type: 'booking',
      title: 'Booking Status Updated',
      message: `Your booking has been ${status}`,
      details: {
        bookingId: booking._id,
        status
      }
    });

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get provider services
exports.getServices = async (req, res) => {
  try {
    const providerId = req.user.id;
    
    // Check if provider is pending
    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }
    
    res.json({
      success: true,
      isPending: provider.status === 'pending',
      services: provider.services || []
    });
  } catch (error) {
    console.error('Error getting services:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get provider notifications
exports.getNotifications = async (req, res) => {
  try {
    const providerId = req.user.id;
    
    // Always allow providers to get notifications, even if pending
    const notifications = await Notification.find({ 
      user: providerId 
    })
    .sort({ createdAt: -1 })
    .limit(10);
    
    res.json({
      success: true,
      notifications
    });
  } catch (error) {
    console.error('Error getting notifications:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Mark notifications as read
exports.markNotificationsAsRead = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { notificationIds } = req.body;
    
    // Always allow providers to mark notifications as read, even if pending
    await Notification.updateMany(
      { _id: { $in: notificationIds }, user: providerId },
      { read: true }
    );
    
    res.json({
      success: true,
      message: 'Notifications marked as read'
    });
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get provider profile
exports.getProfile = async (req, res) => {
  try {
    const providerId = req.user.id;
    
    const provider = await Provider.findById(providerId)
      .select('-password -__v');
    
    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }
    
    res.json({
      success: true,
      provider
    });
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update provider profile
exports.updateProfile = async (req, res) => {
  try {
    const providerId = req.user.id;
    const updateData = req.body;
    
    // Don't allow updating status
    delete updateData.status;
    
    // Handle file uploads if present
    if (req.files) {
      if (req.files.profilePhoto) {
        updateData.profilePhoto = req.files.profilePhoto[0].path;
      }
    }
    
    const provider = await Provider.findByIdAndUpdate(
      providerId,
      updateData,
      { new: true }
    ).select('-password -__v');
    
    if (!provider) {
      return res.status(404).json({ success: false, message: 'Provider not found' });
    }
    
    res.json({
      success: true,
      provider
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};