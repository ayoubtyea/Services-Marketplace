const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const providerController = require('../controllers/providerController');
const { protect } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/providers');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
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

// Public routes (no authentication required)
// Provider Registration Route
router.post('/register', 
  upload.fields([
    { name: 'idPhoto', maxCount: 1 },
    { name: 'selfiePhoto', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 }
  ]),
  handleFileUploadErrors,
  providerController.registerProvider
);

// Protected routes (authentication required)
router.use(protect);

// Get provider dashboard data
router.get('/dashboard', providerController.getDashboardData);

// Get provider profile
router.get('/profile', providerController.getProfile);

// Update provider profile
router.patch('/profile', 
  upload.fields([
    { name: 'profilePhoto', maxCount: 1 }
  ]), 
  providerController.updateProfile
);

// Get provider bookings
router.get('/bookings', providerController.getBookings);

// Update booking status
router.patch('/bookings/:bookingId/status', providerController.updateBookingStatus);

// Get provider services
router.get('/services', providerController.getServices);

// Get provider notifications
router.get('/notifications', providerController.getNotifications);

// Mark notifications as read
router.patch('/notifications/read', providerController.markNotificationsAsRead);

// Get provider earnings - Comment out if not implemented yet
// router.get('/earnings', providerController.getEarnings);

// Export the router
module.exports = router;