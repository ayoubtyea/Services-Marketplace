const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/providers');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename);
  }
});

// File filter for images and PDFs
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

// Import controller
const providerController = require('../controllers/providerController');

// Provider Registration Route
router.post('/register', 
  upload.fields([
    { name: 'idPhoto', maxCount: 1 },
    { name: 'selfiePhoto', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 }
  ]),
  providerController.registerProvider
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

module.exports = router;