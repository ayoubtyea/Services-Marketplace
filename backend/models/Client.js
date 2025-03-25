const mongoose = require('mongoose');
const User = require('./User');

const clientSchema = new mongoose.Schema({
  address: String,
  preferences: {
    type: Map,
    of: String
  }
});

module.exports = User.discriminator('Client', clientSchema);