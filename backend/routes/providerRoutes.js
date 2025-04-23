// routes/providerRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Provider = require('../models/Provider');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/providers/';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, JPG, and PDF are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Provider Registration
router.post('/register', 
  upload.fields([
    { name: 'idPhoto', maxCount: 1 },
    { name: 'selfiePhoto', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        phone,
        dob,
        address,
        city,
        zip,
        services,
        otherSkills,
        experience,
        availability,
        serviceAreas,
        bio,
        terms,
        communications
      } = req.body;

      // Check if provider already exists
      const existingProvider = await Provider.findOne({ email });
      if (existingProvider) {
        return res.status(400).json({ message: 'Provider already exists with this email' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

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
        services: JSON.parse(services),
        otherSkills,
        experience,
        availability,
        serviceAreas: JSON.parse(serviceAreas),
        bio,
        terms,
        communications: communications ? ['email', 'sms'] : [],
        status: 'pending' // Initial status
      });

      // Handle file uploads
      if (req.files) {
        if (req.files['idPhoto']) {
          provider.idPhoto = req.files['idPhoto'][0].path;
        }
        if (req.files['selfiePhoto']) {
          provider.selfiePhoto = req.files['selfiePhoto'][0].path;
        }
        if (req.files['profilePhoto']) {
          provider.profilePhoto = req.files['profilePhoto'][0].path;
        }
      }

      // Save provider to database
      await provider.save();

      // Create JWT token
      const token = jwt.sign(
        { 
          id: provider._id, 
          email: provider.email, 
          role: 'provider',
          status: provider.status
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      // Return response
      res.status(201).json({
        token,
        provider: {
          id: provider._id,
          firstName: provider.firstName,
          lastName: provider.lastName,
          email: provider.email,
          phone: provider.phone,
          status: provider.status,
          profilePhoto: provider.profilePhoto
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
      
      // Clean up uploaded files if error occurred
      if (req.files) {
        Object.values(req.files).forEach(files => {
          files.forEach(file => {
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          });
        });
      }

      res.status(500).json({ 
        message: error.message || 'Registration failed. Please try again.' 
      });
    }
  }
);

// Get provider profile
router.get('/:id', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id)
      .select('-password -__v');

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update provider profile
router.put('/:id', upload.single('profilePhoto'), async (req, res) => {
  try {
    const updates = req.body;
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    // Handle profile photo update
    if (req.file) {
      // Delete old profile photo if exists
      if (provider.profilePhoto && fs.existsSync(provider.profilePhoto)) {
        fs.unlinkSync(provider.profilePhoto);
      }
      updates.profilePhoto = req.file.path;
    }

    // Update provider
    Object.assign(provider, updates);
    await provider.save();

    res.json({
      message: 'Profile updated successfully',
      provider: {
        id: provider._id,
        firstName: provider.firstName,
        lastName: provider.lastName,
        email: provider.email,
        profilePhoto: provider.profilePhoto
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;