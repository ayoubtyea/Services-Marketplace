const mongoose = require('mongoose');
const User = require('./User');

const providerSchema = new mongoose.Schema({
  services: [String],
  certifications: [{
    name: String,
    issuedBy: String,
    date: Date
  }],
  rating: {
    type: Number,
    default: 0
  }
});

module.exports = User.discriminator('Provider', providerSchema);