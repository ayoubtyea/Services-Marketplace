import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [loading, setLoading] = useState(false); // Add this state

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "client"
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Check for reset token in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setResetToken(token);
      setShowForgotPassword(true);
      setShowForm(true);
    }
  }, []);

  const handleButtonClick = (isLoginForm) => {
    setIsLogin(isLoginForm);
    setShowForm(true);
    setShowForgotPassword(false);
    setError("");
    setFormData(prev => ({
      ...prev,
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      role: prev.role
    }));
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
    setError("");
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setResetToken("");
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setFormData(prev => ({ ...prev, role: e.target.value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (!isLogin) {
      if (!formData.fullName.trim()) {
        setError("Full name is required");
        return false;
      }
      
      if (!formData.phoneNumber.trim()) {
        setError("Phone number is required");
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords don't match");
        return false;
      }
    }

    return true;
  };

// In your handleFormSubmit function
const handleFormSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/login',
      {
        email: formData.email.trim(),
        password: formData.password.trim()
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true // Important for cookies if using them
      }
    );

    // Store the authentication data
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('userData', JSON.stringify(response.data.user));

    // Log the received data for debugging
    console.log('Login successful - User data:', response.data.user);
    console.log('Stored token:', response.data.token);

    // Redirect based on role
    switch(response.data.user.role.toLowerCase()) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'provider':
        navigate('/provider/dashboard');
        break;
      case 'client':
        navigate('/client/dashboard');
        break;
      default:
        navigate('/');
    }

  } catch (error) {
    setLoading(false);
    
    // Detailed error handling
    if (error.response) {
      console.error('Login error response:', error.response.data);
      
      switch(error.response.status) {
        case 401:
          setError('Invalid email or password');
          break;
        case 403:
          setError('Account not authorized as provider');
          break;
        default:
          setError(error.response.data.message || 'Login failed');
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
      setError('Network error. Please try again.');
    } else {
      console.error('Request setup error:', error.message);
      setError('An error occurred. Please try again.');
    }
  }
};

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      if (!resetToken) {
        if (!forgotPasswordEmail) {
          setError("Please enter your email");
          return;
        }
        
        await axios.post(`${API_URL}/forgot-password`, { email: forgotPasswordEmail });
        alert('Email Sent Successfully');
      } else {
        if (newPassword !== confirmNewPassword) {
          setError("Passwords don't match");
          return;
        }
        if (newPassword.length < 6) {
          setError("Password must be at least 6 characters");
          return;
        }

        const response = await axios.post(`${API_URL}/reset-password/${resetToken}`, { 
          password: newPassword 
        });

        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        setResetSuccess(true);
        
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center" style={{
      backgroundImage: 'url("https://i.postimg.cc/wvny7Q4N/workingman.jpg")',
    }}>
      <div className="bg-white bg-opacity-90 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md transition-all duration-300">
        <div className="flex justify-center mb-6">
          <img
            src="https://i.postimg.cc/Jz7n7F7g/MAIN-1.png"
            alt="Logo"
            className="h-7 sm:h-8"
          />
        </div>

        {!showForm ? (
            <div className="space-y-3 sm:space-y-4 text-center">
            <button
              onClick={() => handleButtonClick(false)}
              className="cursor-pointer w-full py-2.5 sm:py-3 bg-[#076870] hover:bg-[#065d64] rounded-full text-white text-sm sm:text-base transition duration-200"
            >
              Sign Up
            </button>
            <button
              onClick={() => handleButtonClick(true)}
              className="cursor-pointer w-full py-2.5 sm:py-3 bg-[#076870] hover:bg-[#065d64] text-white rounded-full text-sm sm:text-base transition duration-200"
            >
              Log In
            </button>
            <a
              onClick={() => {
                setIsAdminLogin(true);
                setShowForm(true);
              }}
              className="cursor-pointer hover:text-[#05484fce] text-[#05484f] rounded-full text-base sm:text-base transition duration-200"
            >
              Admin Login
            </a>
          </div>
        ) : showForgotPassword ? (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
            {!resetToken ? (
              <>
                <h2 className="text-xl font-semibold text-gray-800 text-center">Reset Password</h2>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Enter your email to receive a password reset link
                </p>
                <input
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#076870]"
                  required
                />
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-800">Set New Password</h2>
                {resetSuccess ? (
                  <div className="p-3 bg-green-100 text-green-700 rounded-lg">
                    Password reset successfully!
                  </div>
                ) : (
                  <>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#076870]"
                      required
                      minLength="6"
                    />
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#076870]"
                      required
                      minLength="6"
                    />
                  </>
                )}
              </>
            )}
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-[#076870] hover:bg-[#065d64] text-white rounded-lg transition duration-300 disabled:opacity-70"
              disabled={isLoading || (resetToken && newPassword !== confirmNewPassword)}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {resetToken ? "Updating..." : "Sending..."}
                </>
              ) : resetToken ? "Update Password" : "Send Reset Link"}
            </button>
            <button
              type="button"
              onClick={handleBackToLogin}
              className="text-[#076870] hover:text-[#065d64] text-sm font-medium mt-4"
            >
              Back to Login
            </button>
          </form>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl font-light mb-3 sm:mb-4 text-center">
  {isAdminLogin ? "Admin Login" : isLogin ? "Log In" : "Sign Up"}
</h1>

            {error && (
              <div className="mb-3 sm:mb-4 p-2 text-sm bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

<form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
  {/* Hide these fields for admin login */}
  {!isLogin && !isAdminLogin && (
    <>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076870]"
        required
      />
      
      <div className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg bg-white/90 backdrop-blur-sm focus-within:border-[#076870] focus-within:ring-2 focus-within:ring-[#076870]/30 transition-all duration-200">
        <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-2 px-1">
          Account Type
        </label>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <label className={`flex items-center justify-center p-2 sm:p-3 rounded-md border-2 cursor-pointer transition-all duration-200 ${
            formData.role === 'client' 
              ? 'border-[#076870] bg-[#076870]/10 shadow-inner'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}>
            <input
              type="radio"
              name="role"
              value="client"
              checked={formData.role === 'client'}
              onChange={handleRoleChange}
              className="sr-only"
            />
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2 ${
              formData.role === 'client' 
                ? 'border-[#076870] bg-[#076870]'
                : 'border-gray-300'
            }`}>
              {formData.role === 'client' && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <span className="text-sm sm:text-base font-medium text-gray-700">Client</span>
          </label>

          <label className={`flex items-center justify-center p-2 sm:p-3 rounded-md border-2 cursor-pointer transition-all duration-200 ${
            formData.role === 'provider' 
              ? 'border-[#076870] bg-[#076870]/10 shadow-inner'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}>
            <input
              type="radio"
              name="role"
              value="provider"
              checked={formData.role === 'provider'}
              onChange={handleRoleChange}
              className="sr-only"
            />
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-2 ${
              formData.role === 'provider' 
                ? 'border-[#076870] bg-[#076870]'
                : 'border-gray-300'
            }`}>
              {formData.role === 'provider' && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <span className="text-sm sm:text-base font-medium text-gray-700">Provider</span>
          </label>
        </div>
      </div>

      <input
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076870]"
        required
      />
    </>
  )}

  {/* Keep these fields for all login types */}
  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="Email Address"
    className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076870]"
    required
  />


              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076870]"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 text-sm"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>

              {!isLogin && (
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076870]"
                    required
                    minLength="6"
                  />
                </div>
              )}

<button
  type="submit"
  className="w-full py-2 bg-[#076870] hover:bg-[#065d64] text-white text-sm sm:text-base rounded-lg transition duration-200 cursor-pointer disabled:opacity-70"
  disabled={isLoading}
>
  {isLoading ? (
    <span className="inline-flex items-center justify-center">
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing...
    </span>
  ) : isAdminLogin ? "Login as Admin" : isLogin ? "Log In" : "Create Account"}
</button>

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleForgotPasswordClick}
                    className="text-[#076870] hover:text-[#065d64] text-xs sm:text-sm transition duration-200"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
            </form>

            {!isLogin && (
              <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4">
                By signing up, you agree to our{" "}
                <a href="#" className="text-[#076870] hover:text-[#065d64]">
                  Terms and Conditions
                </a>
              </p>
            )}

<button
  onClick={() => {
    setShowForm(false);
    setIsAdminLogin(false);
  }}
  className="text-[#076870] hover:text-[#065d64] text-sm transition duration-200 cursor-pointer mt-3 sm:mt-4"
>
  Go Back
</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;