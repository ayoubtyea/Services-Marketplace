// controllers/providerController.js
const Provider = require('../models/Provider');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerProvider = async (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.files) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const { 
      firstName, lastName, email, phone, dob,
      address, city, zip, services, otherSkills,
      experience, availability, serviceAreas, bio,
      terms, communications
    } = req.body;

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
      dob,
      address,
      city,
      zip,
      idPhoto: req.files.idPhoto ? req.files.idPhoto[0].path : null,
      selfiePhoto: req.files.selfiePhoto ? req.files.selfiePhoto[0].path : null,
      profilePhoto: req.files.profilePhoto ? req.files.profilePhoto[0].path : null,
      services: JSON.parse(services),
      otherSkills,
      experience,
      availability,
      serviceAreas: JSON.parse(serviceAreas),
      bio,
      terms,
      communications,
      status: 'pending' // Set initial status
    });

    // Save provider
    await provider.save();

    // Create JWT token
    const token = jwt.sign(
      { id: provider._id, role: 'provider' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      provider: {
        id: provider._id,
        email: provider.email,
        status: provider.status
      }
    });

  } catch (error) {
    console.error('Provider registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};