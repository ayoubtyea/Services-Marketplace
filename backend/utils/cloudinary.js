const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploadToCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `handyhome/${folder}`,
      use_filename: true,
      unique_filename: false,
      resource_type: 'auto'
    });

    // Delete file from server after upload
    fs.unlinkSync(filePath);

    return result;
  } catch (error) {
    // Delete file from server if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};