// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Provider = require('../models/Provider');
const Admin = require('../models/Admin');

// Create an object to hold different middleware functions
const authMiddleware = {
  // Protect routes (requires authentication)
  protect: async (req, res, next) => {
    try {
      // Get token from header
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
          success: false,
          message: 'No token provided. Authorization denied' 
        });
      }
      
      const token = authHeader.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user
      let user;
      
      switch(decoded.role) {
        case 'client':
          user = await User.findById(decoded.id).select('-password');
          break;
        case 'provider':
          user = await Provider.findById(decoded.id).select('-password');
          break;
        case 'admin':
          user = await Admin.findById(decoded.id).select('-password');
          break;
        default:
          return res.status(401).json({ 
            success: false, 
            message: 'Invalid user role' 
          });
      }
      
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'User not found' 
        });
      }
      
      // Add user to request
      req.user = {
        id: user._id,
        email: user.email,
        role: decoded.role
      };
      
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).json({ 
        success: false, 
        message: 'Authentication failed' 
      });
    }
  },
  
  // More middleware functions can be added here
  restrictTo: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to perform this action'
        });
      }
      next();
    };
  }
};

module.exports = authMiddleware;