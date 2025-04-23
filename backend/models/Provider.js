// Model Provider :
const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: String,
  dob: Date,
  address: String,
  city: String,
  zip: String,
  idPhoto: String,
  selfiePhoto: String,
  profilePhoto: String,
  services: [String],
  otherSkills: String,
  experience: String,
  availability: String,
  serviceAreas: [String],
  bio: String,
  terms: { type: Boolean, required: true },
  communications: { type: [String], required: false }  // Change required to false
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;
