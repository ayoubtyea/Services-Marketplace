const express = require('express');
const router = express.Router();
const { registerProvider } = require('../controllers/providerController');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(), // ✅ store files in memory for buffer access
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});


// Then in your route:
router.post('/register', 
  upload.fields([
    { name: 'idPhoto', maxCount: 1 },
    { name: 'selfiePhoto', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 }
  ]),
  async (req, res) => {
    // req.files will contain the uploaded files
    // Process files and save their paths/URLs
  }
);

// Error handling middleware for file uploads
const handleFileUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  } else if (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  next();
};

router.post('/provider/register',
  upload.fields([
    { name: 'idPhoto', maxCount: 1 },
    { name: 'selfiePhoto', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 }
  ]),
  handleFileUploadErrors,
  registerProvider
);

module.exports = router;