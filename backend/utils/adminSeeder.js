const Admin = require('../models/Admin');  // Make sure Admin model is imported
const bcrypt = require('bcryptjs'); // Make sure this is here


// Function to check if the admin exists, and if not, create the admin user
const createAdminIfNotExists = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
      
      const admin = new Admin({
        fullName: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        phoneNumber: process.env.ADMIN_PHONE,
        password: hashedPassword,
        role: 'admin',
        isVerified: true,
      });

      await admin.save();
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  }
};

module.exports = createAdminIfNotExists;
