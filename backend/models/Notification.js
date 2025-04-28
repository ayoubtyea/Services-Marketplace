const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Notification must belong to a user']
  },
  type: {
    type: String,
    required: [true, 'Notification must have a type'],
    enum: ['booking', 'payment', 'update', 'promotion']
  },
  title: {
    type: String,
    required: [true, 'Notification must have a title']
  },
  message: {
    type: String,
    required: [true, 'Notification must have a message']
  },
  read: {
    type: Boolean,
    default: false
  },
  details: {
    type: Object,
    default: {}
  },
  actions: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for better performance
notificationSchema.index({ user: 1, read: 1 });
notificationSchema.index({ createdAt: -1 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;