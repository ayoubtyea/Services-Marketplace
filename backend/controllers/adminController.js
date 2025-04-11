// Admin SignUp in `authController.js`

exports.adminSignup = async (req, res) => {
    try {
      const { fullName, email, phoneNumber, password } = req.body;
  
      // Check if the admin already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(409).json({
          success: false,
          message: 'Email already in use'
        });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const admin = await Admin.create({
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
        role: 'admin',
        isVerified: true, // Admins are typically verified by default
      });
  
      res.status(201).json(createAuthResponse(admin, 'admin'));
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Admin registration failed'
      });
    }
  };
  