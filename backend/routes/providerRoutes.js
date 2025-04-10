// routes/providerRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { registerProvider } = require('../controllers/providerController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post('/register', 
  upload.fields([
    { name: 'idPhoto', maxCount: 1 },
    { name: 'selfiePhoto', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 }
  ]),
  registerProvider
);

module.exports = router;