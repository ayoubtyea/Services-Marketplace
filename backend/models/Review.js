const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  serviceType: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);