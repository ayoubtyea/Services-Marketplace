const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

// Signup controller
exports.signup = async (req, res) => {
    try {
      console.log("Incoming request body:", req.body);
      
      const { fullName, email, phoneNumber, password } = req.body;
      
      // More validation
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
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
        password: hashedPassword
      });
  
      console.log("Generating token...");
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      console.log("Signup successful for:", email);
      res.status(201).json({ 
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email
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

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};