const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // For loading environment variables from .env file

const app = express();

// Middleware
app.use(bodyParser.json());  // Parse incoming JSON requests
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)

// MongoDB Atlas connection string
const mongoURI = process.env.MONGO_URI; // Store your MongoDB connection string in an .env file

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('Error connecting to MongoDB Atlas:', err));

// Import the routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes); // Use auth routes for all requests starting with /api

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
