const express = require('express');
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware.protect); 

router.route('/')
  .get(bookingController.getAllBookings);

router.route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBookingStatus);

module.exports = router;