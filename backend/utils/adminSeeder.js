const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

// Function to check if the admin exists, and if not, create the admin user
const createAdminIfNotExists = async () => {
  try {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_NAME || !process.env.ADMIN_PHONE) {
      console.error('❌ Missing environment variables for admin setup');
      return;
    }

    if (process.env.NODE_ENV === 'production') {
      console.log('✅ Skipping admin creation in production environment');
      return;
    }

    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (!existingAdmin) {
      const saltRounds = process.env.BCRYPT_SALT_ROUNDS || 12;
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, saltRounds);

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
    console.error('❌ Error creating admin:', error);
  }
};

module.exports = createAdminIfNotExists;
