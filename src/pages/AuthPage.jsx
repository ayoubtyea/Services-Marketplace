import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Your backend URL

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login/SignUp
  const [showForm, setShowForm] = useState(false); // Control form visibility
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Toggle Forgot Password form
  const [error, setError] = useState(""); // To capture errors for display

  const handleButtonClick = (isLoginForm) => {
    setIsLogin(isLoginForm);
    setShowForm(true);
    setShowForgotPassword(false); // Reset Forgot Password visibility
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(
        isLogin ? `${API_URL}/login` : `${API_URL}/signup`, // Depending on whether it's login or signup
        data
      );

      // Store the JWT token in localStorage
      localStorage.setItem("authToken", response.data.token);
      onAuthSuccess(response.data.user); // Pass user data to parent component

      setError(""); // Clear error on success

      // Redirect user to a protected page after successful authentication
      window.location.href = "/"; // Change this to your protected route

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://s3-alpha-sig.figma.com/img/ec36/6190/b0a1cdce092091e2710452391cd3428d?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rh7-3UHY3naBhJuiZbckeI-c-1Uqwf-GeY7fcbnOxmh1WBJmVWkNHqeexBYfrYhB2xGiP-1cdUIfRIQA0IQuOe1GOwJIJNW0LSt-Fd4~i1Jd8S3YdKFjDk-nMce5wRhmzAMFR26E2hMh44sS2sygzN-qXBB6i~0MowC1J9didwQ~-ZBPNYRNGny~1dikT38zH7d9Ji-sFb6e85Glq7J17nc-e1DVTDxWOBmZYCGViZWwKvRfREXZxKRjQsUhNgb67R~F2imCGgIH2uWEdqob6PZ8URtDeTMi9wLOc1Ad4S7qIWKL8exQRwxF9pYSZdhgmD3xtBwkbX6L0Kxs8A-x7g__")',
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg text-center w-full max-w-md transition-all duration-500">
        {/* Logo */}
        <img
          src="https://i.postimg.cc/C5dQgh9H/MAIN-1.png" // Your logo URL
          alt="Logo"
          className="h-8 mx-auto mb-8" // Adjusted size for better visibility
        />

        {/* Show Buttons or Form */}
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
            {/* Forgot Password Form */}
            {showForgotPassword ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <h1 className="text-3xl font-light mb-4">Forgot Password</h1>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076870]"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#076870] hover:bg-[#065d64] text-white rounded-lg transition duration-300 cursor-pointer"
                >
                  Reset Password
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

                {/* Conditionally Render Forms */}
                {isLogin ? (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076870]"
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076870]"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#076870] hover:bg-[#065d64] text-white rounded-lg transition duration-300 cursor-pointer"
                    >
                      Log In
                    </button>
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={handleForgotPasswordClick}
                        className="text-[#076870] hover:text-[#065d64] text-sm font-light transition duration-300"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076870]"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076870]"
                      required
                    />
                    <input
                      type="number"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076870]"
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076870]"
                      required
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#076870]"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#076870] hover:bg-[#065d64] text-white rounded-lg transition duration-300 cursor-pointer"
                    >
                      Create Account
                    </button>

                    {/* Terms and Conditions */}
                    <p className="text-sm text-gray-600 mt-4">
                      By signing up, you agree to our{" "}
                      <a href="#" className="text-[#076870] hover:text-[#065d64]">
                        Terms and Conditions
                      </a>
                      .
                    </p>
                  </form>
                )}

                {error && <p className="text-red-500 mt-4">{error}</p>} {/* Show error */}
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
