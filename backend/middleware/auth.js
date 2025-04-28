// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../utils/appError');
const User = require('../models/User');
const Provider = require('../models/Provider');
const Admin = require('../models/Admin');

exports.protect = async (req, res, next) => {
  try {
    // 1) Get token and check if it exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'You are not logged in! Please log in to get access.'
      });
    }

    // 2) Verify token
    let decoded;
    try {
      decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please log in again.'
      });
    }

    // 3) Check if user still exists based on role
    let currentUser;
    const { id, role } = decoded;

    switch (role) {
      case 'client':
        currentUser = await User.findById(id);
        break;
      case 'provider':
        currentUser = await Provider.findById(id);
        break;
      case 'admin':
        currentUser = await Admin.findById(id);
        break;
      default:
        return res.status(401).json({
          success: false,
          message: 'Invalid user role'
        });
    }

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists.'
      });
    }

    // 4) For providers with pending status, allow limited access
    // This part is removed to allow pending providers to access dashboard and profile pages
    // Instead, we'll handle access restrictions in the route controllers

    // 5) Check if password was changed after the token was issued
    if (currentUser.passwordChangedAt && decoded.iat) {
      const passwordChangedAt = parseInt(currentUser.passwordChangedAt.getTime() / 1000, 10);
      
      if (passwordChangedAt > decoded.iat) {
        return res.status(401).json({
          success: false,
          message: 'User recently changed password! Please log in again.'
        });
      }
    }

    // Add user info to the request object
    req.user = {
      id: currentUser._id,
      email: currentUser.email,
      role: role
    };
    
    // Add additional properties based on the model
    if (role === 'client' || role === 'admin') {
      req.user.fullName = currentUser.fullName;
    } else if (role === 'provider') {
      req.user.firstName = currentUser.firstName;
      req.user.lastName = currentUser.lastName;
      req.user.status = currentUser.status;
    }

    next();
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

// Middleware to restrict access based on roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};