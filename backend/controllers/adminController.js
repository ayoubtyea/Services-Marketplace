const User = require('../models/User');
const Provider = require('../models/Provider');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Notification = require('../models/Notification');
const bcrypt = require('bcrypt');
const { createAuthResponse } = require('./auth');

// Get all providers
exports.getAllProviders = async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }
    
    const providers = await Provider.find(query)
      .select('-password -__v')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: providers.length,
      data: providers
    });
  } catch (error) {
    console.error('Error getting providers:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get providers'
    });
  }
};

// Get provider details
exports.getProviderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    
    const provider = await Provider.findById(id)
      .select('-password -__v');
    
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: provider
    });
  } catch (error) {
    console.error('Error getting provider details:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get provider details'
    });
  }
};

// Approve or reject provider
exports.updateProviderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be "approved" or "rejected"'
      });
    }
    
    // Find provider
    const provider = await Provider.findById(id);
    
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: 'Provider not found'
      });
    }
    
    // Update provider status
    provider.status = status;
    await provider.save();
    
    // Create notification for provider
    await Notification.create({
      user: provider._id,
      type: 'update',
      title: `Your application has been ${status}`,
      message: status === 'approved' 
        ? 'Congratulations! Your provider application has been approved. You can now start offering your services.'
        : `Your provider application has been rejected. Reason: ${reason || 'Not specified'}`,
      details: {
        status,
        reason: reason || ''
      }
    });
    
    res.status(200).json({
      success: true,
      message: `Provider ${status} successfully`,
      data: {
        id: provider._id,
        status: provider.status,
        firstName: provider.firstName,
        lastName: provider.lastName,
        email: provider.email
      }
    });
  } catch (error) {
    console.error('Error updating provider status:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update provider status'
    });
  }
};

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' })
      .select('-password -__v')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients
    });
  } catch (error) {
    console.error('Error getting clients:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get clients'
    });
  }
};

// Get all bookings for admin
exports.getAllBookings = async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }
    
    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .populate('customerId', 'fullName email phoneNumber')
      .populate('providerId', 'firstName lastName email phone')
      .populate('serviceId', 'title price');
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Error getting bookings:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get bookings'
    });
  }
};

// Admin SignUp
exports.adminSignup = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: 'Email already in use'
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await Admin.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role: 'admin',
      isVerified: true, // Admins are typically verified by default
    });

    res.status(201).json(createAuthResponse(admin, 'admin'));

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Admin registration failed'
    });
  }
};