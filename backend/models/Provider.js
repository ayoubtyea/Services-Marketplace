const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  idPhoto: { type: String, required: true },
  selfiePhoto: { type: String, required: true },
  profilePhoto: { type: String, required: true },
  services: { type: [String], required: true },
  otherSkills: String,
  experience: { type: String, required: true },
  availability: { type: String, required: true },
  serviceAreas: { type: [String], required: true },
  bio: { type: String, required: true },
  terms: { type: Boolean, required: true, default: false },
  communications: { type: Boolean, required: true, default: false },
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  backgroundCheck: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = mongoose.models.Provider || mongoose.model('Provider', providerSchema);
