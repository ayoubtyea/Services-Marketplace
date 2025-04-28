const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const Provider = require('../models/Provider');
const Admin = require('../models/Admin');

// Function to generate JWT token
const generateAuthToken = (user, role) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: role },
    process.env.JWT_SECRET, // Ensure JWT_SECRET is set in your .env
    { expiresIn: '1h' }
  );
};

// Function to create authentication response
const createAuthResponse = (user, role) => {
  return {
    success: true,
    token: generateAuthToken(user, role),
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName || '',
      role: role,
      phoneNumber: user.phoneNumber || '',
    }
  };
};

// Client Signup
exports.clientSignup = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: 'Email already in use' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role: 'client' // Explicitly set role
    });

    res.status(201).json(createAuthResponse(user, 'client'));

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message || 'Client registration failed' 
    });
  }
};

// Provider Signup - Fixed to directly handle signup instead of calling another router
exports.providerSignup = async (req, res) => {
  try {
    // This should be handled by the providerController.registerProvider
    // with proper middleware for file uploads
    res.status(400).json({ 
      success: false,
      message: 'Please use the /api/provider/register endpoint for provider registration'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Provider registration failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// General Login for client, provider, and admin
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // First check User collection
    let user = await User.findOne({ email });
    let role = 'client';
    
    // If not found, check Provider
    if (!user) {
      user = await Provider.findOne({ email });
      role = 'provider';
    }
    
    // If still not found, check Admin
    if (!user) {
      user = await Admin.findOne({ email });
      role = 'admin';
    }

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    // For provider, check if they're approved
    if (role === 'provider' && user.status !== 'approved') {
      return res.status(403).json({
        success: false,
        message: 'Your account is pending approval'
      });
    }

    const token = generateAuthToken(user, role);
    
    // Add relevant user info based on role
    const userData = {
      id: user._id,
      email: user.email,
      role: role
    };
    
    // Add name based on the model structure
    if (role === 'client' || role === 'admin') {
      userData.fullName = user.fullName;
    } else if (role === 'provider') {
      userData.fullName = `${user.firstName} ${user.lastName}`;
      userData.status = user.status;
    }

    res.status(200).json({
      success: true,
      token: token,
      user: userData
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ 
      success: false,
      message: 'Login failed' 
    });
  }
};

// Admin Signup
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

// Export the utility functions for other controllers
exports.generateAuthToken = generateAuthToken;
exports.createAuthResponse = createAuthResponse;