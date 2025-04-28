// routes/providerRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const providerController = require('../controllers/providerController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/providers');
    if (!fs.existsSync(uploadDir)) {e
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

// Public routes (no authentication required)
router.post('/register',
  upload.fields([
    { name: 'idPhoto', maxCount: 1 },
    { name: 'selfiePhoto', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 }
  ]),
  providerController.registerProvider
);

// Apply auth middleware to all routes below this point
router.use(auth.protect);

// Dashboard data
router.get('/dashboard', providerController.getDashboardData);
router.get('/dashboard/stats', providerController.getDashboardStats);
router.get('/bookings/upcoming', providerController.getUpcomingBookings);
router.get('/reviews', providerController.getProviderReviews);

// Other routes
router.get('/bookings', providerController.getBookings);
router.put('/bookings/:bookingId/status', providerController.updateBookingStatus);
router.get('/services', providerController.getServices);
router.post('/services', providerController.addService);
router.put('/services/:serviceId', providerController.updateService);
router.delete('/services/:serviceId', providerController.deleteService);
router.get('/notifications', providerController.getNotifications);
router.put('/notifications/read', providerController.markNotificationsAsRead);
router.get('/earnings', providerController.getEarnings);
router.get('/profile', providerController.getDashboardData); // Reuse dashboard data for profile
router.put('/profile', providerController.updateProfile);

module.exports = router;