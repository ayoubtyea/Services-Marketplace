const Provider = require('../models/Provider');
const Notification = require('../models/Notification');
const Review = require('../models/Review');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

exports.registerProvider = async (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.files || !req.files.idPhoto || !req.files.selfiePhoto || !req.files.profilePhoto) {
      return res.status(400).json({ error: 'All required photos must be uploaded' });
    }

    const { 
      firstName, lastName, email, phone, dob,
      address, city, zip, services, otherSkills,
      experience, availability, serviceAreas, bio,
      terms, communications, backgroundCheck
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !dob || !address || 
        !city || !zip || !services || !experience || !availability || 
        !serviceAreas || !bio || terms === undefined) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    // Check if provider already exists
    const existingProvider = await Provider.findOne({ email });
    if (existingProvider) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new provider
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
      services: JSON.parse(services),
      otherSkills,
      experience,
      availability,
      serviceAreas: JSON.parse(serviceAreas),
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
      { id: provider._id, role: 'provider', status: provider.status },
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
      error: 'Server error during registration',
      message: error.message 
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
      return res.status(404).json({ message: 'Provider not found' });
    }

    // Get stats
    const pendingBookings = await Booking.countDocuments({ 
      providerId, 
      status: 'pending' 
    });
    const upcomingBookings = await Booking.countDocuments({ 
      providerId, 
      status: 'confirmed' 
    });
    const unreadMessages = 0; // Would come from a messaging system
    const newReviews = await Review.countDocuments({ 
      providerId, 
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
    });

    // Get upcoming bookings
    const upcomingJobs = await Booking.find({ 
      providerId, 
      status: 'confirmed',
      date: { $gte: new Date() }
    })
    .sort({ date: 1 })
    .limit(3)
    .populate('clientId', 'firstName lastName email phone profilePhoto');

    // Get recent reviews
    const recentReviews = await Review.find({ providerId })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate('clientId', 'firstName lastName profilePhoto');

    res.json({
      provider,
      stats: {
        pendingBookings,
        upcomingBookings,
        unreadMessages,
        newReviews
      },
      upcomingJobs,
      feedback: {
        rating: provider.rating,
        totalReviews: provider.totalReviews,
        recentReviews
      }
    });
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get provider bookings
exports.getBookings = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { status } = req.query;
    
    let query = { providerId };
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .sort({ date: status === 'completed' ? -1 : 1 })
      .populate('clientId', 'firstName lastName email phone profilePhoto');

    res.json(bookings);
  } catch (error) {
    console.error('Error getting bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const providerId = req.user.id;

    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId, providerId },
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Create notification for client
    await Notification.create({
      userId: booking.clientId,
      userType: 'client',
      type: 'booking',
      title: 'Booking Status Updated',
      message: `Your booking for ${booking.serviceName} has been ${status}`,
      metadata: {
        bookingId: booking._id,
        status
      }
    });

    res.json(booking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get provider services
exports.getServices = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { status } = req.query;
    
    const provider = await Provider.findById(providerId)
      .select('services');
    
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    let services = provider.services;
    if (status) {
      services = services.filter(s => s.status === status);
    }

    res.json(services);
  } catch (error) {
    console.error('Error getting services:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new service
exports.addService = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { 
      name, 
      category, 
      price, 
      duration, 
      description, 
      serviceAreas 
    } = req.body;

    const newService = {
      name,
      category,
      price,
      duration,
      description,
      serviceAreas,
      status: 'pending'
    };

    const provider = await Provider.findByIdAndUpdate(
      providerId,
      { $push: { services: newService } },
      { new: true }
    );

    res.json(provider.services[provider.services.length - 1]);
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update service
exports.updateService = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { serviceId } = req.params;
    const updateData = req.body;

    const provider = await Provider.findOneAndUpdate(
      { 
        _id: providerId,
        'services._id': serviceId 
      },
      { 
        $set: {
          'services.$.name': updateData.name,
          'services.$.category': updateData.category,
          'services.$.price': updateData.price,
          'services.$.duration': updateData.duration,
          'services.$.description': updateData.description,
          'services.$.serviceAreas': updateData.serviceAreas
        } 
      },
      { new: true }
    );

    if (!provider) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const updatedService = provider.services.id(serviceId);
    res.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { serviceId } = req.params;

    const provider = await Provider.findByIdAndUpdate(
      providerId,
      { $pull: { services: { _id: serviceId } } },
      { new: true }
    );

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get provider notifications
exports.getNotifications = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { type, limit } = req.query;

    let query = { 
      userId: providerId, 
      userType: 'provider' 
    };
    
    if (type) {
      query.type = type;
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit) || 20);

    res.json(notifications);
  } catch (error) {
    console.error('Error getting notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark notifications as read
exports.markNotificationsAsRead = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { notificationIds } = req.body;

    await Notification.updateMany(
      { 
        _id: { $in: notificationIds },
        userId: providerId 
      },
      { isRead: true }
    );

    res.json({ message: 'Notifications marked as read' });
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get provider earnings
exports.getEarnings = async (req, res) => {
  try {
    const providerId = req.user.id;
    const { startDate, endDate } = req.query;

    let query = { 
      providerId,
      status: 'completed',
      paymentStatus: 'paid'
    };

    if (startDate && endDate) {
      query.completedAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const earningsData = await Booking.aggregate([
      { $match: query },
      { 
        $group: {
          _id: null,
          totalEarnings: { $sum: '$price' },
          completedBookings: { $sum: 1 }
        }
      }
    ]);

    const result = earningsData.length > 0 ? earningsData[0] : { 
      totalEarnings: 0, 
      completedBookings: 0 
    };

    res.json(result);
  } catch (error) {
    console.error('Error getting earnings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update provider profile
exports.updateProfile = async (req, res) => {
  try {
    const providerId = req.user.id;
    const updateData = req.body;

    // Handle file uploads if needed
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

    res.json(provider);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};