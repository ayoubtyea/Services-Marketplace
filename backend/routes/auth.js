const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Input validation middleware
const validateSignup = (req, res, next) => {
  const { fullName, email, phoneNumber, password } = req.body;
  
  if (!fullName || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  next();
};

// POST route for signing up a new user
router.post('/signup', validateSignup, async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    // Create a JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || 'your_jwt_secret', {
      expiresIn: '1h',
    });

    // Remove password from response
    const userResponse = { ...newUser.toObject() };
    delete userResponse.password;

    res.status(201).json({ token, user: userResponse });
  } catch (err) {
    console.error("Error signing up user:", err);
    res.status(500).json({ message: 'Server error during signup', error: err.message });
  }
});

// Login validation middleware
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  next();
};

// Post route for login a user
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', {
      expiresIn: '1h',
    });

    // Remove password from response
    const userResponse = { ...user.toObject() };
    delete userResponse.password;

    res.status(200).json({ token, user: userResponse });

  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ message: 'Server error during login', error: err.message });
  }
});

module.exports = router;