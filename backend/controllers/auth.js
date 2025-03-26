const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const crypto = require('crypto');
const sendEmail = require('../utils/email');



// Signup controller
exports.signup = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);
    
    const { fullName, email, phoneNumber, password, role } = req.body;
    
    // Enhanced validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (role && !['client', 'provider', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid user role' });
    }

    console.log("Checking for existing user...");
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log("User already exists with email:", email);
      return res.status(409).json({ message: 'Email already in use' });
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log("Creating user...");
    const user = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role: role || 'client' // Default to client if not specified
    });

    console.log("Generating token...");
    const token = jwt.sign(
      { 
        userId: user._id,
        role: user.role // Include role in token
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("Signup successful for:", email);
    res.status(201).json({ 
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role // Include role in response
      }
    });

  } catch (error) {
    console.error("❗ SIGNUP ERROR:", error);
    res.status(500).json({ 
      message: error.message || 'Registration failed',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user with all necessary fields
    const user = await User.findOne({ email })
      .select('+password +role') // Ensure password and role are included
      .lean();

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Remove password before sending response
    delete user.password;

    // Create token with consistent payload
    const token = jwt.sign(
      { 
        userId: user._id,
        role: user.role // Include role in token
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role // Ensure role is included
      }
    });
  } catch (error) {
    console.error("❗ LOGIN ERROR:", error);
    res.status(500).json({ 
      message: 'Authentication failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Admin Login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Find user and check if admin
    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.isAdmin) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    // 2. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    // 3. Generate admin-specific token
    const token = jwt.sign(
      { userId: user._id, role: 'admin', isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      token,
      user: {
        id: user._id,
        email: user.email,
        role: 'admin',
        isAdmin: true
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Admin login failed', error: err.message });
  }
};


// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No user with that email' });
    }

    // 2. Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // 3. Set token expiry (1 hour)
    const passwordResetExpires = Date.now() + 3600000;

    // 4. Save to database
    user.passwordResetToken = passwordResetToken;
    user.passwordResetExpires = passwordResetExpires;
    await user.save();

    // 5. Send email
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
    
    const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetUrl}\nIf you didn't forget your password, please ignore this email!`;

    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 1 hour)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    // Remove the user.passwordResetToken lines since user might not be defined
    console.error('Error in forgotPassword:', err);
    res.status(500).json({ 
      message: 'Error sending email',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Token is invalid or has expired' });
    }

    user.password = await bcrypt.hash(req.body.password, 12);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
      token,
      message: 'Password reset successful!',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error: error.message });
  }
};