const mongoose = require('mongoose');

const earningsSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.ObjectId,
    ref: 'Provider',
    required: [true, 'Earnings must belong to a Provider!']
  },
  booking: {
    type: mongoose.Schema.ObjectId,
    ref: 'Booking',
    required: [true, 'Earnings must belong to a Booking!']
  },
  amount: {
    type: Number,
    required: [true, 'Earnings must have an amount.']
  },
  date: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: String
});

earningsSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'booking',
    select: 'service date price'
  });
  next();
});

const Earnings = mongoose.model('Earnings', earningsSchema);

module.exports = Earnings;