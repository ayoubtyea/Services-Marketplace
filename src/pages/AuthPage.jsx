import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API_URL = "http://localhost:5000/api/auth"; 

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "client" // Default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = (isLoginForm) => {
    setIsLogin(isLoginForm);
    setShowForm(true);
    setShowForgotPassword(false);
    setError("");
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      role: "client"
    });
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
    setError("");
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    // Signup specific validations
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!validateForm()) return;
  
    setIsLoading(true);
  
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        role: formData.role // Make sure this is 'provider' when signing up as provider
      };
  
      const response = await axios.post(`${API_URL}/signup`, payload);
  
      // DEBUG: Verify the role in response
      console.log("Signup Response:", response.data);
      
      // Store token and user data
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      
      // Redirect to home page first
      navigate("/");
      
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      handleAuthError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthError = (err) => {
    if (err.response) {
      switch (err.response.status) {
        case 400:
          setError(err.response.data.message || "Invalid request");
          break;
        case 401:
          setError("Invalid email or password");
          break;
        case 409:
          setError("Email already in use");
          break;
        default:
          setError("Something went wrong. Please try again.");
      }
    } else {
      setError("Network error. Please check your connection.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center" style={{
      backgroundImage: 'url("https://s3-alpha-sig.figma.com/img/ec36/6190/b0a1cdce092091e2710452391cd3428d?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VAImpOZGx4AujJ3qiYStb07bcaN-UqWH5uwXgD8YczwKT0oUP7jfTeY6us1p-BD4VmW5R93gfpPcDeHdZbYzB-GL3epdEpaR5ayjgu9gvbmQWRyuL9zmznW~qNxil~4wt-2Uj7TIz5S2EOccxdvc7AnylZbQd5SZTxdXdu2Hf7sb90Rh6VcZfRt2HreF-Br4wF7j3KgbZEHixSJkLRfUl69VI~96rVUOwUCpMRVGvPdPOFPTFNvzQAjwcgiyZGRi2DsQU9RHZMisk8o2jKp8z49luk-35eU7YEvzYWpODq2gC9g6MHADTFtjxA96U1W9S3j~KI~EKqBtSFaw5kUysg__")',
    }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg text-center w-full max-w-md transition-all duration-500">
        <img
          src="https://i.postimg.cc/C5dQgh9H/MAIN-1.png"
          alt="Logo"
          className="h-8 mx-auto mb-8"
        />

        {!showForm ? (
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleButtonClick(false)}
              className="w-full py-3 bg-[#076870] hover:bg-[#065d64] rounded-full text-white cursor-pointer transition duration-300"
            >
              Sign Up
            </button>
            <button
              onClick={() => handleButtonClick(true)}
              className="w-full py-3 bg-[#076870] hover:bg-[#065d64] text-white rounded-full cursor-pointer transition duration-300"
            >
              Log In
            </button>
          </div>
        ) : (
          <>
            {showForgotPassword ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <h1 className="text-3xl font-light mb-4">Forgot Password</h1>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076870]"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#076870] hover:bg-[#065d64] text-white rounded-lg transition duration-300 cursor-pointer disabled:opacity-70"
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
                  ) : "Reset Password"}
                </button>
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="text-[#076870] hover:text-[#065d64] transition duration-300 cursor-pointer mt-4"
                >
                  Back to Log In
                </button>
              </form>
            ) : (
              <>
                <h1 className="text-3xl font-light mb-4">
                  {isLogin ? "Log In" : "Sign Up"}
                </h1>

                {error && (
                  <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
                    {error}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {!isLogin && (
                    <>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076870]"
                        required
                      />
                      
                      {/* Role Selection */}
                      <div className="w-full space-y-2">
  <label className="block text-sm font-medium text-gray-700">Account Type</label>
  <div className="flex gap-4">
    {/* Client Option */}
    <label className={`flex-1 cursor-pointer rounded-lg border-2 p-4 transition-all 
      ${formData.role === 'client' 
        ? 'border-[#076870] bg-[#076870]/10 shadow-md' 
        : 'border-gray-200 hover:border-gray-300'}`}
    >
      <div className="flex items-center">
        <input
          type="radio"
          name="role"
          value="client"
          checked={formData.role === 'client'}
          onChange={handleChange}
          className="h-5 w-5 border-gray-300 text-[#076870] focus:ring-[#076870]"
        />
        <div className="ml-3 flex flex-col">
          <span className={`text-sm font-medium 
            ${formData.role === 'client' ? 'text-[#076870]' : 'text-gray-700'}`}>
            Client
          </span>
          <span className="text-xs text-gray-500">
            I want to hire services
          </span>
        </div>
      </div>
    </label>

    {/* Provider Option */}
    <label className={`flex-1 cursor-pointer rounded-lg border-2 p-4 transition-all 
      ${formData.role === 'provider' 
        ? 'border-[#076870] bg-[#076870]/10 shadow-md' 
        : 'border-gray-200 hover:border-gray-300'}`}
    >
      <div className="flex items-center">
        <input
          type="radio"
          name="role"
          value="provider"
          checked={formData.role === 'provider'}
          onChange={handleChange}
          className="h-5 w-5 border-gray-300 text-[#076870] focus:ring-[#076870]"
        />
        <div className="ml-3 flex flex-col">
          <span className={`text-sm font-medium 
            ${formData.role === 'provider' ? 'text-[#076870]' : 'text-gray-700'}`}>
            Provider
          </span>
          <span className="text-xs text-gray-500">
            I want to offer services
          </span>
        </div>
      </div>
    </label>
  </div>
</div>
                    </>
                  )}

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                      error.toLowerCase().includes("email") ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#076870]"
                    }`}
                    required
                  />

                  {!isLogin && (
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                        error.toLowerCase().includes("phone") ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#076870]"
                      }`}
                      required
                    />
                  )}

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                        error.toLowerCase().includes("password") ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#076870]"
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
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
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                          formData.password && formData.password !== formData.confirmPassword
                            ? "border-red-500 focus:ring-red-300"
                            : "border-gray-300 focus:ring-[#076870]"
                        }`}
                        required
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2 bg-[#076870] hover:bg-[#065d64] text-white rounded-lg transition duration-300 cursor-pointer disabled:opacity-70"
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
                    ) : isLogin ? (
                      "Log In"
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  {isLogin && (
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={handleForgotPasswordClick}
                        className="text-[#076870] hover:text-[#065d64] text-sm font-light transition duration-300"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}
                </form>

                {!isLogin && (
                  <p className="text-sm text-gray-600 mt-4">
                    By signing up, you agree to our{" "}
                    <a href="#" className="text-[#076870] hover:text-[#065d64]">
                      Terms and Conditions
                    </a>
                    .
                  </p>
                )}

                <button
                  onClick={() => setShowForm(false)}
                  className="text-[#076870] hover:text-[#065d64] transition duration-300 cursor-pointer mt-4"
                >
                  Go Back
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;